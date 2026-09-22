import { NextRequest, NextResponse } from 'next/server';
import connectDB, { isDbConfigured } from '@/lib/db';
import Message from '@/models/Message';

export async function GET() {
  try {
    if (!isDbConfigured()) {
      return NextResponse.json({
        messages: [],
        configured: false,
      });
    }

    await connectDB();
    const messages = await Message.find().sort({ createdAt: -1 }).limit(50);
    return NextResponse.json({
      messages,
      configured: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, messages: [] }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    if (!isDbConfigured()) {
      return NextResponse.json({ error: 'Database not connected' }, { status: 503 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Message ID required' }, { status: 400 });
    }

    await connectDB();
    await Message.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
