// lib/queue.ts
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

interface MintingJob {
  orderId: string;
  userAddress: string;
  weightKg: number;
  wasteType: string;
}

export async function queueMintingJob(job: MintingJob) {
  await redis.lpush('minting-jobs', JSON.stringify(job));
}
