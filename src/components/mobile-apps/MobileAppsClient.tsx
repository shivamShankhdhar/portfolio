'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  FiSmartphone,
  FiGlobe,
  FiSearch,
  FiShield,
  FiExternalLink,
  FiChevronRight,
  FiCheckCircle,
  FiLayers,
  FiZap,
  FiLock,
  FiArrowRight,
} from 'react-icons/fi';
import { FaGooglePlay, FaStar, FaGamepad } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';

export interface AppItem {
  _id: string;
  id?: string;
  title: string;
  subtitle?: string;
  tagline: string;
  category: string;
  package: string;
  version?: string;
  status?: string;
  rating?: string;
  ratingCount?: string;
  icon?: string;
  bannerType?: string;
  playStoreUrl?: string;
  privacyUrl?: string;
  technologies?: string[];
  highlights?: string[];
  features?: Array<{ label: string; value: string }>;
  featured?: boolean;
  order?: number;
}

interface MobileAppsClientProps {
  initialApps: AppItem[];
}

export default function MobileAppsClient({ initialApps }: MobileAppsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract unique categories dynamically
  const categories = useMemo(() => {
    const cats = new Set<string>();
    cats.add('All');
    // Ensure 'Games' is prioritized if it exists
    let hasGames = false;
    initialApps.forEach((app) => {
      if (app.category) {
        if (app.category.trim().toLowerCase() === 'games') {
          hasGames = true;
        } else {
          cats.add(app.category.trim());
        }
      }
    });

    const result = ['All'];
    if (hasGames) result.push('Games');
    Array.from(cats)
      .filter((c) => c !== 'All' && c.toLowerCase() !== 'games')
      .forEach((c) => result.push(c));
    return result;
  }, [initialApps]);

  // Filter apps based on category and search query
  const filteredApps = useMemo(() => {
    return initialApps.filter((app) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        app.category?.toLowerCase() === selectedCategory.toLowerCase();

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        app.title?.toLowerCase().includes(query) ||
        app.tagline?.toLowerCase().includes(query) ||
        app.package?.toLowerCase().includes(query) ||
        app.technologies?.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [initialApps, selectedCategory, searchQuery]);

  const gamesCount = useMemo(() => {
    return initialApps.filter((a) => (a.category || '').toLowerCase() === 'games').length;
  }, [initialApps]);

  return (
    <div className="space-y-10">
      {/* Search & Category Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-3 rounded-2xl bg-white/70 dark:bg-[#12131c]/70 border border-slate-200 dark:border-white/10 backdrop-blur-md shadow-xs">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map((cat) => {
            const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
            const isGame = cat.toLowerCase() === 'games';
            const count =
              cat === 'All'
                ? initialApps.length
                : initialApps.filter(
                    (a) => (a.category || '').toLowerCase() === cat.toLowerCase()
                  ).length;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-sm shadow-red-600/30'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-slate-200 dark:hover:bg-white/10'
                }`}
              >
                {isGame && <FaGamepad className="h-3.5 w-3.5" />}
                <span>{cat}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-64">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search apps or tech..."
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      {/* Dedicated Games Callout Banner */}
      {gamesCount > 0 && (selectedCategory === 'All' || selectedCategory.toLowerCase() === 'games') && (
        <div className="relative overflow-hidden rounded-3xl border border-red-500/25 bg-gradient-to-br from-red-600/10 via-rose-600/5 to-transparent dark:from-red-950/40 dark:via-rose-950/20 p-6 sm:p-8 backdrop-blur-md shadow-lg">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-600 text-white shadow-xs">
                <FaGamepad className="h-3.5 w-3.5" />
                <span>Playable Games Hub</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Experience Our Android Games with Real-Time Multiplayer & AI
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Looking for the full interactive showcase with instant QR code installs, Grandmaster AI analysis engines, and live gameplay features?
              </p>
            </div>

            <div className="shrink-0">
              <Link
                href="/mobile-apps/games"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-md shadow-red-600/25 hover:shadow-red-600/40 hover:-translate-y-0.5 transition-all"
              >
                <span>Explore Dedicated Games Showcase</span>
                <FiArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Apps Grid */}
      {filteredApps.length === 0 ? (
        <div className="text-center py-20 p-8 rounded-3xl border-2 border-dashed border-red-300 dark:border-red-900/40 max-w-md mx-auto space-y-3">
          <div className="text-4xl">📱</div>
          <h4 className="text-base font-bold text-slate-800 dark:text-slate-200">No applications found</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Try adjusting your search criteria or category filter.
          </p>
          {(selectedCategory !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="text-xs font-semibold text-red-600 dark:text-red-400 underline hover:no-underline"
            >
              Reset Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredApps.map((app) => {
              const isGame = (app.category || '').toLowerCase() === 'games';
              const isTesting =
                app.status?.toLowerCase().includes('closed') ||
                app.status?.toLowerCase().includes('testing') ||
                app.rating?.toLowerCase().includes('coming');

              return (
                <motion.div
                  key={app._id || app.id || app.package}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[#12131c]/80 backdrop-blur-md p-6 sm:p-7 shadow-lg hover:border-red-500/40 transition-all flex flex-col justify-between space-y-6 group"
                >
                  <div className="space-y-5">
                    {/* Header Row: Icon, Title, Category Badge & Version */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-red-500/15 via-rose-500/20 to-red-600/10 border border-red-500/30 flex items-center justify-center text-3xl shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                          {app.icon || (isGame ? '🎮' : '📱')}
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                              {app.title}
                            </h3>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300">
                              {app.version || 'v1.0.0'}
                            </span>
                          </div>
                          {app.subtitle && (
                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                              {app.subtitle}
                            </p>
                          )}
                          <p className="text-[11px] font-mono text-red-500 dark:text-red-400 mt-0.5">
                            {app.package}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                        {/* Category Badge */}
                        <span
                          className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                            isGame
                              ? 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30'
                              : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30'
                          }`}
                        >
                          {isGame ? <FaGamepad className="h-3 w-3" /> : <FiSmartphone className="h-3 w-3" />}
                          <span>{app.category || 'App'}</span>
                        </span>

                        {/* Status Badge */}
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            isTesting
                              ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                              : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              isTesting ? 'bg-amber-500' : 'bg-emerald-500 animate-pulse'
                            }`}
                          />
                          <span>{isTesting ? 'Closed Testing' : 'Production'}</span>
                        </span>
                      </div>
                    </div>

                    {/* Tagline / Description */}
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {app.tagline}
                    </p>

                    {/* Rating & Players / Users */}
                    <div className="flex items-center gap-4 text-xs font-semibold py-2 px-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5">
                      <div className="flex items-center gap-1.5 text-amber-500">
                        <FaStar className="h-3.5 w-3.5" />
                        <span>{app.rating || '4.9'}</span>
                      </div>
                      <span className="h-3 w-[1px] bg-slate-300 dark:bg-white/10" />
                      <span className="text-slate-500 dark:text-slate-400">
                        {app.ratingCount || (isTesting ? 'Closed Testing' : 'Active Players')}
                      </span>
                    </div>

                    {/* Technologies */}
                    {app.technologies && app.technologies.length > 0 && (
                      <div className="space-y-1.5">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Tech Stack
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {app.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="text-[11px] font-medium px-2 py-0.5 rounded-lg bg-red-500/5 dark:bg-red-950/20 text-slate-700 dark:text-slate-300 border border-red-500/15 dark:border-red-900/30"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Highlights */}
                    {app.highlights && app.highlights.length > 0 && (
                      <div className="space-y-1.5">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Key Highlights
                        </p>
                        <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                          {app.highlights.slice(0, 3).map((item, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <FiCheckCircle className="h-3.5 w-3.5 text-red-500 shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-slate-200/80 dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {/* If it's a Game, show the prominent Move to Games Page button */}
                      {isGame && (
                        <Link
                          href="/mobile-apps/games"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-sm shadow-red-600/30 transition-all"
                        >
                          <FaGamepad className="h-3.5 w-3.5" />
                          <span>View on Games Hub</span>
                          <FiChevronRight className="h-3 w-3" />
                        </Link>
                      )}

                      {/* Google Play Store or Testing Status */}
                      {isTesting ? (
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/10 cursor-not-allowed">
                          <FiLock className="h-3 w-3 text-amber-500" />
                          <span>Testing (Coming Soon)</span>
                        </span>
                      ) : app.playStoreUrl ? (
                        <a
                          href={app.playStoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-red-600 dark:hover:bg-red-500 dark:hover:text-white transition-all shadow-xs"
                        >
                          <FaGooglePlay className="h-3 w-3 text-emerald-400 dark:text-emerald-600" />
                          <span>Google Play</span>
                        </a>
                      ) : null}
                    </div>

                    {/* Privacy Policy Link */}
                    {app.privacyUrl && (
                      <Link
                        href={app.privacyUrl}
                        className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-red-500 transition-colors"
                      >
                        <FiShield className="h-3 w-3 text-red-500" />
                        <span>Privacy</span>
                      </Link>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
