// app/api/progress/route.ts
// REFACTOR: New endpoint to get user progress and ecological impact banners
// This replaces any cron-based progress calculation with on-demand API calls
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const auth = await verifyAuth(request);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user's completed orders and calculate impact
    const completedOrders = await prisma.order.findMany({
      where: {
        userId: auth.userId,
        status: 'COMPLETED',
      },
      include: {
        classification: true,
        facility: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    // Calculate ecological impact metrics
    const totalWeight = completedOrders.reduce(
      (sum: number, order: any) => sum + (order.actualWeight || order.estimatedWeight || 0),
      0
    );
    
    const totalCredits = completedOrders.reduce(
      (sum: number, order: any) => sum + (order.creditsMinted || 0),
      0
    );

    const wasteTypeBreakdown = completedOrders.reduce((acc: Record<string, number>, order: any) => {
      const type = order.wasteType;
      acc[type] = (acc[type] || 0) + (order.actualWeight || order.estimatedWeight || 0);
      return acc;
    }, {} as Record<string, number>);

    // Calculate environmental impact estimates
    const co2Saved = totalWeight * 2.3; // Rough estimate: 2.3kg CO2 saved per kg waste recycled
    const energySaved = totalWeight * 1.8; // Rough estimate: 1.8 kWh saved per kg
    const waterSaved = totalWeight * 15; // Rough estimate: 15L water saved per kg

    // Get user's rank (simplified leaderboard position)
    const userRank = await prisma.$queryRaw<[{ rank: number }]>`
      SELECT COUNT(*) + 1 as rank
      FROM (
        SELECT "userId", SUM(COALESCE("creditsMinted", 0)) as total_credits
        FROM "Order"
        WHERE "status" = 'COMPLETED'
        GROUP BY "userId"
        HAVING SUM(COALESCE("creditsMinted", 0)) > ${totalCredits}
      ) as higher_users
    `;

    // Generate progress banners/achievements
    const achievements = [];
    if (completedOrders.length >= 1) achievements.push('First Waste Recycled! 🌱');
    if (completedOrders.length >= 5) achievements.push('Eco Warrior! 🏆');
    if (completedOrders.length >= 10) achievements.push('Green Champion! 🌟');
    if (totalWeight >= 10) achievements.push('10kg+ Recycled! ♻️');
    if (totalWeight >= 50) achievements.push('Sustainability Hero! 🌍');
    if (Object.keys(wasteTypeBreakdown).length >= 3) achievements.push('Waste Variety Expert! 📊');

    return NextResponse.json({
      userId: auth.userId,
      stats: {
        totalOrders: completedOrders.length,
        totalWeight,
        totalCredits,
        wasteTypeBreakdown,
        environmentalImpact: {
          co2SavedKg: Math.round(co2Saved * 100) / 100,
          energySavedKwh: Math.round(energySaved * 100) / 100,
          waterSavedLiters: Math.round(waterSaved * 100) / 100,
        },
        rank: userRank[0]?.rank || 1,
      },
      achievements,
      recentOrders: completedOrders.slice(0, 5),
    });
  } catch (error) {
    console.error('Progress calculation error:', error);
    return NextResponse.json(
      { error: 'Failed to calculate progress' },
      { status: 500 }
    );
  }
}
