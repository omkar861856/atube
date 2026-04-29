import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Feedback } from '@/lib/models';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, message, contact, page } = body;

    if (!type || !message?.trim()) {
      return NextResponse.json({ error: 'type and message are required' }, { status: 400 });
    }

    if (message.trim().length > 2000) {
      return NextResponse.json({ error: 'Message too long (max 2000 chars)' }, { status: 400 });
    }

    await connectDB();
    const doc = await Feedback().create({
      type,
      message: message.trim(),
      contact: contact?.trim() || undefined,
      page: page || undefined,
      userAgent: req.headers.get('user-agent') || undefined,
      status: 'open',
    });

    return NextResponse.json({ success: true, id: doc._id }, { status: 201 });
  } catch (err) {
    console.error('[Feedback API]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
