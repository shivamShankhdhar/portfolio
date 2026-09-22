'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiExternalLink, FiGithub } from 'react-icons/fi';

interface ProjectItem {
  _id?: string;
  title: string;
  description?: string;
  image?: string;
  technologies?: string[];
  link?: string;
  github?: string;
  projectType?: string;
  badge?: string;
  highlights?: string[];
}

interface SelectedProjectsSectionProps {
  projects: ProjectItem[];
  loading?: boolean;
}

export default function SelectedProjectsSection({
  projects,
  loading = false,
}: SelectedProjectsSectionProps) {
  // Take top 3 projects for the signature 3-card layout from reference
  const showcaseProjects = projects.slice(0, 3);

  // Fallback visual mock covers if project has no image
  const defaultImages = [
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
  ];

  return (
    <section id="projects" className="pt-8 pb-12 sm:pt-10 sm:pb-14 bg-[#07080b] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: SELECTED PROJECTS ─────── VIEW ALL PROJECTS → */}
        <div className="flex items-center justify-between gap-4 pb-6 sm:pb-8">
          <div className="flex items-center gap-4 shrink-0">
            <h2 className="font-bebas text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wider text-white uppercase">
              SELECTED PROJECTS
            </h2>
          </div>

          <div className="flex-1 hidden sm:block h-[1px] bg-gradient-to-r from-red-600/40 via-white/10 to-transparent mx-4" />

          <a
            href="https://github.com/shivamShankhdhar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-400 hover:text-red-400 uppercase tracking-widest transition-colors shrink-0 group"
          >
            <span>VIEW ALL PROJECTS</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
        </div>

        {/* 3-Card Horizontal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {showcaseProjects.map((project, idx) => {
            const indexStr = `0${idx + 1}`;
            const targetUrl = project.link || project.github || '#';
            const imageUrl = project.image || defaultImages[idx % defaultImages.length];
            const categoryText = project.projectType || project.badge || 'PRODUCTION SYSTEM';

            return (
              <motion.div
                key={project._id || idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group flex flex-col justify-between rounded-2xl bg-[#0e0f14] border border-white/10 overflow-hidden hover:border-red-500/50 hover:shadow-2xl hover:shadow-red-950/30 transition-all duration-300"
              >
                {/* Visual Thumbnail */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black/60 border-b border-white/5">
                  <img
                    src={imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f14] via-transparent to-transparent opacity-80" />

                  {/* Top Right Badges */}
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    {project.badge && (
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase bg-red-600/80 text-white backdrop-blur-md shadow-xs">
                        {project.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Meta Row */}
                <div className="p-5 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    {/* Red Number: 01, 02, 03 */}
                    <span className="font-bebas text-2xl font-bold text-red-500 shrink-0 leading-none pt-0.5">
                      {indexStr}
                    </span>

                    <div className="min-w-0">
                      <h3 className="font-bebas text-lg sm:text-xl font-bold text-white tracking-wide uppercase truncate group-hover:text-red-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider truncate mt-0.5">
                        {categoryText}
                      </p>
                    </div>
                  </div>

                  {/* Arrow Link */}
                  <a
                    href={targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-8 w-8 rounded-lg bg-white/5 hover:bg-red-600 text-slate-400 hover:text-white flex items-center justify-center shrink-0 border border-white/10 hover:border-red-500 transition-all duration-200"
                    title="View Project Details"
                  >
                    <FiArrowUpRight className="h-4 w-4" />
                  </a>
                </div>

                {/* Tech Pills at bottom */}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="px-5 pb-5 pt-0 flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 text-slate-500">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
