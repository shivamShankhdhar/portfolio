'use client';

import React from 'react';
import Link from 'next/link';
import {
  FiGithub,
  FiSmartphone,
  FiGlobe,
  FiServer,
  FiEdit2,
  FiTrash2,
  FiCheck,
  FiArrowUpRight,
  FiExternalLink,
} from 'react-icons/fi';
import { FaGamepad, FaJava } from 'react-icons/fa';
import { SiReact } from 'react-icons/si';
import { motion } from 'framer-motion';

export interface Project {
  _id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  link?: string;
  github?: string;
  startDate: string;
  endDate?: string;
  featured?: boolean;
  projectType?: 'Web' | 'Mobile' | 'Backend';
  badge?: string;
  highlights?: string[];
}

interface ProjectCardProps {
  project: Project;
  onEdit?: (project: Project) => void;
  onDelete?: (id: string) => void;
  isAdmin?: boolean;
}

export default function ProjectCard({
  project,
  onEdit,
  onDelete,
  isAdmin = false,
}: ProjectCardProps) {
  const titleLower = (project.title || '').toLowerCase();
  const isLudo = titleLower.includes('ludo');
  const isChess = titleLower.includes('chess');
  const isGame = isLudo || isChess || titleLower.includes('game');

  const isMobile =
    project.projectType === 'Mobile' ||
    isGame ||
    project.technologies?.some((t) => t.toLowerCase().includes('native') || t.toLowerCase().includes('expo'));

  const isBackend =
    project.projectType === 'Backend' ||
    titleLower.includes('microservices') ||
    titleLower.includes('api') ||
    project.technologies?.some((t) => t.toLowerCase().includes('spring') || t.toLowerCase().includes('java'));

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 350, damping: 24 }}
      className="group relative flex flex-col justify-between h-full w-full rounded-3xl border-2 border-dotted border-red-300 dark:border-red-900/60 hover:border-red-500 dark:hover:border-red-500/90 bg-white dark:bg-[#101015] p-5 sm:p-6 shadow-xs hover:shadow-xl hover:shadow-red-600/12 transition-colors duration-300"
    >
      <div>
        {/* Top Header: Icon + Category + Status Badge */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            {/* Category Icon Badge */}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 group-hover:scale-105 group-hover:bg-red-500/15 transition-all duration-200">
              {isGame ? (
                <FaGamepad className="h-5 w-5" />
              ) : isMobile ? (
                <FiSmartphone className="h-5 w-5" />
              ) : isBackend ? (
                <FaJava className="h-5 w-5" />
              ) : (
                <SiReact className="h-5 w-5" />
              )}
            </div>

            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-red-600 dark:text-red-400 block">
                {isGame ? 'Mobile Game' : isMobile ? 'Mobile App' : isBackend ? 'Enterprise Backend' : 'Web Platform'}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {isLudo ? '60 FPS Native' : isChess ? 'Grandmaster AI' : isBackend ? 'Microservices' : 'Next.js 16 SSR'}
              </span>
            </div>
          </div>

          {/* Status Badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-900/40 shrink-0">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>{project.badge || (project.featured ? 'Featured' : 'Live')}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-1 mb-2">
          {project.title}
        </h3>

        {/* Description: Exactly 2 lines with ellipsis */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2 mb-3.5">
          {project.description}
        </p>

        {/* Key Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="space-y-1.5 mb-4 pt-1">
            {project.highlights.slice(0, 2).map((h, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                <FiCheck className="h-3.5 w-3.5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{h}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Area: Technologies & Action Links */}
      <div className="pt-3 border-t border-slate-100 dark:border-red-950/30 space-y-3">
        {/* Tech Badges */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md text-[11px] font-medium font-mono bg-slate-100 dark:bg-[#181822] text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-red-950/40"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono text-slate-400">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Action Buttons & Admin Controls */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-2">
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-semibold shadow-xs hover:shadow-sm hover:shadow-red-600/30 transition-all cursor-pointer"
              >
                <span>Live Demo</span>
                <FiArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            ) : isGame ? (
              <Link
                href="/mobile-apps/games"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-semibold shadow-xs hover:shadow-sm hover:shadow-red-600/30 transition-all cursor-pointer"
              >
                <FaGamepad className="h-3.5 w-3.5" />
                <span>Game Details</span>
              </Link>
            ) : null}

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-red-950/40 bg-white dark:bg-[#161620] text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 hover:border-red-500/50 transition-all"
              >
                <FiGithub className="h-3.5 w-3.5" />
                <span>Source</span>
              </a>
            )}
          </div>

          {isAdmin && (
            <div className="flex items-center gap-1">
              {onEdit && (
                <button
                  onClick={() => onEdit(project)}
                  aria-label="Edit project"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 transition"
                >
                  <FiEdit2 className="h-3.5 w-3.5" />
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(project._id)}
                  aria-label="Delete project"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 transition"
                >
                  <FiTrash2 className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
