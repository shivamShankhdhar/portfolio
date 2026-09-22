import { NextRequest, NextResponse } from 'next/server';
import connectDB, { isDbConfigured } from '@/lib/db';
import Experience from '@/models/Experience';
import { defaultExperience } from '@/lib/defaultData';

export async function GET() {
  try {
    if (!isDbConfigured()) {
      return NextResponse.json(defaultExperience);
    }

    await connectDB();
    const experience = await Experience.find().sort({ startDate: -1 });

    if (!experience || experience.length === 0) {
      return NextResponse.json(defaultExperience);
    }

    return NextResponse.json(experience);
  } catch (error: any) {
    return NextResponse.json(defaultExperience);
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!isDbConfigured()) {
      return NextResponse.json({ message: 'Database not connected. Please set MONGO_URI in .env.' }, { status: 503 });
    }

    await connectDB();
    const body = await request.json();
    const exp = new Experience(body);
    const newExp = await exp.save();
    return NextResponse.json(newExp, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
