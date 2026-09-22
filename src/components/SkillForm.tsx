'use client';

import React, { useState, useEffect } from 'react';
import { FiSave, FiX } from 'react-icons/fi';

interface Skill {
  _id?: string;
  name: string;
  category: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  icon?: string;
  image?: string;
  description?: string;
}

interface SkillFormProps {
  skill?: Skill;
  onSave: (skill: Skill) => Promise<void>;
  onCancel: () => void;
}

export default function SkillForm({ skill, onSave, onCancel }: SkillFormProps) {
  const [formData, setFormData] = useState<Skill>(
    skill || {
      name: '',
      category: 'Frontend',
      proficiency: 'Advanced',
      description: '',
    }
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (skill) {
      setFormData({
        ...skill,
      });
    } else {
      setFormData({
        name: '',
        category: 'Frontend',
        proficiency: 'Advanced',
        description: '',
      });
    }
  }, [skill]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-red-200/60 dark:border-red-900/30 bg-white dark:bg-[#121217] p-6 sm:p-8 shadow-xl"
    >
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-red-950/30 pb-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          {skill ? 'Edit Skill' : 'Add New Skill'}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
        >
          <FiX className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Skill Name *
          </label>
          <input
            type="text"
            required
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. React Native, Java, Docker"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-red-950/40 bg-slate-50/50 dark:bg-[#181822] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Category *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-red-950/40 bg-slate-50/50 dark:bg-[#181822] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
          >
            <option value="Mobile">Mobile (React Native / Expo)</option>
            <option value="Frontend">Frontend (React / Next.js / CSS)</option>
            <option value="Backend">Backend (Node / Java / APIs)</option>
            <option value="Databases">Databases (MongoDB / SQL)</option>
            <option value="Languages">Languages (TypeScript / JS / Java)</option>
            <option value="DevOps & Tools">DevOps & Tools (Git / Docker / Gradle)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Proficiency Level *
          </label>
          <select
            name="proficiency"
            value={formData.proficiency}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-red-950/40 bg-slate-50/50 dark:bg-[#181822] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
          >
            <option value="Expert">Expert (95%)</option>
            <option value="Advanced">Advanced (85%)</option>
            <option value="Intermediate">Intermediate (70%)</option>
            <option value="Beginner">Beginner (50%)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Short Description / Specialty
          </label>
          <input
            type="text"
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            placeholder="e.g. Cross-platform native iOS & Android development"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-red-950/40 bg-slate-50/50 dark:bg-[#181822] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-red-950/30">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold text-sm shadow-md shadow-red-600/25 transition disabled:opacity-50"
        >
          <FiSave className="h-4 w-4" />
          <span>{loading ? 'Saving...' : skill ? 'Update Skill' : 'Create Skill'}</span>
        </button>
      </div>
    </form>
  );
}
