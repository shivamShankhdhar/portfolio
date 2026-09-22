'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCpu, FiEdit2, FiTrash2 } from 'react-icons/fi';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiMongodb,
  SiPostgresql,
  SiTailwindcss,
  SiDocker,
  SiGit,
  SiGradle,
  SiSpring,
  SiRedis,
  SiExpo,
  SiPython,
  SiDjango,
  SiRedux,
  SiMysql,
  SiPrisma,
  SiJenkins,
  SiNginx,
  SiPostman,
  SiLinux,
  SiWordpress,
  SiHtml5,
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { FaJava } from 'react-icons/fa6';

export interface Skill {
  _id: string;
  name: string;
  category: string;
  proficiency: string;
  icon?: string;
  image?: string;
  description?: string;
  experienceYears?: string;
}

interface SkillCardProps {
  skill: Skill;
  index?: number;
  onEdit?: (skill: Skill) => void;
  onDelete?: (id: string) => void;
  isAdmin?: boolean;
}

function getBrandIcon(name: string) {
  const n = name.toLowerCase();
  if (n.includes('react native') || n.includes('expo')) return <SiExpo className="h-5 w-5 sm:h-6 sm:w-6 text-[#A855F7]" />;
  if (n.includes('next')) return <SiNextdotjs className="h-5 w-5 sm:h-6 sm:w-6 text-slate-900 dark:text-white" />;
  if (n.includes('react')) return <SiReact className="h-5 w-5 sm:h-6 sm:w-6 text-[#61DAFB]" />;
  if (n.includes('typescript')) return <SiTypescript className="h-5 w-5 sm:h-6 sm:w-6 text-[#3178C6]" />;
  if (n.includes('javascript')) return <SiJavascript className="h-5 w-5 sm:h-6 sm:w-6 text-[#F7DF1E]" />;
  if (n.includes('java') && !n.includes('script')) return <FaJava className="h-5 w-5 sm:h-6 sm:w-6 text-[#ED8B00]" />;
  if (n.includes('spring')) return <SiSpring className="h-5 w-5 sm:h-6 sm:w-6 text-[#6DB33F]" />;
  if (n.includes('node')) return <SiNodedotjs className="h-5 w-5 sm:h-6 sm:w-6 text-[#5FA04E]" />;
  if (n.includes('mongo')) return <SiMongodb className="h-5 w-5 sm:h-6 sm:w-6 text-[#47A248]" />;
  if (n.includes('postgres') || (n.includes('sql') && !n.includes('my'))) return <SiPostgresql className="h-5 w-5 sm:h-6 sm:w-6 text-[#4169E1]" />;
  if (n.includes('mysql')) return <SiMysql className="h-5 w-5 sm:h-6 sm:w-6 text-[#4479A1]" />;
  if (n.includes('prisma')) return <SiPrisma className="h-5 w-5 sm:h-6 sm:w-6 text-slate-800 dark:text-slate-200" />;
  if (n.includes('tailwind')) return <SiTailwindcss className="h-5 w-5 sm:h-6 sm:w-6 text-[#06B6D4]" />;
  if (n.includes('docker')) return <SiDocker className="h-5 w-5 sm:h-6 sm:w-6 text-[#2496ED]" />;
  if (n.includes('jenkins')) return <SiJenkins className="h-5 w-5 sm:h-6 sm:w-6 text-[#D24939]" />;
  if (n.includes('nginx')) return <SiNginx className="h-5 w-5 sm:h-6 sm:w-6 text-[#009639]" />;
  if (n.includes('git')) return <SiGit className="h-5 w-5 sm:h-6 sm:w-6 text-[#F05032]" />;
  if (n.includes('gradle')) return <SiGradle className="h-5 w-5 sm:h-6 sm:w-6 text-[#02303A] dark:text-[#06B6D4]" />;
  if (n.includes('redis')) return <SiRedis className="h-5 w-5 sm:h-6 sm:w-6 text-[#DC382D]" />;
  if (n.includes('python')) return <SiPython className="h-5 w-5 sm:h-6 sm:w-6 text-[#3776AB]" />;
  if (n.includes('django')) return <SiDjango className="h-5 w-5 sm:h-6 sm:w-6 text-[#092E20] dark:text-[#44B78B]" />;
  if (n.includes('redux')) return <SiRedux className="h-5 w-5 sm:h-6 sm:w-6 text-[#764ABC]" />;
  if (n.includes('postman')) return <SiPostman className="h-5 w-5 sm:h-6 sm:w-6 text-[#FF6C37]" />;
  if (n.includes('linux')) return <SiLinux className="h-5 w-5 sm:h-6 sm:w-6 text-[#FCC624]" />;
  if (n.includes('vscode')) return <VscVscode className="h-5 w-5 sm:h-6 sm:w-6 text-[#007ACC]" />;
  if (n.includes('html')) return <SiHtml5 className="h-5 w-5 sm:h-6 sm:w-6 text-[#E34F26]" />;
  if (n.includes('wordpress')) return <SiWordpress className="h-5 w-5 sm:h-6 sm:w-6 text-[#21759B]" />;
  return <FiCpu className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 dark:text-red-400" />;
}

