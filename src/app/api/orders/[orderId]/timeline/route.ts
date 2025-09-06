import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const { orderId } = params;
    
    // Mock order data
    const mockOrder = {
      id: orderId,
      status: 'SCHEDULED',
      wasteType: 'plastic',
      estimatedWeight: 2.5,
      scheduledAt: new Date().toISOString(),
      pickupType: 'PICKUP',
      qrCode: 'data:image/png;base64,mock-qr-code',
      otpHint: '1234',
      facility: {
        name: 'Green Recycling Center',
        address: '123 Eco Street, Green City',
        phone: '+1-555-0123'
      }
    };

    // Mock timeline events
    const mockTimeline = [
      {
        id: '1',
        type: 'CREATED',
        title: 'Order Created',
        message: 'Your waste disposal order has been created.',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        type: 'SCHEDULED',
        title: 'Pickup Scheduled',
        message: 'Pickup has been scheduled for your convenience.',
        createdAt: new Date().toISOString()
      }
    ];

    return NextResponse.json({
      order: mockOrder,
      timeline: mockTimeline
    });
  } catch (error) {
    console.error('Timeline API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order timeline' },
      { status: 500 }
    );
  }
}