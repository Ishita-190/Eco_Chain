/**
 * Relayer Service - Handles minting eco credits after verification
 * Adapted for serverless execution on Vercel (process one job per invocation)
 */
import { ethers } from 'ethers';
import { prisma } from './prisma';
import { kv } from '@vercel/kv';
import Redis from 'ioredis';

// Contract ABIs (simplified - in production, import from typechain)
const EcoCreditABI = [
	"function mint(address to, string calldata orderId, uint256 weightKg, string calldata wasteType) external",
	"function mintedOrders(bytes32) view returns (bool)"
];

const AttestationRegistryABI = [
	"function createAttestation(string calldata orderId, address user, address facility, string calldata wasteType, uint256 weightKg, string calldata imageCID) external returns (bytes32)",
	"function markProcessed(bytes32 attestationId, bytes32 txHash) external",
	"function orderToAttestation(string) view returns (bytes32)"
];

class RelayerService {
	private provider: ethers.JsonRpcProvider;
	private wallet: ethers.Wallet;
	private ecoCredit: ethers.Contract;
	private attestationRegistry: ethers.Contract;
	private localRedis: Redis | null = null;

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

		if (process.env.REDIS_URL && !(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)) {
			this.localRedis = new Redis(process.env.REDIS_URL);
		}
	}

	async processJob(jobData: any) {
		const { orderId, userAddress, weightKg, wasteType } = jobData;
		
		try {
			console.log(`Processing minting job for order ${orderId}`);
			
			// Check if already minted via public mapping
			const orderKey = ethers.keccak256(ethers.toUtf8Bytes(orderId));
			const isAlreadyMinted = await this.ecoCredit.mintedOrders(orderKey);
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
				order.facility.ethAddress,
				wasteType,
				Math.floor(weightKg),
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
				Math.floor(weightKg),
				wasteType
			);
			
			const receipt = await mintTx.wait();
			console.log(`Minted ${weightKg} ECO credits for order ${orderId}. Tx: ${receipt.hash}`);

			// Mark attestation as processed
			const attestationId = await this.attestationRegistry.orderToAttestation(orderId);
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

		} catch (error:any) {
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

	async processOneFromQueue(): Promise<boolean> {
		let jobString: string | null = null;
		// Prefer Vercel KV if configured
		if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
			const res = await kv.brpop<string>('minting-jobs', { timeout: 1 });
			jobString = (res as any)?.[1] ?? null;
		} else if (this.localRedis) {
			jobString = await this.localRedis.rpop('minting-jobs');
		}
		if (!jobString) return false;
		const job = JSON.parse(jobString);
		await this.processJob(job);
		return true;
	}
}

export { RelayerService };