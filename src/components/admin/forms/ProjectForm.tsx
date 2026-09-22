'use client';

import React, { useState, useEffect } from 'react';
import { FiSave, FiX } from 'react-icons/fi';

interface ProjectFormProps {
  onSubmit: (data: any) => void;
  onCancel?: () => void;
  initialData?: any;
}

export default function ProjectForm({ onSubmit, onCancel, initialData }: ProjectFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    technologies: '',
    link: '',
    github: '',
    startDate: '',
    endDate: '',
    featured: false,
    projectType: 'Web',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        image: initialData.image || '',
        technologies: Array.isArray(initialData.technologies) ? initialData.technologies.join(', ') : '',
        link: initialData.link || '',
        github: initialData.github || '',
        startDate: initialData.startDate?.split('T')[0] || '',
        endDate: initialData.endDate?.split('T')[0] || '',
        featured: initialData.featured || false,
        projectType: initialData.projectType || 'Web',
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
          {initialData ? 'Edit Project' : 'Add New Project'}
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
            Project Title *
          </label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Ludo Binge Mobile App"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-red-950/40 bg-slate-50/50 dark:bg-[#181822] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Project Type
          </label>
          <select
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-red-950/40 bg-slate-50/50 dark:bg-[#181822] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
          >
            <option value="Web">Web Application</option>
            <option value="Mobile">Mobile Application (Expo/React Native)</option>
            <option value="Backend">Backend / API / Microservice</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Description *
          </label>
          <textarea
            name="description"
            required
            rows={3}
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the architecture, key features, and impact..."
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-red-950/40 bg-slate-50/50 dark:bg-[#181822] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Technologies (comma-separated) *
          </label>
          <input
            type="text"
            name="technologies"
            required
            value={formData.technologies}
            onChange={handleChange}
            placeholder="React Native, Expo, TypeScript, Redux"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-red-950/40 bg-slate-50/50 dark:bg-[#181822] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Live URL / Play Store Link
          </label>
          <input
            type="url"
            name="link"
            value={formData.link}
            onChange={handleChange}
            placeholder="https://play.google.com/store/apps/details?id=..."
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-red-950/40 bg-slate-50/50 dark:bg-[#181822] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            GitHub Repository URL
          </label>
          <input
            type="url"
            name="github"
            value={formData.github}
            onChange={handleChange}
            placeholder="https://github.com/shivamShankhdhar/..."
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-red-950/40 bg-slate-50/50 dark:bg-[#181822] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-red-950/40 bg-slate-50/50 dark:bg-[#181822] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
          />
        </div>

        <div className="md:col-span-2 flex items-center gap-3 pt-2">
          <input
            type="checkbox"
            id="featured"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
            className="h-4 w-4 rounded text-red-600 focus:ring-red-500"
          />
          <label htmlFor="featured" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Mark as Featured Project
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
          <span>{initialData ? 'Update Project' : 'Create Project'}</span>
        </button>
      </div>
    </form>
  );
}
