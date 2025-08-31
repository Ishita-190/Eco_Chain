// app/api/orders/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { verifyAuth } from '@/src/lib/auth';
import { generateQRCode, generateOTP } from '@/src/lib/utils';
import { z } from 'zod';

const createOrderSchema = z.object({
  facilityId: z.string(),
  classificationId: z.string(),
  pickupType: z.enum(['PICKUP', 'DROP_OFF']),
  scheduledAt: z.string().datetime().optional(),
  estimatedWeight: z.number().positive().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const auth = await verifyAuth(request);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const data = createOrderSchema.parse(body);

    // Get classification to determine waste type
    const classification = await prisma.classification.findUnique({
      where: { id: data.classificationId },
    });

    if (!classification || classification.userId !== auth.userId) {
      return NextResponse.json(
        { error: 'Classification not found' },
        { status: 404 }
      );
    }

    // Generate OTP and QR code
    const otp = generateOTP();
    const qrCodeData = JSON.stringify({
      orderId: '', // Will be updated after creation
      otp,
      facilityId: data.facilityId,
    });

    const order = await prisma.order.create({
      data: {
        userId: auth.userId,
        facilityId: data.facilityId,
        classificationId: data.classificationId,
        wasteType: classification.label,
        pickupType: data.pickupType,
        scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : null,
        estimatedWeight: data.estimatedWeight,
        otpHint: otp.slice(-4),
        status: data.scheduledAt ? 'SCHEDULED' : 'CREATED',
      },
      include: {
        facility: true,
        classification: true,
      },
    });

    // Generate QR code with order ID
    const qrCodeDataWithId = JSON.stringify({
      orderId: order.id,
      otp,
      facilityId: data.facilityId,
    });
    const qrCodeURI = await generateQRCode(qrCodeDataWithId);

    // Update order with QR code
    await prisma.order.update({
      where: { id: order.id },
      data: { qrCode: qrCodeURI },
    });

    // Create timeline events
    await prisma.timelineEvent.createMany({
      data: [
        {
          orderId: order.id,
          type: 'CREATED',
          title: 'Order Created',
          message: 'Your waste disposal order has been created.',
        },
        ...(data.scheduledAt
          ? [
              {
                orderId: order.id,
                type: 'SCHEDULED' as const,
                title: 'Pickup Scheduled',
                message: `Pickup scheduled for ${new Date(
                  data.scheduledAt
                ).toLocaleString()}.`,
              },
            ]
          : []),
      ],
    });

    return NextResponse.json({
      orderId: order.id,
      qrCodeURI,
      otpHint: otp.slice(-4),
      order,
    });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

