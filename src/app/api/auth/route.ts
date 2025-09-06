import { NextRequest, NextResponse } from 'next/server';
import { createJWT } from '@/src/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { address } = await request.json();
    
    if (!address) {
      return NextResponse.json({ error: 'Address required' }, { status: 400 });
    }

    // Create a mock user ID based on address
    const userId = `user_${address.slice(2, 10)}`;
    
    const token = await createJWT({
      userId,
      address,
    });

    return NextResponse.json({ token, userId });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}