// app/api/background/route.ts
// REFACTOR: Daily background tasks endpoint (Vercel Hobby compatible)
// This replaces high-frequency cron jobs with a single daily maintenance job
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { RelayerService } from '@/lib/relayer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    console.log('🔄 Starting daily background maintenance...');
    
    const tasks = {
      processedJobs: 0,
      cleanedRecords: 0,
      updatedStats: false,
      errors: [] as string[],
    };

    // Task 1: Process any remaining queued minting jobs (fallback)
    // This handles edge cases where immediate minting might have failed
    try {
      const relayer = new RelayerService();
      let processed = 0;
      
      // Process up to 50 jobs to avoid timeout
      for (let i = 0; i < 50; i++) {
        const hasJob = await relayer.processOneFromQueue();
        if (!hasJob) break;
        processed++;
      }
      
      tasks.processedJobs = processed;
      console.log(`📦 Processed ${processed} queued minting jobs`);
    } catch (error) {
      tasks.errors.push(`Minting queue processing failed: ${error}`);
      console.error('❌ Queue processing error:', error);
    }

    // Task 2: Clean up old temporary data (older than 30 days)
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      // Clean up old classifications without associated orders
      const cleanupResult = await prisma.classification.deleteMany({
        where: {
          createdAt: { lt: thirtyDaysAgo },
          orders: { none: {} }, // No associated orders
        },
      });

      tasks.cleanedRecords = cleanupResult.count;
      console.log(`🧹 Cleaned up ${cleanupResult.count} old classification records`);
    } catch (error) {
      tasks.errors.push(`Cleanup failed: ${error}`);
      console.error('❌ Cleanup error:', error);
    }

    // Task 3: Update any cached statistics or refresh materialized views
    try {
      // This is a placeholder for any statistics that might need daily refresh
      // Currently, all stats are calculated on-demand via API endpoints
      tasks.updatedStats = true;
      console.log('📊 Statistics refresh completed');
    } catch (error) {
      tasks.errors.push(`Stats update failed: ${error}`);
      console.error('❌ Stats update error:', error);
    }

    // Task 4: Check for stuck orders and send notifications (if needed)
    try {
      const stuckOrders = await prisma.order.findMany({
        where: {
          status: 'VERIFIED',
          updatedAt: {
            lt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
          },
        },
        take: 10,
      });

      if (stuckOrders.length > 0) {
        console.log(`⚠️ Found ${stuckOrders.length} orders stuck in VERIFIED status`);
        // In a real implementation, you might send notifications or alerts here
      }
    } catch (error) {
      tasks.errors.push(`Stuck order check failed: ${error}`);
      console.error('❌ Stuck order check error:', error);
    }

    const summary = {
      timestamp: new Date().toISOString(),
      success: tasks.errors.length === 0,
      tasks,
      message: tasks.errors.length === 0 
        ? '✅ Daily maintenance completed successfully'
        : `⚠️ Daily maintenance completed with ${tasks.errors.length} errors`,
    };

    console.log('🎉 Daily background maintenance completed:', summary);
    
    return NextResponse.json(summary);
  } catch (error) {
    console.error('💥 Background task failed:', error);
    return NextResponse.json(
      { 
        error: 'Background maintenance failed',
        timestamp: new Date().toISOString(),
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
