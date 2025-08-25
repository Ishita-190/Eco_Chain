// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

contract EcoCredit is
    Initializable,
    ERC20Upgradeable,
    AccessControlUpgradeable,
    PausableUpgradeable,
    UUPSUpgradeable,
    ReentrancyGuardUpgradeable
{
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant RELAYER_ROLE = keccak256("RELAYER_ROLE");
    bytes32 public constant FACILITY_ROLE = keccak256("FACILITY_ROLE");

    uint256 public constant MAX_CREDITS_PER_ORDER = 10000 * 10**18;

    mapping(bytes32 => bool) public mintedOrders;
    mapping(bytes32 => uint256) public orderCredits;

    event CreditsMinted(
        address indexed recipient,
        uint256 amount,
        bytes32 indexed orderId,
        uint256 weightKg,
        string wasteType
    );

    constructor() {
        _disableInitializers();
    }

    function initialize(address admin) public initializer {
        __ERC20_init("EcoCredit", "ECO");
        __AccessControl_init();
        __Pausable_init();
        __UUPSUpgradeable_init();
        __ReentrancyGuard_init();

        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(ADMIN_ROLE, admin);

        _setRoleAdmin(RELAYER_ROLE, ADMIN_ROLE);
        _setRoleAdmin(FACILITY_ROLE, ADMIN_ROLE);
    }

    function mint(
        address to,
        string calldata orderId,
        uint256 weightKg,
        string calldata wasteType
    ) external onlyRole(RELAYER_ROLE) whenNotPaused nonReentrant {
        require(to != address(0), "EcoCredit: mint to zero address");
        require(weightKg > 0, "EcoCredit: zero weight");

        bytes32 orderKey = keccak256(abi.encodePacked(orderId));
        require(!mintedOrders[orderKey], "EcoCredit: already minted");

        uint256 credits = weightKg * 10**decimals();
        require(credits <= MAX_CREDITS_PER_ORDER, "EcoCredit: exceeds cap");

        mintedOrders[orderKey] = true;
        orderCredits[orderKey] = credits;

        _mint(to, credits);

        emit CreditsMinted(to, credits, orderKey, weightKg, wasteType);
    }

    function batchMint(
        address[] calldata recipients,
        string[] calldata orderIds,
        uint256[] calldata weights,
        string[] calldata wasteTypes
    ) external onlyRole(RELAYER_ROLE) whenNotPaused nonReentrant {
        require(
            recipients.length == orderIds.length &&
            orderIds.length == weights.length &&
            weights.length == wasteTypes.length,
            "EcoCredit: length mismatch"
        );

        for (uint256 i = 0; i < recipients.length; i++) {
            bytes32 orderKey = keccak256(abi.encodePacked(orderIds[i]));
            if (!mintedOrders[orderKey]) {
                uint256 credits = weights[i] * 10**decimals();
                require(credits <= MAX_CREDITS_PER_ORDER, "EcoCredit: exceeds cap");

                mintedOrders[orderKey] = true;
                orderCredits[orderKey] = credits;

                _mint(recipients[i], credits);

                emit CreditsMinted(recipients[i], credits, orderKey, weights[i], wasteTypes[i]);
            }
        }
    }

    function decimals() public pure override returns (uint8) {
        return 18;
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyRole(ADMIN_ROLE) {}
}
