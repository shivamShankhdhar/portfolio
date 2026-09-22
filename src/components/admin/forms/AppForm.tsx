'use client';

import React, { useState, useEffect } from 'react';
import { FiSave, FiX, FiInfo } from 'react-icons/fi';
import { FaGamepad } from 'react-icons/fa6';

interface AppFormProps {
  onSubmit: (data: any) => void;
  onCancel?: () => void;
  initialData?: any;
}

export default function AppForm({ onSubmit, onCancel, initialData }: AppFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    tagline: '',
    category: 'Games',
    package: '',
    version: 'v1.0.0',
    status: 'Play Store Ready',
    rating: '4.9',
    ratingCount: '500+ Players',
    icon: '🎮',
    bannerType: 'default',
    playStoreUrl: '',
    privacyUrl: '',
    technologies: '',
    highlights: '',
    featuresText: 'Platform: Android 8.0+ (API 26+)\nBundle Format: Signed Android AAB\nEngine AI: Multi-Depth Evaluation\nMonetization: Google AdMob Compliant',
    featured: true,
    order: 0,
  });

  useEffect(() => {
    if (initialData) {
      // Parse features into text lines
      const featuresFormatted = Array.isArray(initialData.features)
        ? initialData.features.map((f: any) => `${f.label}: ${f.value}`).join('\n')
        : '';

      setFormData({
        title: initialData.title || '',
        subtitle: initialData.subtitle || '',
        tagline: initialData.tagline || '',
        category: initialData.category || 'Games',
        package: initialData.package || '',
        version: initialData.version || 'v1.0.0',
        status: initialData.status || 'Play Store Ready',
        rating: initialData.rating || '4.9',
        ratingCount: initialData.ratingCount || '500+ Players',
        icon: initialData.icon || '🎮',
        bannerType: initialData.bannerType || 'default',
        playStoreUrl: initialData.playStoreUrl || '',
        privacyUrl: initialData.privacyUrl || '',
        technologies: Array.isArray(initialData.technologies) ? initialData.technologies.join(', ') : '',
        highlights: Array.isArray(initialData.highlights) ? initialData.highlights.join('\n') : '',
        featuresText: featuresFormatted || 'Platform: Android 8.0+ (API 26+)\nBundle Format: Signed Android AAB',
        featured: initialData.featured !== undefined ? initialData.featured : true,
        order: initialData.order || 0,
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Parse features from text lines
    const parsedFeatures = formData.featuresText
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.includes(':'))
      .map((line) => {
        const parts = line.split(':');
        return {
          label: parts[0].trim(),
          value: parts.slice(1).join(':').trim(),
        };
      });

    // Parse highlights from text lines
    const parsedHighlights = formData.highlights
      .split('\n')
      .map((h) => h.trim())
      .filter((h) => h.length > 0);

    // Parse technologies from comma-separated string
    const parsedTech = formData.technologies
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const submissionData = {
      title: formData.title,
      subtitle: formData.subtitle,
      tagline: formData.tagline,
      category: formData.category,
      package: formData.package,
      version: formData.version,
      status: formData.status,
      rating: formData.rating,
      ratingCount: formData.ratingCount,
      icon: formData.icon,
      bannerType: formData.bannerType,
      playStoreUrl: formData.playStoreUrl,
      privacyUrl: formData.privacyUrl,
      technologies: parsedTech,
      highlights: parsedHighlights,
      features: parsedFeatures,
      featured: formData.featured,
      order: Number(formData.order) || 0,
    };

    onSubmit(submissionData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-red-200/60 dark:border-red-900/30 bg-white dark:bg-[#121217] p-6 sm:p-8 shadow-xl max-h-[85vh] overflow-y-auto"
    >
      {/* Form Header */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-red-950/30 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-red-500/15 border border-red-500/30 text-red-500 flex items-center justify-center">
            <FaGamepad className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {initialData ? 'Edit Mobile App / Game' : 'Add New App / Game'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Apps categorized under <span className="text-red-500 font-semibold">&quot;Games&quot;</span> are dynamically listed on the public Games Showcase.
            </p>
          </div>
        </div>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer transition-colors"
          >
            <FiX className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Title */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            App Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="e.g. Chess Binge or Ludo Binge"
            className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Subtitle */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Subtitle / Short Spec
          </label>
          <input
            type="text"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            placeholder="e.g. Grandmaster AI & Tactical Analysis"
            className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Category *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#191a24] text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
          >
            <option value="Games">Games (Listed on /mobile-apps/games)</option>
            <option value="Productivity">Productivity</option>
            <option value="Utilities">Utilities</option>
            <option value="Social">Social</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Package Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Android Package Name *
          </label>
          <input
            type="text"
            name="package"
            value={formData.package}
            onChange={handleChange}
            required
            placeholder="e.g. chess.binge or ludo.binge"
            className="w-full px-3.5 py-2 rounded-xl text-sm font-mono border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-red-500 dark:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Version */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Version
          </label>
          <input
            type="text"
            name="version"
            value={formData.version}
            onChange={handleChange}
            placeholder="e.g. v2.0.2"
            className="w-full px-3.5 py-2 rounded-xl text-sm font-mono border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Status
          </label>
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
            placeholder="e.g. Published on Google Play or Play Store Ready"
            className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Icon & Banner Style */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Icon (Emoji / Symbol)
          </label>
          <input
            type="text"
            name="icon"
            value={formData.icon}
            onChange={handleChange}
            placeholder="e.g. ♟️, 🎲, 🎮"
            className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Banner Style
          </label>
          <select
            name="bannerType"
            value={formData.bannerType}
            onChange={handleChange}
            className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#191a24] text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
          >
            <option value="chess">Chess (Dark Crimson Checkerboard)</option>
            <option value="ludo">Ludo (Arcade Neon Quadrants)</option>
            <option value="arcade">Arcade Cyber Grid</option>
            <option value="default">Default Dark Gradient</option>
          </select>
        </div>

        {/* Rating & Rating Count */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Rating Score
          </label>
          <input
            type="text"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            placeholder="e.g. 4.9"
            className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Rating Count / Reviews
          </label>
          <input
            type="text"
            name="ratingCount"
            value={formData.ratingCount}
            onChange={handleChange}
            placeholder="e.g. 500+ Players or Early Access"
            className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      {/* Description / Tagline */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          Tagline / Description *
        </label>
        <textarea
          name="tagline"
          rows={2}
          value={formData.tagline}
          onChange={handleChange}
          required
          placeholder="High-performance native Android game engineered with React Native, multi-depth AI decision engine..."
          className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
        />
      </div>

      {/* URLs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Google Play Store URL
          </label>
          <input
            type="url"
            name="playStoreUrl"
            value={formData.playStoreUrl}
            onChange={handleChange}
            placeholder="https://play.google.com/store/apps/details?id=chess.binge"
            className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Privacy Policy Route / URL
          </label>
          <input
            type="text"
            name="privacyUrl"
            value={formData.privacyUrl}
            onChange={handleChange}
            placeholder="/mobile-apps/games/privacy-policy/chess-binge"
            className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      {/* Technologies */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          Technologies (Comma separated)
        </label>
        <input
          type="text"
          name="technologies"
          value={formData.technologies}
          onChange={handleChange}
          placeholder="React Native, Expo SDK 57, Chess Engine, TypeScript, Android AAB, Google AdMob"
          className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      {/* Highlights (one per line) */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          Key Highlights (One per line)
        </label>
        <textarea
          name="highlights"
          rows={3}
          value={formData.highlights}
          onChange={handleChange}
          placeholder="Multi-Depth Position Analysis&#10;Haptic Piece Snapping with FIDE algorithms&#10;Local-First Offline Play with FEN recovery"
          className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      {/* Feature Specs Matrix (Label: Value per line) */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          Feature Specs Matrix (<code className="text-red-400">Label: Value</code>, one per line)
        </label>
        <textarea
          name="featuresText"
          rows={3}
          value={formData.featuresText}
          onChange={handleChange}
          placeholder="Platform: Android 8.0+ (API 26+)&#10;Bundle Format: Signed Android AAB&#10;Engine AI: Multi-Depth Evaluation&#10;Monetization: Google AdMob Compliant"
          className="w-full px-3.5 py-2 rounded-xl text-sm font-mono border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      {/* Checkbox and Order */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100 dark:border-white/5">
        <label className="flex items-center gap-2.5 cursor-pointer text-sm font-semibold text-slate-700 dark:text-slate-300">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
            className="h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-500"
          />
          <span>Featured App</span>
        </label>

        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
            Sort Order:
          </label>
          <input
            type="number"
            name="order"
            value={formData.order}
            onChange={handleChange}
            className="w-16 px-2 py-1 rounded-lg text-sm border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-center font-mono"
          />
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-white/10">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl text-sm font-semibold border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-lg shadow-red-600/25 transition-all cursor-pointer"
        >
          <FiSave className="h-4 w-4" />
          <span>{initialData ? 'Update App' : 'Save App'}</span>
        </button>
      </div>
    </form>
  );
}
