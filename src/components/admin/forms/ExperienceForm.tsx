'use client';

import React, { useState, useEffect } from 'react';
import { FiSave, FiX } from 'react-icons/fi';

interface ExperienceFormProps {
  onSubmit: (data: any) => void;
  onCancel?: () => void;
  initialData?: any;
}

export default function ExperienceForm({ onSubmit, onCancel, initialData }: ExperienceFormProps) {
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    description: '',
    startDate: '',
    endDate: '',
    isCurrentRole: false,
    technologies: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        company: initialData.company || '',
        position: initialData.position || '',
        description: initialData.description || '',
        startDate: initialData.startDate?.split('T')[0] || '',
        endDate: initialData.endDate?.split('T')[0] || '',
        isCurrentRole: initialData.isCurrentRole || false,
        technologies: Array.isArray(initialData.technologies) ? initialData.technologies.join(', ') : '',
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      technologies: formData.technologies
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-red-200/60 dark:border-red-900/30 bg-white dark:bg-[#121217] p-6 sm:p-8 shadow-xl"
    >
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-red-950/30 pb-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          {initialData ? 'Edit Work Experience' : 'Add New Work Experience'}
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
            Company Name *
          </label>
          <input
            type="text"
            required
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="e.g. Acme Technologies"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-red-950/40 bg-slate-50/50 dark:bg-[#181822] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Job Title / Position *
          </label>
          <input
            type="text"
            required
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="e.g. Lead Full Stack & Mobile Engineer"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-red-950/40 bg-slate-50/50 dark:bg-[#181822] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Description & Key Accomplishments *
          </label>
          <textarea
            required
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your technical contributions, features delivered, and architectural highlights..."
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-red-950/40 bg-slate-50/50 dark:bg-[#181822] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 resize-none"
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
            End Date {!formData.isCurrentRole && '*'}
          </label>
          <input
            type="date"
            name="endDate"
            disabled={formData.isCurrentRole}
            value={formData.endDate}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-red-950/40 bg-slate-50/50 dark:bg-[#181822] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 disabled:opacity-50"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Technologies Used (comma-separated)
          </label>
          <input
            type="text"
            name="technologies"
            value={formData.technologies}
            onChange={handleChange}
            placeholder="React Native, Expo, Java, Spring Boot, PostgreSQL"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-red-950/40 bg-slate-50/50 dark:bg-[#181822] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
          />
        </div>

        <div className="md:col-span-2 flex items-center gap-3">
          <input
            type="checkbox"
            id="isCurrentRole"
            name="isCurrentRole"
            checked={formData.isCurrentRole}
            onChange={handleChange}
            className="h-4 w-4 rounded text-red-600 focus:ring-red-500"
          />
          <label htmlFor="isCurrentRole" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            This is my current role
          </label>
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
          <span>{initialData ? 'Update Experience' : 'Save Experience'}</span>
        </button>
      </div>
    </form>
  );
}
