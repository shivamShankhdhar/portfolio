'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SkillCard, { Skill } from '@/components/SkillCard';
import { FiLayers, FiSearch } from 'react-icons/fi';

interface SkillsSectionProps {
  skills: Skill[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.025,
      delayChildren: 0.05,
    },
  },
};

/**
 * Sort priority:
 * 1. Backend
 * 2. Frontend & Mobile
 * 3. Database
 * 4. Others
 */
function getSkillSortWeight(skill: Skill): number {
  const cat = (skill.category || '').toLowerCase();
  const name = (skill.name || '').toLowerCase();

  // 1. Backend
  if (
    cat.includes('backend') ||
    name.includes('spring') ||
    (name.includes('java') && !name.includes('javascript')) ||
    name.includes('node') ||
    name.includes('express') ||
    name.includes('django') ||
    name.includes('python')
  ) {
    return 1;
  }

  // 2. Frontend & Mobile
  if (
    cat.includes('frontend') ||
    cat.includes('mobile') ||
    name.includes('react') ||
    name.includes('next') ||
    name.includes('typescript') ||
    name.includes('javascript') ||
    name.includes('expo') ||
    name.includes('tailwind') ||
    name.includes('redux') ||
    name.includes('html') ||
    name.includes('css')
  ) {
    return 2;
  }

  // 3. Database
  if (
    cat.includes('database') ||
    name.includes('mongo') ||
    name.includes('sql') ||
    name.includes('postgres') ||
    name.includes('mysql') ||
    name.includes('prisma') ||
    name.includes('redis')
  ) {
    return 3;
  }

  // 4. Others (DevOps, Tools, etc.)
  return 4;
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sort skills in exact order: Backend -> Frontend -> Database -> Others
  const sortedSkills = useMemo(() => {
    return [...skills].sort((a, b) => {
      const weightA = getSkillSortWeight(a);
      const weightB = getSkillSortWeight(b);

      if (weightA !== weightB) {
        return weightA - weightB;
      }
      return a.name.localeCompare(b.name);
    });
  }, [skills]);

  // Filter skills based on search
  const filteredSkills = useMemo(() => {
    if (!searchQuery.trim()) return sortedSkills;
    const q = searchQuery.toLowerCase();
    return sortedSkills.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        (s.category && s.category.toLowerCase().includes(q))
    );
  }, [sortedSkills, searchQuery]);

  return (
    <section id="skills" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-7">

      {/* Section Header with Spring Entrance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="text-center space-y-3 max-w-2xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-red-100/80 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900/40">
          <FiLayers className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
          <span>Core Technical Arsenal</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Skills & <span className="text-gradient-red">Technologies</span>
        </h2>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Production stack sorted by Backend, Frontend, Database, and Systems Tooling. Hover over any icon for details.
        </p>
      </motion.div>

      {/* Search Input & Total Count Bar */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex items-center justify-between gap-4 max-w-md mx-auto"
      >
        <div className="relative w-full">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search technology (e.g. Spring, React, Mongo, Docker)..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white dark:bg-[#121217] border border-slate-200 dark:border-red-950/40 text-slate-900 dark:text-white focus:outline-none focus:border-red-500 shadow-xs transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-red-500"
            >
              Clear
            </button>
          )}
        </div>
        <span className="shrink-0 px-3 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-[#121217] text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-red-950/40">
          {filteredSkills.length} items
        </span>
      </motion.div>

      {/* Unified Single Grid with Framer Motion layout & stagger animations */}
      {filteredSkills.length === 0 ? (
        <div className="text-center py-12 p-6 rounded-2xl border border-dashed border-red-200 dark:border-red-900/30">
          <p className="text-sm text-slate-500">No technology found matching &ldquo;{searchQuery}&rdquo;</p>
        </div>
      ) : (
        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="flex flex-wrap justify-center gap-3.5 sm:gap-5 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-red-950/40 bg-white/70 dark:bg-[#0e0e13]/70 backdrop-blur-xl shadow-lg shadow-red-950/5 relative z-10"
        >
          <AnimatePresence>
            {filteredSkills.map((skill, index) => (
              <SkillCard key={skill._id} skill={skill} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}