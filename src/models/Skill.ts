import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  category: {
    type: String,
    enum: ['Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Other'],
    required: true,
  },
  proficiency: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
    required: true,
  },
  icon: String,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Skill = mongoose.models.Skill || mongoose.model('Skill', SkillSchema);
