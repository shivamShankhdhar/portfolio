import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Certification } from '@/models/Certification';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const certification = await Certification.findById(params.id);
    
    if (!certification) {
      return NextResponse.json({ error: 'Certification not found' }, { status: 404 });
    }
    
    return NextResponse.json(certification);
  } catch (error) {
    console.error('Error fetching certification:', error);
    return NextResponse.json({ error: 'Failed to fetch certification' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const data = await request.json();
    
    const certification = await Certification.findByIdAndUpdate(params.id, data, { new: true });
    
    if (!certification) {
      return NextResponse.json({ error: 'Certification not found' }, { status: 404 });
    }
    
    return NextResponse.json(certification);
  } catch (error) {
    console.error('Error updating certification:', error);
    return NextResponse.json({ error: 'Failed to update certification' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const certification = await Certification.findByIdAndDelete(params.id);
    
    if (!certification) {
      return NextResponse.json({ error: 'Certification not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Certification deleted' });
  } catch (error) {
    console.error('Error deleting certification:', error);
    return NextResponse.json({ error: 'Failed to delete certification' }, { status: 500 });
  }
}
