// app/api/auth/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createJWT } from '@/lib/auth';
import { z } from 'zod';

const authSchema = z.object({
  address: z.string().regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid Ethereum address'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { address } = authSchema.parse(body);

    // In a production app, you might want to verify the wallet signature
    // For now, we'll create a JWT for any valid address
    const token = await createJWT({
      userId: address.toLowerCase(), // Use address as userId for simplicity
      address: address.toLowerCase(),
    });

    return NextResponse.json({
      token,
      address: address.toLowerCase(),
    });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 400 }
    );
  }
}
