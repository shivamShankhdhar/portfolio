import { NextResponse } from 'next/server';
import connectDB, { isDbConfigured } from '@/lib/db';
import Profile from '@/models/Profile';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const defaultProfile = {
  name: 'Shivam Shankhdhar',
  bio: 'Passionate Full Stack & Mobile Engineer dedicated to architecting high-performance web applications, native mobile experiences (React Native / Expo), and scalable backend systems. Proven track record of shipping end-to-end products to production.',
  available: true,
  roles: [
    'Full Stack Engineer',
    'Mobile App Specialist (React Native / Expo)',
    'Java & Spring Boot Engineer',
    'MERN Stack Architect',
    'Next.js & TypeScript Developer',
  ],
  linkedinUrl: 'https://www.linkedin.com/in/er-shivam-shankhdhar-930799141',
  githubUrl: 'https://github.com/shivamShankhdhar',
  email: 'er.shivam1214@gmail.com',
  phone: '+91 8448967919',
  location: 'Bareilly, Uttar Pradesh, India',
  yearsExperience: '3+',
  projectsCompleted: '20+',
  happyClients: '100%',
  portfolioUrl: 'https://www.shivamshankhdhar.online',
  appsUrl: 'https://www.apps.shivamshankhdhar.online',
  adminUrl: 'https://www.admin.shivamshankhdhar.online',
  headlineQuote:
    'Engineering is not merely writing code to make things work; it is designing resilient architectures that endure under load and craft experiences users love.',
};

export async function GET() {
  const headers = {
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
  };

  try {
    if (!isDbConfigured()) {
      return NextResponse.json({
        success: true,
        data: defaultProfile,
      }, { headers });
    }

    await connectDB();
    const profile: any = await Profile.findOne().lean();

    if (!profile) {
      return NextResponse.json({
        success: true,
        data: defaultProfile,
      }, { headers });
    }

    return NextResponse.json({
      success: true,
      data: profile,
    }, { headers });
  } catch (error: any) {
    return NextResponse.json({
      success: true,
      data: defaultProfile,
    }, { headers });
  }
}

export async function POST(request: Request) {
  try {
    if (!isDbConfigured()) {
      return Response.json({ success: false, error: 'Database not connected. Please set MONGO_URI in .env.' }, { status: 503 });
    }

    await connectDB();
    const body = await request.json();
    const { _id, __v, createdAt, updatedAt, ...updates } = body;

    if (!updates.name) {
      return Response.json({ success: false, error: 'Name is required' }, { status: 400 });
    }

    const profile = await Profile.findOneAndUpdate(
      {},
      { $set: updates },
      { upsert: true, new: true }
    ).lean();

    return Response.json({ success: true, data: profile }, { status: 201 });
  } catch (error: any) {
    console.error('[Profile API] POST error:', error);
    let errorMessage = error.message || 'Failed to save profile';
    if (errorMessage.includes('bad auth')) {
      errorMessage = 'Database authentication failed ("bad auth"). Please check the MONGO_URI username and password in your production environment variables (e.g. Vercel dashboard) and MongoDB Atlas Database Access settings.';
    }
    return Response.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    if (!isDbConfigured()) {
      return Response.json({ success: false, error: 'Database not connected. Please set MONGO_URI in .env.' }, { status: 503 });
    }

    await connectDB();
    const body = await request.json();
    const { _id, __v, createdAt, updatedAt, ...updates } = body;

    if (!updates.name) {
      return Response.json({ success: false, error: 'Name is required' }, { status: 400 });
    }

    const profile = await Profile.findOneAndUpdate(
      {},
      { $set: updates },
      { upsert: true, new: true }
    ).lean();

    return Response.json({ success: true, data: profile }, { status: 200 });
  } catch (error: any) {
    console.error('[Profile API] PUT error:', error);
    let errorMessage = error.message || 'Failed to update profile';
    if (errorMessage.includes('bad auth')) {
      errorMessage = 'Database authentication failed ("bad auth"). Please check the MONGO_URI username and password in your production environment variables (e.g. Vercel dashboard) and MongoDB Atlas Database Access settings.';
    }
    return Response.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
