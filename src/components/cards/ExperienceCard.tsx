'use client';

import React from 'react';
import { FiBriefcase, FiCalendar, FiEdit2, FiTrash2, FiCheck } from 'react-icons/fi';

export interface Experience {
  _id: string;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate?: string;
  isCurrentRole: boolean;
  technologies?: string[];
  highlights?: string[];
}

interface ExperienceCardProps {
  experience: Experience;
  onEdit?: (experience: Experience) => void;
  onDelete?: (id: string) => void;
  isAdmin?: boolean;
}

export default function ExperienceCard({
  experience,
  onEdit,
  onDelete,
  isAdmin = false,
}: ExperienceCardProps) {
  const startMonth = experience.startDate
    ? new Date(experience.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : '';
  const endMonth = experience.isCurrentRole
    ? 'Present'
    : experience.endDate
    ? new Date(experience.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : 'Present';

  return (
    <div className="group relative flex flex-col justify-between h-full w-full rounded-3xl border-2 border-dotted border-red-300 dark:border-red-900/60 hover:border-red-500 dark:hover:border-red-500/90 bg-white dark:bg-[#101015] p-6 shadow-xs hover:shadow-xl hover:shadow-red-600/10 hover:-translate-y-1 transition-all duration-200">
      
      <div>
        {/* Top Row: Icon + Duration & Current Status */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 group-hover:scale-105 transition-transform duration-200">
            <FiBriefcase className="h-5 w-5" />
          </div>

          <div className="flex flex-col items-end gap-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-[#181822] text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-red-950/40">
              <FiCalendar className="h-3 w-3 text-red-500" />
              <span>{startMonth} — {endMonth}</span>
            </span>

            {experience.isCurrentRole && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800">
                <span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
                <span>Current Role</span>
              </span>
            )}
          </div>
        </div>

        {/* Position & Company */}
        <div className="space-y-1 mb-3">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-2">
            {experience.position}
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-red-600 dark:text-red-400">
            {experience.company}
          </p>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-3">
          {experience.description}
        </p>

        {/* Highlights */}
        {experience.highlights && experience.highlights.length > 0 && (
          <div className="space-y-1.5 mb-4 pt-1">
            {experience.highlights.slice(0, 3).map((h, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                <FiCheck className="h-3.5 w-3.5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                <span className="line-clamp-2">{h}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Card Footer: Tech Badges & Admin Controls */}
      <div>
        {experience.technologies && experience.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 dark:border-red-950/30">
            {experience.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-[#181822] text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-red-950/40"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {isAdmin && (
          <div className="mt-3 pt-2 border-t border-slate-100 dark:border-red-950/30 flex justify-end gap-2">
            {onEdit && (
              <button
                onClick={() => onEdit(experience)}
                className="p-1 text-slate-400 hover:text-blue-600 transition"
                aria-label="Edit"
              >
                <FiEdit2 className="h-3.5 w-3.5" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(experience._id)}
                className="p-1 text-slate-400 hover:text-red-600 transition"
                aria-label="Delete"
              >
                <FiTrash2 className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
