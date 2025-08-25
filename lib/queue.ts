// lib/queue.ts
import { kv } from '@vercel/kv';
import Redis from 'ioredis';

let localRedis: Redis | null = null;
if (process.env.REDIS_URL && !(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)) {
	localRedis = new Redis(process.env.REDIS_URL);
}

interface MintingJob {
	orderId: string;
	userAddress: string;
	weightKg: number;
	wasteType: string;
}

export async function queueMintingJob(job: MintingJob) {
	const payload = JSON.stringify(job);
	if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
		await kv.lpush('minting-jobs', payload);
	} else if (localRedis) {
		await localRedis.lpush('minting-jobs', payload);
	} else {
		throw new Error('No queue backend configured. Set Vercel KV or REDIS_URL');
	}
}
