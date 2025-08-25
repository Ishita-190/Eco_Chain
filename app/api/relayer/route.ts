// app/api/relayer/route.ts
import { NextResponse } from 'next/server';
import { RelayerService } from '@/lib/relayer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST() {
	const relayer = new RelayerService();
	const processed = await relayer.processOneFromQueue();
	return NextResponse.json({ processed });
}

