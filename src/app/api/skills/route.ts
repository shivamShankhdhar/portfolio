import { NextRequest, NextResponse } from 'next/server';
import connectDB, { isDbConfigured } from '@/lib/db';
import { Skill } from '@/models/Skill';
import { defaultSkills } from '@/lib/defaultData';

const proficiencyRank = {
  Expert: 4,
  Advanced: 3,
  Intermediate: 2,
  Beginner: 1,
};

export async function GET() {
  try {
    if (!isDbConfigured()) {
      return NextResponse.json(defaultSkills);
    }

    await connectDB();
    const skills = await Skill.find();

    if (!skills || skills.length === 0) {
      return NextResponse.json(defaultSkills);
    }

    skills.sort((a, b) => {
      const rankA = proficiencyRank[a.proficiency as keyof typeof proficiencyRank] || 0;
      const rankB = proficiencyRank[b.proficiency as keyof typeof proficiencyRank] || 0;
      if (rankA !== rankB) return rankB - rankA;
      return a.name.localeCompare(b.name);
    });

    return NextResponse.json(skills);
  } catch (error) {
    return NextResponse.json(defaultSkills);
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!isDbConfigured()) {
      return NextResponse.json({ error: 'Database not connected. Please set MONGO_URI in .env.' }, { status: 503 });
    }

    await connectDB();
    const data = await request.json();

    if (!data.name || !data.name.trim()) {
      return NextResponse.json({ error: 'Skill name is required' }, { status: 400 });
    }

    const existingSkill = await Skill.findOne({
      name: { $regex: new RegExp(`^${data.name.trim()}$`, 'i') },
    });

    if (existingSkill) {
      return NextResponse.json(
        { error: `Skill "${data.name}" already exists.` },
        { status: 409 }
      );
    }

    const capitalizedName = data.name.trim().charAt(0).toUpperCase() + data.name.trim().slice(1);
    const skill = new Skill({
      ...data,
      name: capitalizedName,
      icon: data.icon || undefined,
      image: data.image || undefined,
      description: data.description || undefined,
    });
    await skill.save();

    return NextResponse.json(skill, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Skill with this name already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: error.message || 'Failed to create skill' }, { status: 500 });
  }
}
