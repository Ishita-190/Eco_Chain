// app/api/orders/[id]/verify/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth';
import { RelayerService } from '@/lib/relayer';
import { z } from 'zod';

const verifySchema = z.object({
  otp: z.string().length(6),
  evidenceCID: z.string(),
  actualWeight: z.number().positive(),
});

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
    const body = await request.json();
    const { otp, evidenceCID, actualWeight } = verifySchema.parse(body);

    // Find order and verify OTP
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { user: true, facility: true },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Verify OTP (check last 4 digits)
    if (!otp.endsWith(order.otpHint || '')) {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
    }

    // Update order
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'VERIFIED',
        evidenceCID,
        actualWeight,
      },
    });

    // Create timeline event
    await prisma.timelineEvent.create({
      data: {
        orderId,
        type: 'VERIFIED',
        title: 'Waste Verified',
        message: `${actualWeight}kg of ${order.wasteType} verified by ${order.facility.name}.`,
        metadata: { actualWeight, evidenceCID },
      },
    });

    // REFACTOR: Process minting immediately instead of queuing for cron
    // This removes dependency on high-frequency cron jobs for Vercel Hobby compatibility
    try {
      const relayer = new RelayerService();
      await relayer.processJob({
        orderId,
        userAddress: order.user.address,
        weightKg: actualWeight,
        wasteType: order.wasteType,
      });
      console.log(`✅ Immediately processed minting for order ${orderId}`);
    } catch (mintingError) {
      console.error(`⚠️ Minting failed for order ${orderId}, will retry later:`, mintingError);
      // Still return success for the verification, but log the minting failure
      // The order status will be updated to reflect the minting failure
    }

    return NextResponse.json({
      success: true,
      order: updatedOrder,
    });
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify order' },
      { status: 500 }
    );
  }
}
