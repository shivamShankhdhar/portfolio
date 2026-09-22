'use client';

import React, { useState } from 'react';
import TypingAnimation from '@/components/TypingAnimation';
import {
  FiArrowDown,
  FiSend,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiCopy,
  FiCheck,
} from 'react-icons/fi';
import { FaJava, FaGamepad } from 'react-icons/fa6';
import { SiReact } from 'react-icons/si';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  profile: {
    name?: string;
    bio?: string;
    roles?: string[];
    available?: boolean;
    linkedinUrl?: string;
    githubUrl?: string;
  };
  adminEmail: string;
}

export default function HeroSection({ profile, adminEmail }: HeroSectionProps) {
  const [codeCopied, setCodeCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'developer' | 'stack'>('developer');

  const roles = profile?.roles && profile.roles.length > 0 ? profile.roles : [
    'Full Stack Software Engineer',
    'Mobile App Specialist (React Native)',
    'Java & Spring Boot Backend Architect',
    'Next.js & TypeScript Engineer',
  ];

  const codeSnippet = `package com.shivam.portfolio;

@Service
public class ShivamEngineer {

    public EngineerProfile getProfile() {
        return EngineerProfile.builder()
            .name("${profile?.name || 'Shivam Shankhdhar'}")
            .role("Full Stack & Mobile Engineer")
            .mobile("React Native & Expo")
            .backend("Java • Spring Boot • Microservices")
            .status("🟢 Open to Full-time Roles & Contracts")
            .build();
    }
}`;

  const stackSnippet = `// Production Stack
const techStack = {
  mobile:  ['React Native', 'Expo SDK 57', 'Android SDK'],
  backend: ['Java', 'Spring Boot 3', 'Microservices', 'REST APIs'],
  frontend:['Next.js 16', 'React 19', 'TypeScript', 'Tailwind'],
  data:    ['PostgreSQL', 'MongoDB', 'Redis', 'Docker'],
  status:  'Available for hiring'
};`;

  const handleCopyCode = () => {
    const codeToCopy = activeTab === 'developer' ? codeSnippet : stackSnippet;
    navigator.clipboard.writeText(codeToCopy);
    setCodeCopied(true);
    toast.success('Code copied to clipboard');
    setTimeout(() => setCodeCopied(false), 2000);
  };

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-14 bg-radial-gradient bg-developer-grid">
      
      {/* Background Soft Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-red-600/12 via-rose-600/15 to-transparent rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="mx-auto max-w-6xl w-full space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Focused, Clean Personal Brand */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            
            {/* Clean Availability Badge */}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200/80 dark:border-red-900/50 shadow-xs hover:border-red-500/60 transition-all"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Available for Full-time Roles & Contracts</span>
            </motion.a>

            {/* Name Hierarchy */}
            <div className="space-y-1">
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 dark:text-slate-100 tracking-tight block">
                Hi, I'm
              </span>
              <h1 className="text-4xl min-[400px]:text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-gradient-red drop-shadow-sm leading-tight">
                {profile?.name || 'Shivam Shankhdhar'}
              </h1>
            </div>

            {/* Subtitle & Dynamic Role */}
            <div className="inline-flex items-center gap-2 font-mono text-sm sm:text-base text-slate-600 dark:text-slate-300">
              <span className="text-red-600 dark:text-red-400 font-bold">&gt;</span>
              <TypingAnimation
                phrases={roles}
                speed={50}
                delay={2000}
                className="text-red-600 dark:text-red-400 font-bold"
              />
            </div>

            {/* Concise Handwritten Summary */}
            <div className="border-l-2 border-red-500/50 dark:border-red-500/60 pl-4 py-1 max-w-lg mx-auto lg:mx-0 text-left">
              <p className="font-handwriting text-xl sm:text-2xl text-slate-700 dark:text-slate-200 leading-snug">
                "Architecting high-performance mobile apps & scalable enterprise microservices from zero to live production."
              </p>
            </div>

            {/* Streamlined Action CTAs & Social Links */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-md shadow-red-600/25 hover:shadow-red-600/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <span>View Projects</span>
                <FiArrowDown className="h-4 w-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border-2 border-dotted border-red-300 dark:border-red-900/60 hover:border-red-500 bg-white dark:bg-[#101016] text-slate-800 dark:text-slate-100 hover:bg-red-50/50 dark:hover:bg-red-950/30 transition-all duration-200"
              >
                <FiSend className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
                <span>Get In Touch</span>
              </a>

              {/* Social Icons Inline */}
              <div className="flex items-center gap-2 pl-2">
                <a
                  href={profile?.githubUrl || 'https://github.com/shivamShankhdhar'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-slate-200/80 dark:border-red-950/40 bg-white dark:bg-[#121218] text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 hover:border-red-500/50 transition-all"
                  aria-label="GitHub"
                >
                  <FiGithub className="h-4 w-4" />
                </a>
                <a
                  href={profile?.linkedinUrl || 'https://linkedin.com/in/shivam-shankhdhar'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-slate-200/80 dark:border-red-950/40 bg-white dark:bg-[#121218] text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 hover:border-red-500/50 transition-all"
                  aria-label="LinkedIn"
                >
                  <FiLinkedin className="h-4 w-4" />
                </a>
                <a
                  href={`mailto:${adminEmail || 's.shankhdhar1981@gmail.com'}`}
                  className="p-2.5 rounded-xl border border-slate-200/80 dark:border-red-950/40 bg-white dark:bg-[#121218] text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 hover:border-red-500/50 transition-all"
                  aria-label="Email"
                >
                  <FiMail className="h-4 w-4" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Sleek, Minimalist Developer Terminal */}
          <div className="lg:col-span-5 w-full max-w-lg mx-auto">
            <div className="rounded-3xl border-2 border-dotted border-red-300 dark:border-red-900/60 hover:border-red-500 bg-white dark:bg-[#0e0e14] shadow-xl shadow-red-950/10 overflow-hidden transition-all">
              
              {/* Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-[#13131c] border-b border-slate-100 dark:border-red-950/40">
                {/* Window Dots */}
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/80 inline-block" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80 inline-block" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80 inline-block" />
                </div>

                {/* File Tabs */}
                <div className="flex items-center gap-1 text-xs font-mono">
                  <button
                    onClick={() => setActiveTab('developer')}
                    className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                      activeTab === 'developer'
                        ? 'bg-white dark:bg-[#1c1c28] text-red-600 dark:text-red-400 font-semibold shadow-xs'
                        : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                  >
                    <FaJava className="h-3 w-3 text-red-500" />
                    <span>ShivamEngineer.java</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('stack')}
                    className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                      activeTab === 'stack'
                        ? 'bg-white dark:bg-[#1c1c28] text-red-600 dark:text-red-400 font-semibold shadow-xs'
                        : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                  >
                    <SiReact className="h-3 w-3 text-red-500" />
                    <span>Stack.ts</span>
                  </button>
                </div>

                {/* Copy Button */}
                <button
                  onClick={handleCopyCode}
                  title="Copy code"
                  className="p-1.5 rounded-md text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition"
                >
                  {codeCopied ? <FiCheck className="h-3.5 w-3.5 text-emerald-500" /> : <FiCopy className="h-3.5 w-3.5" />}
                </button>
              </div>

              {/* Code Snippet */}
              <div className="p-4 sm:p-5 font-mono text-xs leading-relaxed overflow-x-auto text-slate-700 dark:text-slate-300 bg-white dark:bg-[#0c0c11]">
                <pre className="font-mono text-xs whitespace-pre">
                  {activeTab === 'developer' ? (
                    <code>
                      <span className="text-purple-600 dark:text-purple-400">package</span> com.shivam.portfolio;{'\n\n'}
                      <span className="text-amber-600 dark:text-amber-400">@Service</span>{'\n'}
                      <span className="text-purple-600 dark:text-purple-400">public class</span> <span className="text-blue-600 dark:text-blue-400 font-bold">ShivamEngineer</span> &#123;{'\n\n'}
                      {'    '}<span className="text-purple-600 dark:text-purple-400">public</span> EngineerProfile <span className="text-amber-600 dark:text-amber-300 font-semibold">getProfile</span>() &#123;{'\n'}
                      {'        '}<span className="text-purple-600 dark:text-purple-400">return</span> EngineerProfile.builder(){'\n'}
                      {'            '}.<span className="text-red-600 dark:text-red-400">name</span>(<span className="text-emerald-600 dark:text-emerald-400">"{profile?.name || 'Shivam Shankhdhar'}"</span>){'\n'}
                      {'            '}.<span className="text-red-600 dark:text-red-400">role</span>(<span className="text-emerald-600 dark:text-emerald-400">"Full Stack & Mobile Engineer"</span>){'\n'}
                      {'            '}.<span className="text-red-600 dark:text-red-400">mobile</span>(<span className="text-emerald-600 dark:text-emerald-400">"React Native & Expo"</span>){'\n'}
                      {'            '}.<span className="text-red-600 dark:text-red-400">backend</span>(<span className="text-emerald-600 dark:text-emerald-400">"Java • Spring Boot"</span>){'\n'}
                      {'            '}.<span className="text-red-600 dark:text-red-400">status</span>(<span className="text-emerald-600 dark:text-emerald-400">"🟢 Open to Full-time & Contracts"</span>){'\n'}
                      {'            '}.build();{'\n'}
                      {'    '}&#125;{'\n'}
                      &#125;
                    </code>
                  ) : (
                    <code>
                      <span className="text-slate-400">// Core Stack</span>{'\n'}
                      <span className="text-purple-600 dark:text-purple-400">const</span> techStack = &#123;{'\n'}
                      {'  '}mobile:  [<span className="text-emerald-600 dark:text-emerald-400">'React Native'</span>, <span className="text-emerald-600 dark:text-emerald-400">'Expo'</span>],{'\n'}
                      {'  '}backend: [<span className="text-emerald-600 dark:text-emerald-400">'Java'</span>, <span className="text-emerald-600 dark:text-emerald-400">'Spring Boot'</span>],{'\n'}
                      {'  '}frontend:[<span className="text-emerald-600 dark:text-emerald-400">'Next.js'</span>, <span className="text-emerald-600 dark:text-emerald-400">'TypeScript'</span>],{'\n'}
                      {'  '}database:[<span className="text-emerald-600 dark:text-emerald-400">'PostgreSQL'</span>, <span className="text-emerald-600 dark:text-emerald-400">'MongoDB'</span>],{'\n'}
                      &#125;;
                    </code>
                  )}
                </pre>
              </div>

              {/* Minimal Terminal Footer */}
              <div className="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-[#121218] border-t border-slate-100 dark:border-red-950/40 text-[11px] font-mono text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Java 21 • React Native • Next.js
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Ready to Ship</span>
              </div>

            </div>
          </div>

        </div>

        {/* Clean, Subtle Key Highlights */}
        <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 p-3.5 rounded-2xl border-2 border-dotted border-red-300 dark:border-red-900/60 bg-white/60 dark:bg-[#101016]/60 shadow-xs">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-600 dark:text-red-400">
              <FaGamepad className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">2 Games on Google Play</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Published mobile engines</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl border-2 border-dotted border-red-300 dark:border-red-900/60 bg-white/60 dark:bg-[#101016]/60 shadow-xs">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-600 dark:text-red-400">
              <FaJava className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">Enterprise APIs & Microservices</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Java Spring Boot & Docker</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl border-2 border-dotted border-red-300 dark:border-red-900/60 bg-white/60 dark:bg-[#101016]/60 shadow-xs">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-600 dark:text-red-400">
              <SiReact className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">Full Stack React & Next.js</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Production web platforms</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}