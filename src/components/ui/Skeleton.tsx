'use client';

import React from 'react';

/**
 * Base Skeleton primitive with smooth shimmer wave
 */
export function Skeleton({
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-slate-200/70 dark:bg-white/[0.07] before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/30 dark:before:via-white/10 before:to-transparent ${className}`}
      {...props}
    />
  );
}

/**
 * Skeleton matching ProjectCard layout
 */
export function ProjectCardSkeleton() {
  return (
    <div className="rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-[#0f1017]/80 backdrop-blur-xl shadow-lg p-5 sm:p-6 space-y-4 flex flex-col justify-between h-full">
      <div className="space-y-4">
        {/* Project Thumbnail Image */}
        <Skeleton className="h-44 sm:h-48 w-full rounded-2xl" />

        {/* Category Badge & Title */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between gap-2">
            <Skeleton className="h-5 w-24 rounded-full" />
            <Skeleton className="h-4 w-16 rounded-full" />
          </div>
          <Skeleton className="h-6 w-3/4 rounded-lg" />
        </div>

        {/* Description Lines */}
        <div className="space-y-2">
          <Skeleton className="h-3.5 w-full rounded-md" />
          <Skeleton className="h-3.5 w-5/6 rounded-md" />
          <Skeleton className="h-3.5 w-4/6 rounded-md" />
        </div>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          <Skeleton className="h-6 w-16 rounded-lg" />
          <Skeleton className="h-6 w-20 rounded-lg" />
          <Skeleton className="h-6 w-14 rounded-lg" />
          <Skeleton className="h-6 w-24 rounded-lg" />
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between gap-3">
        <Skeleton className="h-9 flex-1 rounded-xl" />
        <Skeleton className="h-9 flex-1 rounded-xl" />
      </div>
    </div>
  );
}

/**
 * Skeleton matching ExperienceCard layout
 */
export function ExperienceCardSkeleton() {
  return (
    <div className="relative rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-[#0f1017]/80 backdrop-blur-xl shadow-lg p-6 sm:p-7 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-white/5">
        <div className="space-y-2">
          <Skeleton className="h-4 w-28 rounded-full" />
          <Skeleton className="h-6 w-48 rounded-lg" />
          <Skeleton className="h-4 w-36 rounded-md" />
        </div>
        <Skeleton className="h-7 w-32 rounded-full shrink-0" />
      </div>

      {/* Responsibilities */}
      <div className="space-y-2.5">
        <div className="flex items-start gap-2">
          <Skeleton className="h-2 w-2 rounded-full mt-1.5 shrink-0" />
          <Skeleton className="h-3.5 w-full rounded-md" />
        </div>
        <div className="flex items-start gap-2">
          <Skeleton className="h-2 w-2 rounded-full mt-1.5 shrink-0" />
          <Skeleton className="h-3.5 w-11/12 rounded-md" />
        </div>
        <div className="flex items-start gap-2">
          <Skeleton className="h-2 w-2 rounded-full mt-1.5 shrink-0" />
          <Skeleton className="h-3.5 w-4/5 rounded-md" />
        </div>
      </div>

      {/* Tech Tags */}
      <div className="flex flex-wrap gap-2 pt-2">
        <Skeleton className="h-6 w-20 rounded-lg" />
        <Skeleton className="h-6 w-16 rounded-lg" />
        <Skeleton className="h-6 w-24 rounded-lg" />
        <Skeleton className="h-6 w-18 rounded-lg" />
      </div>
    </div>
  );
}

/**
 * Skeleton matching SkillCard layout
 */
export function SkillCardSkeleton() {
  return (
    <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-[#0f1017]/80 backdrop-blur-xl shadow-xs space-y-3">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-xl shrink-0" />
        <div className="space-y-1.5 flex-1 min-w-0">
          <Skeleton className="h-4 w-3/4 rounded-md" />
          <Skeleton className="h-3 w-1/2 rounded-md" />
        </div>
      </div>
      <Skeleton className="h-2 w-full rounded-full" />
    </div>
  );
}

/**
 * Skeleton matching EducationCard layout
 */
export function EducationCardSkeleton() {
  return (
    <div className="h-full rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-[#0f1017]/80 backdrop-blur-xl shadow-lg p-6 sm:p-7 space-y-4 flex flex-col justify-between">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="h-5 w-24 rounded-full" />
          <Skeleton className="h-4 w-20 rounded-md" />
        </div>
        <Skeleton className="h-6 w-4/5 rounded-lg" />
        <Skeleton className="h-4 w-2/3 rounded-md" />
        
        <div className="space-y-2 pt-2">
          <Skeleton className="h-3.5 w-full rounded-md" />
          <Skeleton className="h-3.5 w-5/6 rounded-md" />
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 dark:border-white/5">
        <Skeleton className="h-5 w-16 rounded-md" />
        <Skeleton className="h-5 w-20 rounded-md" />
        <Skeleton className="h-5 w-14 rounded-md" />
      </div>
    </div>
  );
}

/**
 * Skeleton matching HeroSection layout
 */
export function HeroSectionSkeleton() {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Bio & Info */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-3">
            <Skeleton className="h-7 w-36 rounded-full" />
            <Skeleton className="h-7 w-28 rounded-full" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-10 sm:h-12 w-3/4 rounded-xl" />
            <Skeleton className="h-7 sm:h-8 w-1/2 rounded-lg" />
          </div>
          <div className="space-y-2.5 max-w-2xl">
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-11/12 rounded-md" />
            <Skeleton className="h-4 w-4/5 rounded-md" />
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <Skeleton className="h-12 w-40 rounded-2xl" />
            <Skeleton className="h-12 w-36 rounded-2xl" />
            <Skeleton className="h-12 w-12 rounded-2xl" />
            <Skeleton className="h-12 w-12 rounded-2xl" />
          </div>
        </div>

        {/* Right Column: Code Window */}
        <div className="lg:col-span-5">
          <div className="rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-[#0f1017]/80 backdrop-blur-xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5">
              <div className="flex gap-2">
                <Skeleton className="h-3 w-3 rounded-full" />
                <Skeleton className="h-3 w-3 rounded-full" />
                <Skeleton className="h-3 w-3 rounded-full" />
              </div>
              <Skeleton className="h-4 w-28 rounded-md" />
            </div>
            <div className="space-y-3 py-2">
              <Skeleton className="h-4 w-3/4 rounded-md" />
              <Skeleton className="h-4 w-1/2 rounded-md" />
              <Skeleton className="h-4 w-5/6 rounded-md" />
              <Skeleton className="h-4 w-2/3 rounded-md" />
              <Skeleton className="h-4 w-4/5 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
