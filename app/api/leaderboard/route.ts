// app/api/leaderboard/route.ts
// REFACTOR: New endpoint for leaderboard data (replaces any cron-based leaderboard updates)
// This calculates leaderboard on-demand instead of using background cron jobs
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Get top users by total credits earned
    const topUsers = await prisma.$queryRaw<Array<{
      userId: string;
      userAddress: string;
      totalCredits: number;
      totalWeight: number;
      orderCount: number;
    }>>`
      SELECT 
        u."id" as "userId",
        u."address" as "userAddress",
        COALESCE(SUM(o."creditsMinted"), 0) as "totalCredits",
        COALESCE(SUM(COALESCE(o."actualWeight", o."estimatedWeight", 0)), 0) as "totalWeight",
        COUNT(o."id") as "orderCount"
      FROM "User" u
      LEFT JOIN "Order" o ON u."id" = o."userId" AND o."status" = 'COMPLETED'
      GROUP BY u."id", u."address"
      HAVING COALESCE(SUM(o."creditsMinted"), 0) > 0
      ORDER BY "totalCredits" DESC, "totalWeight" DESC
      LIMIT ${limit} OFFSET ${offset}
    `;

    // Get total stats for context
    const globalStats = await prisma.$queryRaw<[{
      totalUsers: number;
      totalCredits: number;
      totalWeight: number;
      totalOrders: number;
    }]>`
      SELECT 
        COUNT(DISTINCT u."id") as "totalUsers",
        COALESCE(SUM(o."creditsMinted"), 0) as "totalCredits",
        COALESCE(SUM(COALESCE(o."actualWeight", o."estimatedWeight", 0)), 0) as "totalWeight",
        COUNT(o."id") as "totalOrders"
      FROM "User" u
      LEFT JOIN "Order" o ON u."id" = o."userId" AND o."status" = 'COMPLETED'
    `;

    // Format leaderboard with rankings
    const leaderboard = topUsers.map((user: any, index: number) => ({
      rank: offset + index + 1,
      userId: user.userId,
      userAddress: user.userAddress,
      totalCredits: Number(user.totalCredits),
      totalWeight: Number(user.totalWeight),
      orderCount: Number(user.orderCount),
      // Anonymize address for privacy (show first 6 and last 4 chars)
      displayAddress: `${user.userAddress.slice(0, 6)}...${user.userAddress.slice(-4)}`,
    }));

    return NextResponse.json({
      leaderboard,
      pagination: {
        limit,
        offset,
        hasMore: topUsers.length === limit,
      },
      globalStats: {
        totalUsers: Number(globalStats[0].totalUsers),
        totalCredits: Number(globalStats[0].totalCredits),
        totalWeight: Number(globalStats[0].totalWeight),
        totalOrders: Number(globalStats[0].totalOrders),
      },
    });
  } catch (error) {
    console.error('Leaderboard error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard' },
      { status: 500 }
    );
  }
}
