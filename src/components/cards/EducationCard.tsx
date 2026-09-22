'use client';

import React from 'react';
import { FaGraduationCap } from 'react-icons/fa6';
import { FiCalendar, FiEdit2, FiTrash2, FiAward } from 'react-icons/fi';

export interface Education {
  _id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  description?: string;
  grade?: string;
}

interface EducationCardProps {
  education: Education;
  onEdit?: (education: Education) => void;
  onDelete?: (id: string) => void;
  isAdmin?: boolean;
}

export default function EducationCard({
  education,
  onEdit,
  onDelete,
  isAdmin = false,
}: EducationCardProps) {
  const startYear = education.startDate ? new Date(education.startDate).getFullYear() : '';
  const endYear = education.endDate ? new Date(education.endDate).getFullYear() : 'Present';

  return (
    <div className="group relative flex flex-col justify-between h-full w-full rounded-3xl border-2 border-dotted border-red-300 dark:border-red-900/60 hover:border-red-500 dark:hover:border-red-500/90 bg-white dark:bg-[#101015] p-6 shadow-xs hover:shadow-xl hover:shadow-red-600/10 hover:-translate-y-1 transition-all duration-200">
      
      <div>
        {/* Top Row: Icon + Duration */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 group-hover:scale-105 transition-transform duration-200">
            <FaGraduationCap className="h-5 w-5" />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-[#181822] text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-red-950/40">
            <FiCalendar className="h-3 w-3 text-red-500" />
            <span>{startYear} – {endYear}</span>
          </span>
        </div>

        {/* Degree & Institution */}
        <div className="space-y-1 mb-3">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-2">
            {education.degree} in {education.field}
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300">
            {education.school}
          </p>
        </div>

        {/* Grade / Distinction Badge */}
        {education.grade && (
          <div className="mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900/40">
              <FiAward className="h-3 w-3 text-red-500" />
              <span>{education.grade}</span>
            </span>
          </div>
        )}

        {/* Description */}
        {education.description && (
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
            {education.description}
          </p>
        )}
      </div>

      {/* Admin Controls */}
      {isAdmin && (
        <div className="mt-4 pt-2 border-t border-slate-100 dark:border-red-950/30 flex justify-end gap-2">
          {onEdit && (
            <button
              onClick={() => onEdit(education)}
              className="p-1 text-slate-400 hover:text-blue-600 transition"
              aria-label="Edit"
            >
              <FiEdit2 className="h-3.5 w-3.5" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(education._id)}
              className="p-1 text-slate-400 hover:text-red-600 transition"
              aria-label="Delete"
            >
              <FiTrash2 className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}