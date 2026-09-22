'use client';

import React from 'react';
import EducationCard, { Education } from '@/components/cards/EducationCard';
import { FiBook } from 'react-icons/fi';

interface EducationSectionProps {
  education: Education[];
}

export default function EducationSection({ education }: EducationSectionProps) {
  if (!education || education.length === 0) return null;

  return (
    <section id="education" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-7">
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-red-100/80 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900/40">
          <FiBook className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
          <span>Academic Foundation</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Education & <span className="text-gradient-red">Qualifications</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Academic degrees, university credentials, and computer science foundations.
        </p>
      </div>

      {/* Centered cards layout: 2 to 3 cards in a row, always centered */}
      <div className="flex flex-wrap justify-center items-stretch gap-6 max-w-6xl mx-auto">
        {education.map((edu) => (
          <div
            key={edu._id}
            className="flex flex-col w-full sm:basis-[320px] lg:basis-[300px] xl:basis-[340px] max-w-[460px] flex-grow min-w-0"
          >
            <EducationCard education={edu} />
          </div>
        ))}
      </div>
    </section>
  );
}