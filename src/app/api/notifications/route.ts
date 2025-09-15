import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { type, data } = await request.json();
    
    const notifications = {
      tokens_added: {
        title: '🪙 Tokens Added!',
        message: `You earned ${data.amount} ECO tokens for ${data.wasteType} waste!`,
        icon: '🎉'
      },
      pickup_scheduled: {
        title: '📅 Pickup Scheduled',
        message: `Your ${data.wasteType} pickup is scheduled for ${data.date}`,
        icon: '🚛'
      },
      pickup_confirmed: {
        title: '✅ Pickup Confirmed',
        message: `Your waste has been collected. Track: ${data.orderId}`,
        icon: '✅'
      },
      classification_complete: {
        title: '🔍 Classification Complete',
        message: `Identified as ${data.wasteType} with ${data.confidence}% confidence`,
        icon: '🤖'
      }
    };

    const notification = notifications[type as keyof typeof notifications];
    
    if (!notification) {
      return NextResponse.json({ error: 'Invalid notification type' }, { status: 400 });
    }

    // Store notification (in production, save to database)
    const notificationData = {
      id: Date.now().toString(),
      ...notification,
      timestamp: new Date().toISOString(),
      read: false,
      data
    };

    return NextResponse.json({
      success: true,
      notification: notificationData
    });

  } catch (error) {
    return NextResponse.json({ error: 'Failed to create notification' }, { status: 500 });
  }
}

export async function GET() {
  // Mock notifications for demo
  const mockNotifications = [
    {
      id: '1',
      title: '🪙 Tokens Added!',
      message: 'You earned 10 ECO tokens for plastic waste!',
      icon: '🎉',
      timestamp: new Date(Date.now() - 300000).toISOString(),
      read: false
    },
    {
      id: '2', 
      title: '📅 Pickup Scheduled',
      message: 'Your plastic pickup is scheduled for tomorrow',
      icon: '🚛',
      timestamp: new Date(Date.now() - 600000).toISOString(),
      read: true
    }
  ];

  return NextResponse.json({ notifications: mockNotifications });
}