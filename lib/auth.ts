// lib/auth.ts
import { NextRequest } from 'next/server';
import { SignJWT, jwtVerify } from 'jose';
import { z } from 'zod';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret-do-not-use');

export interface AuthPayload {
  userId: string;
  address: string;
  iat: number;
  exp: number;
}

export async function createJWT(payload: Omit<AuthPayload, 'iat' | 'exp'>) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

export async function verifyAuth(request: NextRequest): Promise<AuthPayload | null> {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.substring(7);
    const { payload } = await jwtVerify(token, JWT_SECRET);
    
    return payload as AuthPayload;
  } catch {
    return null;
  }
}
