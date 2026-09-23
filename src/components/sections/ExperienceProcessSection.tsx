'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiCpu, FiLayout, FiCode, FiSend } from 'react-icons/fi';

interface EducationItem {
  _id?: string;
  degree: string;
  institution?: string;
  school?: string;
  field?: string;
  startDate?: string;
  endDate?: string;
  year?: string;
}

interface CertificationItem {
  _id?: string;
  name?: string;
  title?: string;
  issuer?: string;
  issueDate?: string;
  year?: string;
}

interface SkillItem {
  _id?: string;
  name: string;
  category?: string;
  proficiency?: string;
}

interface ExperienceProcessSectionProps {
  education: EducationItem[];
  certifications?: CertificationItem[];
  skills: SkillItem[];
  headlineQuote?: string;
  authorName?: string;
  loading?: boolean;
}

export default function ExperienceProcessSection({
  education,
  certifications = [],
  skills,
  headlineQuote,
  authorName = 'Shivam',
  loading = false,
}: ExperienceProcessSectionProps) {
  const quoteText =
    headlineQuote ||
    'Good software is not just how it looks, but how it scales, performs, and withstands production load.';

  // Work Process steps from reference
  const processSteps = [
    {
      num: '01',
      icon: FiSearch,
      title: 'DISCOVER',
      desc: 'Understanding system goals, business logic, user flows, and project constraints.',
    },
    {
      num: '02',
      icon: FiCpu,
      title: 'IDEATE',
      desc: 'System architecture, API contracts, database schemas, and state management strategy.',
    },
    {
      num: '03',
      icon: FiLayout,
      title: 'DESIGN',
      desc: 'Crafting responsive user interfaces, fluid mobile navigation, and micro-interactions.',
    },
    {
      num: '04',
      icon: FiCode,
      title: 'DEVELOP',
      desc: 'Building scalable Spring Boot microservices and cross-platform React Native code.',
    },
    {
      num: '05',
      icon: FiSend,
      title: 'DELIVER',
      desc: 'Rigorous testing, automated CI/CD builds, Play Store publishing, and telemetry.',
    },
  ];

  // Helper to extract year
  const formatYear = (dateStr?: string, fallback: string = '2024') => {
    if (!dateStr) return fallback;
    const yearMatch = dateStr.match(/\d{4}/);
    return yearMatch ? yearMatch[0] : dateStr;
  };

  // Priority skills list to float core stack to top
  const prioritySkills = [
    'java',
    'springboot',
    'spring boot',
    'react native',
    'nextjs',
    'next.js',
    'typescript',
    'reactjs',
    'react',
    'nodejs',
    'node.js',
    'mongodb',
    'postgresql',
    'docker',
    'redux',
    'tailwindcss',
    'expressjs',
    'git',
    'github',
    'python',
    'django',
    'redis',
    'nginx',
    'mysql',
    'linux',
    'postman',
    'prisma',
    'jenkins',
    'expo',
    'html',
    'css',
  ];

  const sortedSkills = [...skills].sort((a, b) => {
    const aLower = a.name.toLowerCase().trim();
    const bLower = b.name.toLowerCase().trim();
    const aIndex = prioritySkills.indexOf(aLower);
    const bIndex = prioritySkills.indexOf(bLower);

    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return aLower.localeCompare(bLower);
  });

  // Display top 20 core technologies
  const displayedSkills = sortedSkills.slice(0, 20);

  return (
    <section id="skills" className="pt-6 pb-12 sm:pt-8 sm:pb-14 bg-[#07080b] text-white w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header: EDUCATION, SKILLS & WORK PROCESS ─────── ENGINEERING FOUNDATION */}
        <div className="flex items-center justify-between gap-4 pb-6 sm:pb-8">
          <div className="flex items-center gap-3 shrink-0">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse shadow-sm shadow-red-500" />
            <h2 className="font-bebas text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wider text-white uppercase">
              EDUCATION, SKILLS &amp; PROCESS
            </h2>
          </div>

          <div className="flex-1 hidden sm:block h-[1px] bg-gradient-to-r from-red-600/40 via-white/10 to-transparent mx-4" />

          <div className="hidden sm:inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-400 uppercase tracking-widest shrink-0">
            <span className="text-red-500">✦</span>
            <span>ENGINEERING FOUNDATION</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Column 1: EDUCATION & SKILLS (4 Cols on desktop, 6 on tablet) */}
          <div className="md:col-span-6 lg:col-span-4 p-6 sm:p-7 rounded-2xl bg-[#0c0d12] border border-white/10 flex flex-col justify-between space-y-6">
            <div>
              <h3 className="font-bebas text-xl sm:text-2xl font-bold tracking-wider text-white uppercase pb-4 border-b border-white/5">
                EDUCATION &amp; SKILLS
              </h3>

              {/* Education Block */}
              <div id="education" className="pt-4 space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-500 block">
                  EDUCATION
                </span>

                <div className="space-y-4">
                  {education.map((item, idx) => (
                    <div key={item._id || idx} className="flex justify-between items-start gap-3">
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-white">
                          {item.degree}
                          {item.field ? ` (${item.field})` : ''}
                        </p>
                        <p className="text-[11px] font-mono text-slate-400">
                          {item.school || item.institution || 'Invertis University'}
                        </p>
                      </div>
                      <span className="text-[11px] font-mono font-bold text-red-400 shrink-0">
                        {item.year || `${formatYear(item.startDate, '2019')} - ${formatYear(item.endDate, '2023')}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Block */}
              <div className="pt-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-500 block">
                    SKILLS
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    {displayedSkills.length} Technologies
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {displayedSkills.map((skill, idx) => (
                    <span
                      key={skill._id || idx}
                      className="px-2.5 py-1 rounded-lg bg-black/60 border border-white/10 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-300 hover:text-white hover:border-red-500/40 hover:bg-red-500/10 transition-all cursor-default"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 text-[10px] font-mono text-slate-500">
              Verified Technical Stack &amp; Continuous Learning
            </div>
          </div>

          {/* Column 2: WORK PROCESS (4 Cols on desktop, 6 on tablet) */}
          <div id="experience" className="md:col-span-6 lg:col-span-4 p-6 sm:p-7 rounded-2xl bg-[#0c0d12] border border-white/10 space-y-6">
            <h3 className="font-bebas text-xl sm:text-2xl font-bold tracking-wider text-white uppercase pb-4 border-b border-white/5">
              WORK PROCESS
            </h3>

            <div className="relative space-y-5">
              {/* Vertical connecting line */}
              <div className="absolute left-[15px] top-4 bottom-4 w-[1px] bg-gradient-to-b from-red-600 via-red-900/60 to-red-600/20" />

              {processSteps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={idx} className="relative flex items-start gap-4 z-10 group">
                    {/* Node circle */}
                    <div className="h-8 w-8 rounded-full bg-[#14151e] border border-red-500/40 flex items-center justify-center shrink-0 text-red-400 group-hover:border-red-400 group-hover:bg-red-600 group-hover:text-white transition-all shadow-sm">
                      <Icon className="h-3.5 w-3.5" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-red-500">
                          {step.num}
                        </span>
                        <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                          {step.title}
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 3: INSPIRATIONAL QUOTE CARD (4 Cols on desktop, 12 on tablet) */}
          <div className="md:col-span-12 lg:col-span-4 p-7 rounded-2xl bg-gradient-to-br from-[#7a1219] via-[#4d0c11] to-[#1c0608] border border-red-500/30 flex flex-col justify-between shadow-2xl shadow-red-950/40 relative overflow-hidden">
            {/* Background Giant Watermark Quote */}
            <div className="absolute top-2 right-4 font-serif text-[120px] font-black text-red-500/10 pointer-events-none select-none leading-none">
              &ldquo;
            </div>

            <div>
              {/* Giant Red Quotation Mark */}
              <div className="text-4xl sm:text-5xl font-serif text-red-400 font-bold leading-none mb-4 select-none">
                &ldquo;&ldquo;
              </div>

              {/* Quote Statement */}
              <blockquote className="text-base sm:text-lg font-medium text-white/95 leading-relaxed tracking-tight">
                {quoteText}
              </blockquote>

              {/* Handwritten Signature */}
              <div className="pt-6">
                <span className="font-handwriting text-3xl sm:text-4xl text-rose-200 block drop-shadow-sm">
                  {authorName}
                </span>
                <span className="text-[10px] font-mono text-red-300 uppercase tracking-widest mt-1 block">
                  Software Engineer &amp; Architect
                </span>
              </div>
            </div>

            {/* Bottom Callout */}
            <div className="pt-8 border-t border-red-400/20 mt-6">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-white/90 flex items-center gap-2">
                <span>LET&apos;S CREATE SOMETHING GREAT TOGETHER</span>
                <span className="text-rose-400">✦</span>
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
