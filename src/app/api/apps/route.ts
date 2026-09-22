import { NextRequest, NextResponse } from 'next/server';
import connectDB, { isDbConfigured } from '@/lib/db';
import App from '@/models/App';
import { defaultApps } from '@/lib/defaultData';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    const isAdmin = url.searchParams.get('admin') === 'true';

    // If database is not configured in .env
    if (!isDbConfigured()) {
      if (isAdmin) {
        return NextResponse.json([]);
      }
      if (category) {
        const filtered = defaultApps.filter(
          (a) => a.category.toLowerCase() === category.toLowerCase()
        );
        return NextResponse.json(filtered);
      }
      return NextResponse.json(defaultApps);
    }

    await connectDB();

    // If database has 0 apps, auto-seed the real apps once so they have genuine ObjectIds
    const totalAppsCount = await App.countDocuments();
    if (totalAppsCount === 0) {
      try {
        const appsToSeed = defaultApps.map((a) => {
          const { _id, ...rest } = a;
          return rest;
        });
        await App.insertMany(appsToSeed);
      } catch (seedErr) {
        console.warn('Auto-seed apps warning:', seedErr);
      }
    }

    const query: any = {};
    if (category) {
      query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    const apps = await App.find(query).sort({ order: 1, createdAt: -1 });

    // Fallback if collection is empty
    if (!apps || apps.length === 0) {
      if (isAdmin) {
        return NextResponse.json([]);
      }
      if (category) {
        const filtered = defaultApps.filter(
          (a) => a.category.toLowerCase() === category.toLowerCase()
        );
        return NextResponse.json(filtered);
      }
      return NextResponse.json(defaultApps);
    }

    return NextResponse.json(apps);
  } catch (error: any) {
    console.error('Error fetching apps:', error);
    const url = new URL(request.url);
    const isAdmin = url.searchParams.get('admin') === 'true';
    if (isAdmin) {
      return NextResponse.json([]);
    }
    const category = url.searchParams.get('category');
    if (category) {
      const filtered = defaultApps.filter(
        (a) => a.category.toLowerCase() === category.toLowerCase()
      );
      return NextResponse.json(filtered);
    }
    return NextResponse.json(defaultApps);
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!isDbConfigured()) {
      return NextResponse.json(
        { message: 'Database not connected. Please configure MONGO_URI in .env.' },
        { status: 503 }
      );
    }

    await connectDB();
    const body = await request.json();
    
    // Ensure category defaults to 'Games' if empty
    if (!body.category || body.category.trim() === '') {
      body.category = 'Games';
    }

    const app = new App(body);
    const savedApp = await app.save();
    return NextResponse.json(savedApp, { status: 201 });
  } catch (error: any) {
    console.error('Error creating app:', error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