export default function SkillCard({ skill, index = 0, onEdit, onDelete, isAdmin = false }: SkillCardProps) {
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Gentle, calm idle floating cycle (no light flashes, no lightning)
  const duration = 3.5 + (index % 5) * 0.4;
  const yOffset = (index % 2 === 0 ? 3.5 : -3.5);
  const delay = (index % 6) * 0.2;

  return (
    <motion.div
      layout
      className="relative flex flex-col items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Sleek Pill Card: Icon + Name */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 15 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        animate={{
          y: [-yOffset, yOffset, -yOffset],
        }}
        transition={{
          y: {
            repeat: Infinity,
            duration: duration,
            ease: 'easeInOut',
            delay: delay,
          },
          opacity: { duration: 0.35, delay: Math.min(index * 0.02, 0.3) },
          scale: { type: 'spring', stiffness: 260, damping: 20, delay: Math.min(index * 0.02, 0.3) },
        }}
        whileHover={{
          scale: 1.08,
          y: -5,
          borderColor: 'rgba(225, 29, 72, 0.8)',
          boxShadow: '0 8px 24px -4px rgba(225, 29, 72, 0.22)',
          transition: { type: 'spring', stiffness: 350, damping: 18 },
        }}
        whileTap={{ scale: 0.96 }}
        className="relative flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-white dark:bg-[#111116] border border-slate-200/90 dark:border-red-950/40 shadow-xs cursor-pointer transition-colors duration-200"
      >
        {/* Technology Brand Icon */}
        <div className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center">
          {skill.image && !imgError ? (
            <img
              src={skill.image}
              alt={skill.name}
              className="h-5 w-5 sm:h-6 sm:w-6 object-contain"
              onError={() => setImgError(true)}
            />
          ) : (
            getBrandIcon(skill.name)
          )}
        </div>

        {/* Technology Name right after Icon */}
        <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 capitalize whitespace-nowrap">
          {skill.name}
        </span>
      </motion.div>

      {/* Floating Detail Chip on Hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap drop-shadow-xl"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/95 dark:bg-[#181822]/95 backdrop-blur-md border border-slate-700/80 dark:border-red-900/60 text-white text-xs shadow-xl">
              <span className="font-bold text-white capitalize">{skill.name}</span>
              <span className="h-1 w-1 rounded-full bg-red-400" />
              <span className="text-[10px] font-semibold text-red-400 uppercase tracking-wider">
                {skill.proficiency || 'Production'}
              </span>
              {skill.category && (
                <span className="text-[10px] text-slate-400 hidden sm:inline">
                  • {skill.category}
                </span>
              )}
            </div>
            <div className="w-2 h-2 bg-slate-950 dark:bg-[#181822] border-r border-b border-slate-700/80 dark:border-red-900/60 transform rotate-45 mx-auto -mt-1" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Controls on Hover */}
      {isAdmin && (
        <div className="absolute -bottom-6 flex items-center gap-1 opacity-0 hover:opacity-100 transition-opacity z-10 bg-white dark:bg-[#121217] p-1 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
          {onEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(skill);
              }}
              className="p-1 text-slate-400 hover:text-blue-500"
              aria-label="Edit"
            >
              <FiEdit2 className="h-3 w-3" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(skill._id);
              }}
              className="p-1 text-slate-400 hover:text-red-500"
              aria-label="Delete"
            >
              <FiTrash2 className="h-3 w-3" />
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
}
