// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

/**
 * @title AttestationRegistry
 * @dev Registry for waste disposal attestations and verifications
 * Stores proof of waste processing for transparency and auditability
 */
contract AttestationRegistry is
    Initializable,
    AccessControlUpgradeable,
    PausableUpgradeable,
    UUPSUpgradeable,
    ReentrancyGuardUpgradeable
{
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant FACILITY_ROLE = keccak256("FACILITY_ROLE");
    bytes32 public constant RELAYER_ROLE = keccak256("RELAYER_ROLE");

    enum AttestationStatus {
        Pending,      // Initial state after creation
        Verified,     // Verified by facility
        Processed,    // Waste processed and credits minted
        Rejected      // Rejected due to issues
    }

    struct Attestation {
        string orderId;
        address user;
        address facility;
        string wasteType;
        uint256 weightKg;
        string imageCID;          // IPFS CID of waste image
        string evidenceCID;       // IPFS CID of processing evidence
        AttestationStatus status;
        uint256 createdAt;
        uint256 verifiedAt;
        uint256 processedAt;
        string rejectReason;
        bytes32 txHash;          // Transaction hash when credits were minted
    }

    // Mapping from attestation ID to attestation
    mapping(bytes32 => Attestation) public attestations;
    
    // Mapping from order ID to attestation ID
    mapping(string => bytes32) public orderToAttestation;
    
    // Mapping from user to their attestation IDs
    mapping(address => bytes32[]) public userAttestations;
    
    // Mapping from facility to their attestation IDs
    mapping(address => bytes32[]) public facilityAttestations;

    // Counter for generating unique attestation IDs
    uint256 private _attestationCounter;

    // Events
    event AttestationCreated(
        bytes32 indexed attestationId,
        string indexed orderId,
        address indexed user,
        address facility,
        string wasteType,
        uint256 weightKg
    );

    event AttestationVerified(
        bytes32 indexed attestationId,
        string indexed orderId,
        address indexed facility,
        string evidenceCID
    );

    event AttestationProcessed(
        bytes32 indexed attestationId,
        string indexed orderId,
        bytes32 indexed txHash
    );

    event AttestationRejected(
        bytes32 indexed attestationId,
        string indexed orderId,
        string reason
    );

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address admin) public initializer {
        __AccessControl_init();
        __Pausable_init();
        __UUPSUpgradeable_init();
        __ReentrancyGuard_init();

        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(ADMIN_ROLE, admin);
        
        // Set role hierarchy
        _setRoleAdmin(FACILITY_ROLE, ADMIN_ROLE);
        _setRoleAdmin(RELAYER_ROLE, ADMIN_ROLE);
    }

    /**
     * @dev Create a new attestation for waste disposal
     * @param orderId Unique order identifier
     * @param user Address of the user disposing waste
     * @param facility Address of the processing facility
     * @param wasteType Type of waste being disposed
     * @param weightKg Weight of waste in kilograms
     * @param imageCID IPFS CID of the waste image
     */
    function createAttestation(
        string calldata orderId,
        address user,
        address facility,
        string calldata wasteType,
        uint256 weightKg,
        string calldata imageCID
    ) external onlyRole(RELAYER_ROLE) whenNotPaused returns (bytes32) {
        require(bytes(orderId).length > 0, "AttestationRegistry: empty orderId");
        require(user != address(0), "AttestationRegistry: zero user address");
        require(facility != address(0), "AttestationRegistry: zero facility address");
        require(weightKg > 0, "AttestationRegistry: zero weight");
        require(orderToAttestation[orderId] == bytes32(0), "AttestationRegistry: order already exists");

        bytes32 attestationId = keccak256(abi.encodePacked(orderId, user, facility, block.timestamp, _attestationCounter++));

        Attestation storage attestation = attestations[attestationId];
        attestation.orderId = orderId;
        attestation.user = user;
        attestation.facility = facility;
        attestation.wasteType = wasteType;
        attestation.weightKg = weightKg;
        attestation.imageCID = imageCID;
        attestation.status = AttestationStatus.Pending;
        attestation.createdAt = block.timestamp;

        orderToAttestation[orderId] = attestationId;
        userAttestations[user].push(attestationId);
        facilityAttestations[facility].push(attestationId);

        emit AttestationCreated(attestationId, orderId, user, facility, wasteType, weightKg);

        return attestationId;
    }

    /**
     * @dev Verify an attestation with evidence
     * @param attestationId ID of the attestation to verify
     * @param evidenceCID IPFS CID of processing evidence
     */
    function verifyAttestation(
        bytes32 attestationId,
        string calldata evidenceCID
    ) external onlyRole(FACILITY_ROLE) whenNotPaused {
        Attestation storage attestation = attestations[attestationId];
        require(attestation.createdAt > 0, "AttestationRegistry: attestation not found");
        require(attestation.facility == msg.sender, "AttestationRegistry: not authorized facility");
        require(attestation.status == AttestationStatus.Pending, "AttestationRegistry: already processed");

        attestation.evidenceCID = evidenceCID;
        attestation.status = AttestationStatus.Verified;
        attestation.verifiedAt = block.timestamp;

        emit AttestationVerified(attestationId, attestation.orderId, msg.sender, evidenceCID);
    }

    /**
     * @dev Mark attestation as processed after credits are minted
     * @param attestationId ID of the attestation
     * @param txHash Transaction hash of the minting transaction
     */
    function markProcessed(
        bytes32 attestationId,
        bytes32 txHash
    ) external onlyRole(RELAYER_ROLE) whenNotPaused {
        Attestation storage attestation = attestations[attestationId];
        require(attestation.createdAt > 0, "AttestationRegistry: attestation not found");
        require(attestation.status == AttestationStatus.Verified, "AttestationRegistry: not verified");

        attestation.status = AttestationStatus.Processed;
        attestation.processedAt = block.timestamp;
        attestation.txHash = txHash;

        emit AttestationProcessed(attestationId, attestation.orderId, txHash);
    }

    /**
     * @dev Reject an attestation
     * @param attestationId ID of the attestation to reject
     * @param reason Reason for rejection
     */
    function rejectAttestation(
        bytes32 attestationId,
        string calldata reason
    ) external whenNotPaused {
        Attestation storage attestation = attestations[attestationId];
        require(attestation.createdAt > 0, "AttestationRegistry: attestation not found");
        
        // Only facility can reject their own attestations, or admin can reject any
        require(
            hasRole(ADMIN_ROLE, msg.sender) || 
            (hasRole(FACILITY_ROLE, msg.sender) && attestation.facility == msg.sender),
            "AttestationRegistry: not authorized"
        );
        
        require(
            attestation.status == AttestationStatus.Pending || 
            attestation.status == AttestationStatus.Verified,
            "AttestationRegistry: cannot reject processed attestation"
        );

        attestation.status = AttestationStatus.Rejected;
        attestation.rejectReason = reason;

        emit AttestationRejected(attestationId, attestation.orderId, reason);
    }

    /**
     * @dev Get attestation by order ID
     */
    function getAttestationByOrder(string calldata orderId) 
        external view returns (Attestation memory) {
        bytes32 attestationId = orderToAttestation[orderId];
        require(attestationId != bytes32(0), "AttestationRegistry: order not found");
        return attestations[attestationId];
    }

    /**
     * @dev Get user's attestation IDs
     */
    function getUserAttestations(address user) external view returns (bytes32[] memory) {
        return userAttestations[user];
    }

    /**
     * @dev Get facility's attestation IDs
     */
    function getFacilityAttestations(address facility) external view returns (bytes32[] memory) {
        return facilityAttestations[facility];
    }

    /**
     * @dev Get attestation details
     */
    function getAttestation(bytes32 attestationId) external view returns (Attestation memory) {
        require(attestations[attestationId].createdAt > 0, "AttestationRegistry: attestation not found");
        return attestations[attestationId];
    }

    /**
     * @dev Pause contract (admin only)
     */
    function pause() external onlyRole(ADMIN_ROLE) {
        _pause();
    }

    /**
     * @dev Unpause contract (admin only)
     */
    function unpause() external onlyRole(ADMIN_ROLE) {
        _unpause();
    }

    /**
     * @dev Required for UUPS upgrades
     */
    function _authorizeUpgrade(address newImplementation) internal override onlyRole(ADMIN_ROLE) {}

    /**
     * @dev Support for ERC165 interface detection
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(AccessControlUpgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
