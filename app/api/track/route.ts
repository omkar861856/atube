import { NextResponse } from 'next/server';
import { trackVideoView } from '@/lib/analytics';

export async function POST(req: Request) {
  try {
    const { videoId, title } = await req.json();
    if (videoId && title) {
      await trackVideoView(videoId, title);
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
