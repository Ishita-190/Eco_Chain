# lib/relayer.ts
/**
 * Relayer Service - Handles minting eco credits after verification
 * This service runs as a background worker and processes minting jobs
 */
import { ethers } from 'ethers';
import { PrismaClient } from '@prisma/client';
import { Redis } from '@upstash/redis';

const prisma = new PrismaClient();
const redis = Redis.fromEnv();

// Contract ABIs (simplified - in production, import from typechain)
const EcoCreditABI = [
  "function mint(address to, string calldata orderId, uint256 weightKg, string calldata wasteType) external",
  "function isOrderMinted(string calldata orderId) external view returns (bool)"
];

const AttestationRegistryABI = [
  "function createAttestation(string calldata orderId, address user, address facility, string calldata wasteType, uint256 weightKg, string calldata imageCID) external returns (bytes32)",
  "function markProcessed(bytes32 attestationId, bytes32 txHash) external"
];

class RelayerService {
  private provider: ethers.JsonRpcProvider;
  private wallet: ethers.Wallet;
  private ecoCredit: ethers.Contract;
  private attestationRegistry: ethers.Contract;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(process.env.ETH_RPC_URL);
    this.wallet = new ethers.Wallet(process.env.RELAYER_PRIVATE_KEY!, this.provider);
    
    this.ecoCredit = new ethers.Contract(
      process.env.CONTRACT_ECOCREDIT!,
      EcoCreditABI,
      this.wallet
    );
    
    this.attestationRegistry = new ethers.Contract(
      process.env.CONTRACT_ATTESTATION!,
      AttestationRegistryABI,
      this.wallet
    );
  }

  async processJob(jobData: any) {
    const { orderId, userAddress, weightKg, wasteType } = jobData;
    
    try {
      console.log(`Processing minting job for order ${orderId}`);
      
      // Check if already minted
      const isAlreadyMinted = await this.ecoCredit.isOrderMinted(orderId);
      if (isAlreadyMinted) {
        console.log(`Order ${orderId} already minted, skipping`);
        return;
      }

      // Get order details from database
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: { user: true, facility: true, classification: true }
      });

      if (!order) {
        throw new Error(`Order ${orderId} not found`);
      }

      // Create attestation on-chain
      const attestationTx = await this.attestationRegistry.createAttestation(
        orderId,
        userAddress,
        order.facility.address, // Assuming facility has an address field
        wasteType,
        Math.floor(weightKg * 100), // Convert to integer (in 0.01kg units)
        order.classification.imageCID
      );
      await attestationTx.wait();

      // Add timeline event
      await prisma.timelineEvent.create({
        data: {
          orderId,
          type: 'MINTING',
          title: 'Minting Credits',
          message: 'Processing blockchain transaction to mint eco credits...'
        }
      });

      // Mint eco credits
      const mintTx = await this.ecoCredit.mint(
        userAddress,
        orderId,
        Math.floor(weightKg * 100), // Convert to integer
        wasteType
      );
      
      const receipt = await mintTx.wait();
      console.log(`Minted ${weightKg} ECO credits for order ${orderId}. Tx: ${receipt.hash}`);

      // Mark attestation as processed
      const attestationId = await this.getAttestationId(orderId);
      if (attestationId) {
        await this.attestationRegistry.markProcessed(attestationId, receipt.hash);
      }

      // Update order in database
      await prisma.order.update({
        where: { id: orderId },
        data: {
          status: 'COMPLETED',
          txHash: receipt.hash,
          creditsMinted: weightKg
        }
      });

      // Add completion timeline event
      await prisma.timelineEvent.create({
        data: {
          orderId,
          type: 'COMPLETED',
          title: 'Credits Minted',
          message: `${weightKg} ECO credits have been minted to your wallet.`,
          metadata: { txHash: receipt.hash, credits: weightKg }
        }
      });

      console.log(`✅ Successfully processed order ${orderId}`);

    } catch (error) {
      console.error(`❌ Failed to process order ${orderId}:`, error);
      
      // Add error timeline event
      await prisma.timelineEvent.create({
        data: {
          orderId,
          type: 'CANCELLED',
          title: 'Processing Failed',
          message: 'Failed to mint credits. Please contact support.',
          metadata: { error: error.message }
        }
      });

      // Update order status
      await prisma.order.update({
        where: { id: orderId },
        data: { status: 'CANCELLED' }
      });

      throw error;
    }
  }

  private async getAttestationId(orderId: string): Promise<string | null> {
    // This would query the attestation registry to get the attestation ID
    // Implementation depends on contract event logs or storage patterns
    return null;
  }

  async start() {
    console.log('🤖 Relayer service started');
    console.log('Wallet address:', this.wallet.address);
    console.log('Network:', (await this.provider.getNetwork()).name);
    
    // Process jobs from Redis queue
    while (true) {
      try {
        const jobData = await redis.brpop('minting-jobs', 30); // 30 second timeout
        
        if (jobData) {
          const job = JSON.parse(jobData[1]);
          await this.processJob(job);
        }
      } catch (error) {
        console.error('Job processing error:', error);
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5s before retry
      }
    }
  }
}

// If running as standalone script
if (require.main === module) {
  const relayer = new RelayerService();
  relayer.start().catch(console.error);
}

export { RelayerService };
