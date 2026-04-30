import { searchVideos, SearchParams } from '@/lib/api';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const params: SearchParams = {
    query: searchParams.get('query') || 'vertical mobile pov amateur',
    per_page: Number(searchParams.get('per_page')) || 20,
    page: Number(searchParams.get('page')) || 1,
    order: (searchParams.get('order') as any) || 'most-popular',
  };

  try {
    const data = await searchVideos(params);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
  }
}
