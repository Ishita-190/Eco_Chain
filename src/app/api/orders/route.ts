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
    
    const auth = await verifyAuth(request);
    console.log('Auth result:', auth);
    
    if (!auth) {
      console.log('No auth found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    console.log('Request body:', body);
    
    const data = createOrderSchema.parse(body);
    console.log('Parsed data:', data);
    
    // Return mock response for testing - same format as shown in alert
    const mockOrderId = 'ECO' + Math.random().toString(36).substr(2, 6).toUpperCase();
    console.log('Generated mock order ID:', mockOrderId);
    
    return NextResponse.json({
      orderId: mockOrderId,
      qrCodeURI: 'data:image/png;base64,mock',
      otpHint: '1234',
      order: { id: mockOrderId, status: 'SCHEDULED' }
    });

    // TODO: Restore database operations after testing
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

