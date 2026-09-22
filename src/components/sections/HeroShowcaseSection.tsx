'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowDown, FiSend } from 'react-icons/fi';

interface HeroShowcaseSectionProps {
  profile: {
    name?: string;
    bio?: string;
    roles?: string[];
    available?: boolean;
    yearsExperience?: string;
    projectsCompleted?: string;
    happyClients?: string;
    location?: string;
    email?: string;
  };
  projectsCount?: number;
  loading?: boolean;
  onOpenContact?: () => void;
}

export default function HeroShowcaseSection({
  profile,
  projectsCount = 20,
  loading = false,
  onOpenContact,
}: HeroShowcaseSectionProps) {
  const roles = profile?.roles && profile.roles.length > 0 ? profile.roles : [
    'FULL STACK & MOBILE ENGINEER',
    'JAVA & SPRING BOOT ARCHITECT',
    'REACT NATIVE SPECIALIST',
  ];

  const primaryRole = roles[0] || 'FULL STACK & MOBILE ENGINEER';
  const secondaryRole = roles[1] || 'JAVA ARCHITECT & APP CREATOR';

  const yearsExp = profile?.yearsExperience || '3+';
  const totalProjects = profile?.projectsCompleted || `${projectsCount}+`;
  const metric3 = profile?.happyClients || '100%';
  const locationText = profile?.location || 'AVAILABLE WORLDWIDE';
  const bio =
    profile?.bio ||
    'I design and build robust full-stack web platforms and high-performance native mobile applications with Spring Boot, React Native, and Next.js. Turning complex architectural ideas into production-ready software.';

  const handleOpenContact = () => {
    if (onOpenContact) {
      onOpenContact();
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative isolate min-h-[85vh] sm:min-h-[88vh] bg-[#07080b] text-white overflow-hidden pt-16 sm:pt-20 pb-4 flex flex-col justify-between">
      {/* Background Soft Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-red-600/15 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="absolute top-16 right-10 w-[350px] h-[300px] bg-rose-600/10 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Giant Red "PORTFOLIO" Background Lettering */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-12 sm:top-14 lg:top-12 flex justify-center pointer-events-none select-none z-0 overflow-hidden"
      >
        <span className="font-bebas text-[22vw] sm:text-[21vw] lg:text-[18.5vw] font-black text-[#dc2626]/25 sm:text-[#dc2626]/30 tracking-wider leading-none select-none drop-shadow-[0_10px_30px_rgba(220,38,38,0.25)]">
          PORTFOLIO
        </span>
      </div>

      {/* 1. Top Sub-Bar (Matches reference image top bar) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between gap-4 pb-2 border-b border-white/5">
          <div className="flex flex-col">
            <span className="text-[11px] sm:text-xs font-mono font-bold tracking-widest text-red-500 uppercase">
              {primaryRole}
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono tracking-wider text-slate-400 uppercase hidden sm:block">
              {secondaryRole}
            </span>
          </div>

          <motion.button
            type="button"
            onClick={handleOpenContact}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 hover:border-red-500/40 transition-all cursor-pointer"
          >
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${profile?.available !== false ? 'bg-emerald-400' : 'bg-amber-400'} opacity-75`} />
              <span className={`relative inline-flex rounded-full h-2 w-2 ${profile?.available !== false ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            </span>
            <span className="tracking-wide">
              {profile?.available !== false ? 'AVAILABLE FOR FREELANCE ✦' : 'OPEN TO OPPORTUNITIES ✦'}
            </span>
          </motion.button>
        </div>
      </div>

      {/* 2. Main Hero Composition */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-4 sm:pt-8 lg:pt-10">
          
          {/* Left Column: Hello script + Giant Name + Role + Bio + Actions */}
          <div className="lg:col-span-7 space-y-5 z-10 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-handwriting text-3xl sm:text-4xl lg:text-5xl text-rose-300 drop-shadow-sm">
                Hello, I&apos;m
              </p>
              
              <h1 className="font-bebas text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[0.9] mt-2 drop-shadow-md">
                SHIVAM<br />
                SHANKHDHAR
              </h1>

              <div className="mt-4 flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <span className="text-xs sm:text-sm font-bold text-red-500 uppercase tracking-widest font-mono bg-red-950/40 px-3 py-1 rounded-md border border-red-500/20">
                  FULL STACK ENGINEER
                </span>
                <span className="text-xs sm:text-sm font-bold text-rose-400 uppercase tracking-widest font-mono bg-rose-950/30 px-3 py-1 rounded-md border border-rose-500/20">
                  MOBILE APP SPECIALIST
                </span>
              </div>

              <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0 mt-4 opacity-90">
                {bio}
              </p>

              <div className="flex items-center justify-center lg:justify-start gap-2.5 pt-5 text-xs sm:text-sm font-mono font-semibold text-slate-300">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500 shadow-sm shadow-red-500 animate-pulse" />
                <span className="uppercase tracking-wider">{locationText}</span>
              </div>

              <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <button
                  type="button"
                  onClick={handleOpenContact}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 transition-all cursor-pointer"
                >
                  <FiSend className="h-4 w-4" />
                  <span>Get In Touch</span>
                </button>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-semibold tracking-wider transition-all"
                >
                  <span>Explore Work</span>
                  <FiArrowDown className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Spark Badge & Metrics Stack */}
          <div className="lg:col-span-5 space-y-8 z-10 text-center lg:text-left flex flex-col justify-center items-center lg:items-end py-4">
            
            {/* Spark Motto Pill */}
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-3 p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md max-w-sm shadow-xl"
            >
              <div className="h-8 w-8 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center shrink-0 text-red-400 font-bold text-sm">
                ✦
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-medium leading-snug">
                Turning complex architectural ideas into powerful, high-performance digital experiences.
              </p>
            </motion.div>

            {/* Vertical Stats Stack (Matching reference: 3+, 40+, 20+) */}
            <div className="space-y-6 pt-2 max-w-sm w-full">
              {/* Stat 1: Years Experience */}
              <div className="flex items-baseline justify-between border-b border-white/10 pb-4">
                <span className="font-bebas text-6xl sm:text-7xl font-bold text-red-500 tracking-tight leading-none drop-shadow-sm">
                  {yearsExp}
                </span>
                <span className="text-xs sm:text-sm font-mono font-bold tracking-widest text-slate-300 uppercase text-right leading-tight">
                  YEARS<br />EXPERIENCE
                </span>
              </div>

              {/* Stat 2: Projects Completed */}
              <div className="flex items-baseline justify-between border-b border-white/10 pb-4">
                <span className="font-bebas text-6xl sm:text-7xl font-bold text-red-500 tracking-tight leading-none drop-shadow-sm">
                  {totalProjects}
                </span>
                <span className="text-xs sm:text-sm font-mono font-bold tracking-widest text-slate-300 uppercase text-right leading-tight">
                  PROJECTS<br />COMPLETED
                </span>
              </div>

              {/* Stat 3: Production Ready / Client Success */}
              <div className="flex items-baseline justify-between pb-2">
                <span className="font-bebas text-6xl sm:text-7xl font-bold text-red-500 tracking-tight leading-none drop-shadow-sm">
                  {metric3}
                </span>
                <span className="text-xs sm:text-sm font-mono font-bold tracking-widest text-slate-300 uppercase text-right leading-tight">
                  PRODUCTION<br />DEPLOYMENTS
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Bottom spacer for rhythm */}
    </section>
  );
}
