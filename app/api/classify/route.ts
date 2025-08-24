// app/api/classify/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyAuth } from '@/lib/auth';
import { z } from 'zod';

const prisma = new PrismaClient();

const classifySchema = z.object({
  imageCID: z.string(),
  imageUrl: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const auth = await verifyAuth(request);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { imageCID, imageUrl } = classifySchema.parse(body);

    // Call AI classification service
    const aiResponse = await fetch(`${process.env.AI_SERVICE_URL}/classify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cid: imageCID }),
    });

    if (!aiResponse.ok) {
      throw new Error('AI service unavailable');
    }

    const aiResult = await aiResponse.json();

    // Store classification in database
    const classification = await prisma.classification.create({
      data: {
        userId: auth.userId,
        imageCID,
        imageUrl,
        label: aiResult.label,
        confidence: aiResult.confidence,
        secondary: aiResult.secondary || [],
        explanation: aiResult.explanation_md,
        tips: aiResult.tips_md,
      },
    });

    // Find compatible facilities
    const facilities = await prisma.facility.findMany({
      where: {
        typesAccepted: {
          has: aiResult.label,
        },
      },
      take: 5,
    });

    return NextResponse.json({
      classification,
      facilities,
      aiResult,
    });
  } catch (error) {
    console.error('Classification error:', error);
    return NextResponse.json(
      { error: 'Failed to classify image' },
      { status: 500 }
    );
  }
}
