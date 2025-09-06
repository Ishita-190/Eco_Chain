import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = params.id;
    
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

    const isPickup = mockOrder.pickupType === 'PICKUP';
    const collectionType = isPickup ? 'Pickup' : 'Drop-off';
    
    const mockTimeline = [
      {
        id: '1',
        type: 'CREATED',
        title: 'Collection Request Created',
        message: `Your ${collectionType.toLowerCase()} request has been created successfully.`,
        createdAt: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
      },
      {
        id: '2',
        type: 'SCHEDULED',
        title: `${collectionType} Scheduled`,
        message: `${collectionType} has been scheduled for your convenience.`,
        createdAt: new Date().toISOString()
      }
    ];

    return NextResponse.json({
      order: mockOrder,
      timeline: mockTimeline
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch order timeline' },
      { status: 500 }
    );
  }
}


