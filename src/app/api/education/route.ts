import { NextRequest, NextResponse } from 'next/server';
import connectDB, { isDbConfigured } from '@/lib/db';
import Education from '@/models/Education';
import { defaultEducation } from '@/lib/defaultData';

export async function GET() {
  try {
    if (!isDbConfigured()) {
      return NextResponse.json(defaultEducation);
    }

    await connectDB();
    const education = await Education.find().sort({ startDate: -1 });

    if (!education || education.length === 0) {
      return NextResponse.json(defaultEducation);
    }

    return NextResponse.json(education);
  } catch (error: any) {
    return NextResponse.json(defaultEducation);
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!isDbConfigured()) {
      return NextResponse.json({ message: 'Database not connected. Please set MONGO_URI in .env.' }, { status: 503 });
    }

    await connectDB();
    const body = await request.json();
    const education = new Education(body);
    const newEducation = await education.save();
    return NextResponse.json(newEducation, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
