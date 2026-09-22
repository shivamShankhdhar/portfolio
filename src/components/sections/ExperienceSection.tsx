'use client';

import React, { useState } from 'react';
import ExperienceCard, { Experience } from '@/components/cards/ExperienceCard';
import { FiBriefcase, FiLayers, FiGrid, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface ExperienceSectionProps {
  experience: Experience[];
  onEdit?: (experience: Experience) => void;
  onDelete?: (id: string) => void;
  isAdmin?: boolean;
}

export default function ExperienceSection({
  experience,
  onEdit,
  onDelete,
  isAdmin = false,
}: ExperienceSectionProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'stack' | 'grid'>('stack');

  if (!experience || experience.length === 0) return null;

  const handleNextCard = () => {
    setActiveIndex((prev) => (prev + 1) % experience.length);
  };

  const handlePrevCard = () => {
    setActiveIndex((prev) => (prev - 1 + experience.length) % experience.length);
  };

  return (
    <section id="experience" className="pt-6 pb-12 sm:pt-8 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-5">
      
      {/* Section Header */}
      <div className="text-center space-y-2.5 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-red-100/80 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900/40">
          <FiBriefcase className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
          <span>Career Progression</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Work <span className="text-gradient-red">Experience</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Professional roles, technical contributions, and software delivery.
        </p>

        {/* View Controls & Interactive Hint */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          
          {/* Interactive Hover Instruction Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-300 border border-red-200/80 dark:border-red-900/40 shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
            </span>
            <span>Hover either card to bring it front & center</span>
          </div>

          {/* View Mode Toggle: Stack vs Grid */}
          <div className="inline-flex items-center p-1 rounded-2xl bg-slate-100/90 dark:bg-[#12121a] border border-slate-200 dark:border-red-950/40">
            <button
              onClick={() => setViewMode('stack')}
              title="Stacked & Peeped View"
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                viewMode === 'stack'
                  ? 'bg-white dark:bg-[#1c1c28] text-red-600 dark:text-red-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <FiLayers className="h-3.5 w-3.5" />
              <span>Stacked</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              title="Grid View"
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-[#1c1c28] text-red-600 dark:text-red-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <FiGrid className="h-3.5 w-3.5" />
              <span>Grid</span>
            </button>
          </div>

        </div>

        {/* Quick Role Switcher Pills (Useful for touch/quick selection) */}
        {viewMode === 'stack' && experience.length > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {experience.map((exp, idx) => {
              const isCurrent = (hoveredIndex !== null ? hoveredIndex === idx : activeIndex === idx);
              return (
                <button
                  key={exp._id}
                  onClick={() => setActiveIndex(idx)}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                    isCurrent
                      ? 'bg-red-600 text-white shadow-xs font-semibold'
                      : 'bg-slate-100 dark:bg-[#14141c] text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-red-950/40 hover:text-red-600 dark:hover:text-red-400'
                  }`}
                >
                  {exp.position.split(' ')[0]} • {exp.company.split(' ')[0]}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Mode 1: Interactive Peeped & Stacked Deck View */}
      {viewMode === 'stack' ? (
        <div className="pt-2 space-y-4">
          
          {/* Peeped Deck Container (Tightly aligned to top, zero dead space) */}
          <div className="relative w-full max-w-5xl mx-auto flex flex-col md:flex-row justify-center items-center md:items-stretch md:-space-x-12 lg:-space-x-16 -space-y-6 md:space-y-0">
            {experience.map((exp, idx) => {
              const isHovered = hoveredIndex === idx;
              const isOtherHovered = hoveredIndex !== null && hoveredIndex !== idx;
              const isActive = activeIndex === idx;

              // Left card tilts slightly left, Right card tilts slightly right
              const naturalRotate = idx === 0 ? -2.5 : 2.5;

              // Compute stable transform: x coordinates never swap across the screen!
              let y = 0;
              let scale = 1;
              let rotate = naturalRotate;
              let zIndex = 20;
              let opacity = 1;
              let filter = 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.08))';

              if (isHovered) {
                // Front and center elevated
                y = -14;
                scale = 1.03;
                rotate = 0;
                zIndex = 40;
                opacity = 1;
                filter = 'drop-shadow(0 22px 35px rgba(225, 29, 72, 0.24))';
              } else if (isOtherHovered) {
                // Dimmed background card
                y = 8;
                scale = 0.97;
                rotate = naturalRotate * 1.3;
                zIndex = 10;
                opacity = 0.8;
                filter = 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.06))';
              } else if (isActive) {
                // Default active card
                y = -6;
                scale = 1.01;
                rotate = idx === 0 ? -1.5 : 1.5;
                zIndex = 30;
                opacity = 1;
                filter = 'drop-shadow(0 14px 26px rgba(225, 29, 72, 0.18))';
              } else {
                // Default idle behind card
                y = 4;
                scale = 0.98;
                rotate = naturalRotate;
                zIndex = 15;
                opacity = 0.92;
                filter = 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.07))';
              }

              return (
                <motion.div
                  key={exp._id}
                  animate={{
                    y,
                    scale,
                    rotate,
                    opacity,
                    filter,
                  }}
                  style={{
                    zIndex,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 380,
                    damping: 26,
                  }}
                  onMouseEnter={() => {
                    setHoveredIndex(idx);
                    setActiveIndex(idx);
                  }}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-full max-w-md sm:max-w-lg cursor-pointer transition-all duration-200 ${
                    (isHovered || isActive)
                      ? 'ring-2 ring-red-500/70 rounded-3xl'
                      : ''
                  }`}
                >
                  <ExperienceCard
                    experience={exp}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    isAdmin={isAdmin}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Stack Navigation Controls */}
          <div className="flex items-center justify-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 pt-1">
            <button
              onClick={handlePrevCard}
              className="p-2 rounded-xl border border-slate-200 dark:border-red-950/40 hover:text-red-600 dark:hover:text-red-400 hover:border-red-500/50 transition"
              aria-label="Previous Experience"
            >
              <FiChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-[11px] font-mono">
              Card {activeIndex + 1} of {experience.length}
            </span>
            <button
              onClick={handleNextCard}
              className="p-2 rounded-xl border border-slate-200 dark:border-red-950/40 hover:text-red-600 dark:hover:text-red-400 hover:border-red-500/50 transition"
              aria-label="Next Experience"
            >
              <FiChevronRight className="h-4 w-4" />
            </button>
          </div>

        </div>
      ) : (
        /* Mode 2: Standard Centered Row Grid Layout */
        <div className="flex flex-wrap justify-center items-stretch gap-6 max-w-6xl mx-auto pt-2">
          {experience.map((exp) => (
            <div
              key={exp._id}
              className="flex flex-col w-full sm:basis-[320px] lg:basis-[300px] xl:basis-[340px] max-w-[460px] flex-grow min-w-0"
            >
              <ExperienceCard
                experience={exp}
                onEdit={onEdit}
                onDelete={onDelete}
                isAdmin={isAdmin}
              />
            </div>
          ))}
        </div>
      )}

    </section>
  );
}