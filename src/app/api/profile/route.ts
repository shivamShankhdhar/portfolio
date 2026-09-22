import connectDB, { isDbConfigured } from '@/lib/db';
import Profile from '@/models/Profile';

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
  linkedinUrl: 'https://linkedin.com/in/shivam-shankhdhar',
  githubUrl: 'https://github.com/shivamShankhdhar',
  email: 's.shankhdhar1981@gmail.com',
};

export async function GET() {
  try {
    if (!isDbConfigured()) {
      return Response.json({
        success: true,
        data: defaultProfile,
      });
    }

    await connectDB();
    const profile: any = await Profile.findOne().lean();

    if (!profile) {
      return Response.json({
        success: true,
        data: defaultProfile,
      });
    }

    // Ensure linkedinUrl is not empty or pointing to an obsolete handle
    if (!profile.linkedinUrl || profile.linkedinUrl.includes('er-shivam-shankhdhar-930799141')) {
      profile.linkedinUrl = 'https://www.linkedin.com/in/shivam-shankhdhar';
    }

    return Response.json({
      success: true,
      data: profile,
    });
  } catch (error: any) {
    return Response.json({
      success: true,
      data: defaultProfile,
    });
  }
}

export async function POST(request: Request) {
  try {
    if (!isDbConfigured()) {
      return Response.json({ success: false, error: 'Database not connected. Please set MONGO_URI in .env.' }, { status: 503 });
    }

    await connectDB();
    const body = await request.json();
    const { name, bio, linkedinUrl, githubUrl, email, available, roles } = body;

    if (!name) {
      return Response.json({ success: false, error: 'Name is required' }, { status: 400 });
    }

    await Profile.deleteMany({});
    const profile = new Profile({
      name,
      bio,
      linkedinUrl,
      githubUrl,
      email,
      available,
      roles,
    });

    await profile.save();
    return Response.json({ success: true, data: profile }, { status: 201 });
  } catch (error: any) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    if (!isDbConfigured()) {
      return Response.json({ success: false, error: 'Database not connected. Please set MONGO_URI in .env.' }, { status: 503 });
    }

    await connectDB();
    const body = await request.json();
    const { name, bio, linkedinUrl, githubUrl, email, available, roles } = body;

    if (!name) {
      return Response.json({ success: false, error: 'Name is required' }, { status: 400 });
    }

    const profile = await Profile.findOneAndUpdate(
      {},
      { name, bio, linkedinUrl, githubUrl, email, available, roles },
      { upsert: true, new: true }
    );

    return Response.json({ success: true, data: profile }, { status: 200 });
  } catch (error: any) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
