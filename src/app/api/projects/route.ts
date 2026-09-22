import { NextRequest, NextResponse } from 'next/server';
import connectDB, { isDbConfigured } from '@/lib/db';
import Project from '@/models/Project';
import { defaultProjects } from '@/lib/defaultData';

export async function GET(request: NextRequest) {
  try {
    if (!isDbConfigured()) {
      const url = new URL(request.url);
      const featured = url.searchParams.get('featured');
      if (featured === 'true') {
        return NextResponse.json(defaultProjects.filter((p) => p.featured));
      }
      return NextResponse.json(defaultProjects);
    }

    await connectDB();
    const url = new URL(request.url);
    const featured = url.searchParams.get('featured');

    let projects;
    if (featured === 'true') {
      projects = await Project.find({ featured: true }).sort({ startDate: -1 });
    } else {
      projects = await Project.find().sort({ startDate: -1 });
    }

    if (!projects || projects.length === 0) {
      return NextResponse.json(defaultProjects);
    }

    return NextResponse.json(projects);
  } catch (error: any) {
    return NextResponse.json(defaultProjects);
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!isDbConfigured()) {
      return NextResponse.json({ message: 'Database not connected. Please set MONGO_URI in .env.' }, { status: 503 });
    }

    await connectDB();
    const body = await request.json();
    const project = new Project(body);
    const newProject = await project.save();
    return NextResponse.json(newProject, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
