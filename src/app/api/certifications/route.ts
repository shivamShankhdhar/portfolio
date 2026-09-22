import { NextRequest, NextResponse } from 'next/server';
import connectDB, { isDbConfigured } from '@/lib/db';
import Certification from '@/models/Certification';
import { defaultCertifications } from '@/lib/defaultData';

export async function GET() {
  try {
    if (!isDbConfigured()) {
      return NextResponse.json(defaultCertifications);
    }

    await connectDB();
    const certifications = await Certification.find().sort({ issueDate: -1 });

    if (!certifications || certifications.length === 0) {
      return NextResponse.json(defaultCertifications);
    }

    return NextResponse.json(certifications);
  } catch (error: any) {
    return NextResponse.json(defaultCertifications);
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!isDbConfigured()) {
      return NextResponse.json({ message: 'Database not connected. Please set MONGO_URI in .env.' }, { status: 503 });
    }

    await connectDB();
    const body = await request.json();
    const certification = new Certification(body);
    const newCertification = await certification.save();
    return NextResponse.json(newCertification, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
