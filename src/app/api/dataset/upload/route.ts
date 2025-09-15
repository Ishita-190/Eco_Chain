import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://elnmqleoitmkuqlhscvk.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || 'your-service-key'
);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const category = formData.get('category') as string;
    
    if (!file || !category) {
      return NextResponse.json({ error: 'Missing file or category' }, { status: 400 });
    }

    // Upload to Supabase Storage
    const filename = `${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from('training-images')
      .upload(`${category}/${filename}`, file);

    if (error) throw error;

    // Store metadata in existing EcoCommerce database
    const { error: dbError } = await supabase
      .from('TrainingDataset')
      .insert({
        category,
        filename,
        storagePath: data.path,
        fileSize: file.size,
        createdAt: new Date().toISOString()
      });

    if (dbError) throw dbError;

    return NextResponse.json({ 
      success: true, 
      path: data.path,
      message: `Image uploaded to ${category} category`
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('TrainingDataset')
      .select('category')
      .then(result => {
        if (result.error) throw result.error;
        const stats = result.data.reduce((acc: any, item: any) => {
          acc[item.category] = (acc[item.category] || 0) + 1;
          return acc;
        }, {});
        return { data: Object.entries(stats).map(([category, count]) => ({ category, count })), error: null };
      });

    if (error) throw error;

    return NextResponse.json({ stats: data });
  } catch (error) {
    return NextResponse.json({ error: 'Fetch failed' }, { status: 500 });
  }
}