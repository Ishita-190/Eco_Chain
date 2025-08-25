// app/api/uploads/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { create } from 'ipfs-http-client';
import { verifyAuth } from '@/lib/auth';
import { z } from 'zod';

const usePinata = !!process.env.PINATA_JWT;
const ipfs = !usePinata
  ? create({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
      headers: process.env.INFURA_PROJECT_ID && process.env.INFURA_PROJECT_SECRET
        ? {
            authorization: `Basic ${Buffer.from(
              `${process.env.INFURA_PROJECT_ID}:${process.env.INFURA_PROJECT_SECRET}`
            ).toString('base64')}`,
          }
        : undefined,
    })
  : (null as any);

const uploadSchema = z.object({
  image: z.string(), // Base64 encoded image
  contentType: z.string().regex(/^image\/(jpeg|jpg|png|webp)$/),
});

export async function POST(request: NextRequest) {
  try {
    const auth = await verifyAuth(request);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { image, contentType } = uploadSchema.parse(body);

    // Convert base64 to buffer
    const imageBuffer = Buffer.from(image, 'base64');
    
    // Validate file size (max 10MB)
    if (imageBuffer.length > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size exceeds 10MB limit' },
        { status: 400 }
      );
    }

    // Upload to IPFS via Pinata or Infura
    let cid: string;
    if (usePinata) {
      const form = new FormData();
      form.append('file', new Blob([imageBuffer], { type: contentType }), 'waste-image');
      const pinataRes = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.PINATA_JWT}`,
        },
        body: form as any,
      });
      if (!pinataRes.ok) {
        throw new Error('Pinata upload failed');
      }
      const pinataJson = await pinataRes.json();
      cid = pinataJson.IpfsHash;
    } else {
      const result = await ipfs.add(imageBuffer);
      cid = result.path;
    }

    // Generate preview URL
    const previewUrl = `https://ipfs.io/ipfs/${cid}`;

    return NextResponse.json({
      cid,
      previewUrl,
      size: imageBuffer.length,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}