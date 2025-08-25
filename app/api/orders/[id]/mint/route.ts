// app/api/orders/[id]/mint/route.ts
// REFACTOR: New endpoint to handle manual minting retries
// This replaces the need for high-frequency cron jobs by allowing on-demand minting
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth';
import { RelayerService } from '@/lib/relayer';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const auth = await verifyAuth(request);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id: orderId } = params;

    // Find verified order that hasn't been completed
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { user: true, facility: true },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    if (order.status !== 'VERIFIED') {
      return NextResponse.json(
        { error: 'Order must be verified before minting' },
        { status: 400 }
      );
    }

    if (order.status === 'COMPLETED') {
      return NextResponse.json(
        { error: 'Order already completed' },
        { status: 400 }
      );
    }

    // Process minting immediately
    const relayer = new RelayerService();
    await relayer.processJob({
      orderId,
      userAddress: order.user.address,
      weightKg: order.actualWeight || order.estimatedWeight || 1,
      wasteType: order.wasteType,
    });

    // Get updated order
    const updatedOrder = await prisma.order.findUnique({
      where: { id: orderId },
      include: { user: true, facility: true },
    });

    return NextResponse.json({
      success: true,
      order: updatedOrder,
      message: 'Eco credits minted successfully',
    });
  } catch (error) {
    console.error('Manual minting error:', error);
    return NextResponse.json(
      { error: 'Failed to mint eco credits' },
      { status: 500 }
    );
  }
}
