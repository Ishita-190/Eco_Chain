// lib/auth.ts
import { NextRequest } from 'next/server';
import { SignJWT, jwtVerify, JWTPayload } from 'jose';
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
    if (!authHeader?.startsWith('Bearer ')) return null;

    const token = authHeader.substring(7);
    const { payload } = await jwtVerify(token, JWT_SECRET);

    // Validate and map payload to AuthPayload
    const authSchema = z.object({
      userId: z.string(),
      address: z.string(),
      iat: z.number(),
      exp: z.number(),
    });

    const result = authSchema.safeParse(payload as JWTPayload);
    if (!result.success) return null;

    return result.data;
  } catch {
    return null;
  }
}
