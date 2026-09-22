'use client';

import React, { useState, useEffect } from 'react';
import { FiSave, FiX } from 'react-icons/fi';

interface EducationFormProps {
  onSubmit: (data: any) => void;
  onCancel?: () => void;
  initialData?: any;
}

export default function EducationForm({ onSubmit, onCancel, initialData }: EducationFormProps) {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    description: '',
    grade: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        school: initialData.school || '',
        degree: initialData.degree || '',
        field: initialData.field || '',
        startDate: initialData.startDate?.split('T')[0] || '',
        endDate: initialData.endDate?.split('T')[0] || '',
        description: initialData.description || '',
        grade: initialData.grade || '',
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-red-200/60 dark:border-red-900/30 bg-white dark:bg-[#121217] p-6 sm:p-8 shadow-xl"
    >
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-red-950/30 pb-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          {initialData ? 'Edit Education Record' : 'Add Education Record'}
        </h2>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
          >
            <FiX className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            School / University *
          </label>
          <input
            type="text"
            required
            name="school"
            value={formData.school}
            onChange={handleChange}
            placeholder="e.g. APJ Abdul Kalam Technical University"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-red-950/40 bg-slate-50/50 dark:bg-[#181822] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Degree *
          </label>
          <input
            type="text"
            required
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            placeholder="e.g. Bachelor of Technology (B.Tech)"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-red-950/40 bg-slate-50/50 dark:bg-[#181822] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Field of Study *
          </label>
          <input
            type="text"
            required
            name="field"
            value={formData.field}
            onChange={handleChange}
            placeholder="e.g. Computer Science & Engineering"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-red-950/40 bg-slate-50/50 dark:bg-[#181822] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Grade / Honors (Optional)
          </label>
          <input
            type="text"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            placeholder="e.g. First Class with Distinction"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-red-950/40 bg-slate-50/50 dark:bg-[#181822] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Start Date *
          </label>
          <input
            type="date"
            required
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-red-950/40 bg-slate-50/50 dark:bg-[#181822] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-red-950/40 bg-slate-50/50 dark:bg-[#181822] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Description
          </label>
          <textarea
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Specializations, relevant coursework, thesis..."
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-red-950/40 bg-slate-50/50 dark:bg-[#181822] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 resize-none"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-red-950/30">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold text-sm shadow-md shadow-red-600/25 transition"
        >
          <FiSave className="h-4 w-4" />
          <span>{initialData ? 'Update Education' : 'Save Education'}</span>
        </button>
      </div>
    </form>
  );
}
