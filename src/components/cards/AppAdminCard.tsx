'use client';

import React from 'react';
import Link from 'next/link';
import { FiEdit2, FiTrash2, FiExternalLink, FiSmartphone, FiShield } from 'react-icons/fi';
import { FaGooglePlay, FaStar, FaGamepad } from 'react-icons/fa6';

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

interface AppAdminCardProps {
  app: AppItem;
  onEdit: (app: AppItem) => void;
  onDelete: (id: string) => void;
}

export default function AppAdminCard({ app, onEdit, onDelete }: AppAdminCardProps) {
  const isGame = (app.category || '').toLowerCase() === 'games';

  return (
    <div className="relative rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#12131c] p-5 shadow-lg hover:border-red-500/40 transition-all flex flex-col justify-between space-y-4">
      <div className="space-y-3">
        {/* Card Header: Icon, Category & Actions */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-red-500/20 to-rose-600/20 border border-red-500/30 flex items-center justify-center text-2xl shadow-xs shrink-0">
              {app.icon || '🎮'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {app.title}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300">
                  {app.version || 'v1.0.0'}
                </span>
              </div>
              <p className="text-xs text-red-500 dark:text-red-400 font-mono">
                {app.package}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onEdit(app)}
              className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
              title="Edit App"
            >
              <FiEdit2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(app._id)}
              className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
              title="Delete App"
            >
              <FiTrash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Category & Status Pill Bar */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold bg-red-500/15 text-red-500 border border-red-500/30">
            <FaGamepad className="h-3 w-3" />
            <span>{app.category}</span>
          </span>

          {app.status && (
            <span className="px-2.5 py-0.5 rounded-full font-medium bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/20 text-[11px]">
              {app.status}
            </span>
          )}

          {app.rating && (
            <span className="inline-flex items-center gap-1 text-amber-500 dark:text-amber-400 font-semibold text-xs ml-auto">
              <FaStar className="h-3 w-3 fill-current" />
              <span>{app.rating}</span>
              {app.ratingCount && (
                <span className="text-[10px] text-slate-400 font-normal">({app.ratingCount})</span>
              )}
            </span>
          )}
        </div>

        {/* Subtitle / Tagline */}
        {app.subtitle && (
          <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            {app.subtitle}
          </p>
        )}
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {app.tagline}
        </p>

        {/* Tech stack */}
        {app.technologies && app.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {app.technologies.slice(0, 4).map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-white/5"
              >
                {tech}
              </span>
            ))}
            {app.technologies.length > 4 && (
              <span className="text-[10px] text-slate-400 self-center">
                +{app.technologies.length - 4} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Bottom Links */}
      <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs">
        {isGame ? (
          <Link
            href="/mobile-apps/games"
            target="_blank"
            className="inline-flex items-center gap-1.5 text-red-500 hover:text-red-400 font-medium transition-colors"
          >
            <FaGamepad className="h-3.5 w-3.5" />
            <span>View on Games Hub</span>
            <FiExternalLink className="h-3 w-3" />
          </Link>
        ) : (
          <span className="text-[11px] text-slate-400">Mobile App</span>
        )}

        {app.playStoreUrl && (
          <a
            href={app.playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-red-500 transition-colors"
          >
            <FaGooglePlay className="h-3 w-3" />
            <span>Play Store</span>
          </a>
        )}
      </div>
    </div>
  );
}
