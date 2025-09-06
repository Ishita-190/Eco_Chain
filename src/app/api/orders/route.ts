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
    console.log('Order API called');
    
    const body = await request.json();
    console.log('Request body:', body);
    
    // Skip auth and validation for testing
    const mockOrderId = 'ECO' + Math.random().toString(36).substr(2, 6).toUpperCase();
    console.log('Generated mock order ID:', mockOrderId);
    
    return NextResponse.json({
      orderId: mockOrderId,
      qrCodeURI: 'data:image/png;base64,mock',
      otpHint: '1234',
      order: { id: mockOrderId, status: 'SCHEDULED' }
    });

  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

