// app/api/uploads/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { z } from 'zod';

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

    const imageBuffer = Buffer.from(image, 'base64');
    if (imageBuffer.length > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size exceeds 10MB limit' }, { status: 400 });
    }

    // ✅ Always upload via Pinata
    const form = new FormData();
    form.append('file', new Blob([imageBuffer], { type: contentType }), 'waste-image');
    const pinataRes = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PINATA_JWT}`,
      },
      body: form as any,
    });

    if (!pinataRes.ok) throw new Error('Pinata upload failed');
    const pinataJson = await pinataRes.json();

    const cid = pinataJson.IpfsHash;
    const previewUrl = `https://ipfs.io/ipfs/${cid}`;

    return NextResponse.json({ cid, previewUrl, size: imageBuffer.length });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}
