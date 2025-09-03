// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// Prevent multiple instances of Prisma Client in development
declare global {
  var prisma: PrismaClient | undefined;
}

// Use global variable in development to prevent hot reload issues
// In production, create a new instance each time
export const prisma = globalThis.prisma || new PrismaClient();

// Only store in global during development
if (process.env.NODE_ENV === 'development') {
  globalThis.prisma = prisma;
}
