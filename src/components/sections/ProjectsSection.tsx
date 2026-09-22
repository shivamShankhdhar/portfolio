'use client';

import React, { useState, useMemo } from 'react';
import ProjectCard, { Project } from '@/components/cards/ProjectCard';
import { ProjectCardSkeleton } from '@/components/ui/Skeleton';
import { FiGrid, FiSmartphone, FiGlobe, FiServer } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectsSectionProps {
  projects: Project[];
  loading?: boolean;
}

export default function ProjectsSection({ projects, loading = false }: ProjectsSectionProps) {
  const [filter, setFilter] = useState<'All' | 'Mobile' | 'Web' | 'Backend'>('All');

  const counts = useMemo(() => {
    return {
      All: projects.length,
      Mobile: projects.filter(
        (p) =>
          p.projectType === 'Mobile' ||
          p.technologies?.some((t) => /native|expo|android|ios|flutter/i.test(t))
      ).length,
      Web: projects.filter(
        (p) =>
          p.projectType === 'Web' ||
          (!p.projectType && !p.technologies?.some((t) => /native|expo|android|ios/i.test(t)))
      ).length,
      Backend: projects.filter(
        (p) =>
          p.projectType === 'Backend' ||
          p.technologies?.some((t) => /spring|java|docker|redis|postgres|backend|microservices/i.test(t))
      ).length,
    };
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (filter === 'All') return projects;
    return projects.filter((project) => {
      if (filter === 'Mobile') {
        return (
          project.projectType === 'Mobile' ||
          project.technologies?.some((t) => /native|expo|android|ios|flutter/i.test(t))
        );
      }
      if (filter === 'Backend') {
        return (
          project.projectType === 'Backend' ||
          project.technologies?.some((t) =>
            /spring|java|docker|redis|postgres|backend|microservices/i.test(t)
          )
        );
      }
      return (
        project.projectType === 'Web' ||
        (!project.projectType && !project.technologies?.some((t) => /native|expo|android|ios/i.test(t)))
      );
    });
  }, [projects, filter]);

  const categories = [
    { id: 'All', label: 'All Projects', icon: FiGrid, count: counts.All },
    { id: 'Mobile', label: 'Mobile Apps', icon: FiSmartphone, count: counts.Mobile },
    { id: 'Web', label: 'Web Apps', icon: FiGlobe, count: counts.Web },
    { id: 'Backend', label: 'Backend & APIs', icon: FiServer, count: counts.Backend },
  ];

  return (
    <section id="projects" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-7">
      
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-red-100/80 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900/40">
          <span className="h-2 w-2 rounded-full bg-red-600 dark:bg-red-500 animate-pulse" />
          <span>Production Portfolio</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Featured <span className="text-gradient-red">Projects & Apps</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Selected production mobile games, web platforms, and backend architectures.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = filter === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id as any)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-sm shadow-red-600/30'
                  : 'bg-white dark:bg-[#121217] text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 border border-slate-200/80 dark:border-red-950/40'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{cat.label}</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-[#181822] text-slate-400'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Projects Grid or Skeletons */}
      {loading ? (
        <div className="flex flex-wrap justify-center items-stretch gap-6 max-w-5xl mx-auto">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex flex-col w-full sm:basis-[340px] lg:basis-[420px] max-w-[460px] flex-grow min-w-0"
            >
              <ProjectCardSkeleton />
            </div>
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-16 p-8 rounded-3xl border-2 border-dotted border-red-300 dark:border-red-900/40 max-w-md mx-auto">
          <p className="text-sm text-slate-500">No projects found for this category.</p>
        </div>
      ) : (
        <motion.div
          layout
          className="flex flex-wrap justify-center items-stretch gap-6 max-w-5xl mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project._id}
                layout
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="flex flex-col w-full sm:basis-[340px] lg:basis-[420px] max-w-[460px] flex-grow min-w-0"
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}