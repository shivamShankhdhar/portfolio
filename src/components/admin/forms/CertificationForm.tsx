'use client';

import React, { useState, useEffect } from 'react';
import { FiSave, FiX } from 'react-icons/fi';

interface CertificationFormProps {
  onSubmit: (data: any) => void;
  onCancel?: () => void;
  initialData?: any;
}

export default function CertificationForm({ onSubmit, onCancel, initialData }: CertificationFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    issueDate: '',
    expiryDate: '',
    credentialId: '',
    credentialUrl: '',
    description: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        issuer: initialData.issuer || '',
        issueDate: initialData.issueDate?.split('T')[0] || '',
        expiryDate: initialData.expiryDate?.split('T')[0] || '',
        credentialId: initialData.credentialId || '',
        credentialUrl: initialData.credentialUrl || '',
        description: initialData.description || '',
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
          {initialData ? 'Edit Certification' : 'Add New Certification'}
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
            Certification Title *
          </label>
          <input
            type="text"
            required
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Meta React Native Specialization"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-red-950/40 bg-slate-50/50 dark:bg-[#181822] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Issuing Organization *
          </label>
          <input
            type="text"
            required
            name="issuer"
            value={formData.issuer}
            onChange={handleChange}
            placeholder="e.g. Meta, AWS, Oracle, IBM"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-red-950/40 bg-slate-50/50 dark:bg-[#181822] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Issue Date *
          </label>
          <input
            type="date"
            required
            name="issueDate"
            value={formData.issueDate}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-red-950/40 bg-slate-50/50 dark:bg-[#181822] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Expiration Date (Optional)
          </label>
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-red-950/40 bg-slate-50/50 dark:bg-[#181822] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Credential ID
          </label>
          <input
            type="text"
            name="credentialId"
            value={formData.credentialId}
            onChange={handleChange}
            placeholder="e.g. META-RN-9921"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-red-950/40 bg-slate-50/50 dark:bg-[#181822] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Verification URL
          </label>
          <input
            type="url"
            name="credentialUrl"
            value={formData.credentialUrl}
            onChange={handleChange}
            placeholder="https://coursera.org/verify/..."
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-red-950/40 bg-slate-50/50 dark:bg-[#181822] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Description
          </label>
          <textarea
            rows={2}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Skills validated, topics covered..."
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
          <span>{initialData ? 'Update Certification' : 'Save Certification'}</span>
        </button>
      </div>
    </form>
  );
}
