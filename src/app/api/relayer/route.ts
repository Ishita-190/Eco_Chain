// app/api/relayer/route.ts
// DEPRECATED: This endpoint is no longer used by cron jobs
// REFACTOR: Minting is now handled immediately in the verification endpoint
// This endpoint is kept for manual testing and emergency queue processing
import { NextResponse } from 'next/server';
import { RelayerService } from '@/lib/relayer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// DEPRECATED: This was previously called by high-frequency cron (*/1 * * * *)
// Now only used for manual queue processing if needed
export async function POST() {
	console.log('⚠️ Manual relayer endpoint called - this should only be used for testing');
	const relayer = new RelayerService();
	const processed = await relayer.processOneFromQueue();
	return NextResponse.json({ 
		processed,
		message: 'Manual queue processing completed',
		warning: 'This endpoint is deprecated - minting now happens immediately during verification'
	});
}

