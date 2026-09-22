'use client';

import React from 'react';
import Link from 'next/link';
import {
  FiArrowUp,
  FiMail,
  FiGithub,
  FiLinkedin,
  FiShield,
  FiFileText,
  FiUser,
  FiSmartphone,
  FiCheckCircle,
} from 'react-icons/fi';
import { motion } from 'framer-motion';

interface FooterProps {
  adminEmail?: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

export default function Footer({
  adminEmail = 'er.shivam1214@gmail.com',
  githubUrl = 'https://github.com/shivamshankhdhar',
  linkedinUrl = 'https://linkedin.com/in/shivam-shankhdhar-559092203',
}: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-slate-200/80 dark:border-red-950/40 bg-slate-50/60 dark:bg-[#07070a]/90 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Brand & Bio Column */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-red-500/40 shadow-sm shadow-red-600/20">
                <img
                  src="/avatar/shivam_avatar.png"
                  alt="Shivam Shankhdhar"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-base font-bold text-slate-900 dark:text-white">
                  Shivam <span className="text-red-600 dark:text-red-500">Shankhdhar</span>
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Full Stack & Mobile Engineer
                </p>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              Architecting resilient web applications, native mobile experiences (React Native / Expo), and enterprise Java & Spring Boot backend microservices.
            </p>

            <div className="pt-1 flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for engineering roles & consulting</span>
            </div>

            {/* Social Buttons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#12131e] text-slate-700 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-400 hover:border-red-500/40 transition shadow-xs"
              >
                <FiGithub className="h-4 w-4" />
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#12131e] text-slate-700 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-400 hover:border-red-500/40 transition shadow-xs"
              >
                <FiLinkedin className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${adminEmail}`}
                aria-label="Send Email"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#12131e] text-slate-700 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-400 hover:border-red-500/40 transition shadow-xs"
              >
                <FiMail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Navigation
            </p>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link
                  href="/"
                  className="text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/#projects"
                  className="text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition"
                >
                  Projects & Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/#skills"
                  className="text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition"
                >
                  Technical Skills
                </Link>
              </li>
              <li>
                <Link
                  href="/#experience"
                  className="text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition"
                >
                  Work Experience
                </Link>
              </li>
              <li>
                <Link
                  href="/#education"
                  className="text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition"
                >
                  Education
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition"
                >
                  Contact & Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Mobile Apps & Products Column */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Mobile Apps & Games
            </p>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link
                  href="/mobile-apps"
                  className="text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition inline-flex items-center gap-1.5"
                >
                  <FiSmartphone className="h-3.5 w-3.5 text-red-500" />
                  <span>Mobile Apps Hub</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/mobile-apps/games"
                  className="text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition inline-flex items-center gap-1.5"
                >
                  <span className="text-xs">🎮</span>
                  <span>Games Showcase</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/mobile-apps/games/privacy-policy/chess-binge"
                  className="text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition"
                >
                  Chess Binge (Android)
                </Link>
              </li>
              <li>
                <Link
                  href="/mobile-apps/games/privacy-policy/ludo-binge"
                  className="text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition"
                >
                  Ludo Binge (Android)
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance Column */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Legal & Policies
            </p>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition inline-flex items-center gap-1.5"
                >
                  <FiShield className="h-3.5 w-3.5 text-red-500" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition inline-flex items-center gap-1.5"
                >
                  <FiFileText className="h-3.5 w-3.5 text-red-500" />
                  <span>Terms of Service</span>
                </Link>
              </li>
            </ul>

            <div className="pt-2 p-3 rounded-xl bg-red-500/5 dark:bg-red-950/20 border border-red-500/15 dark:border-red-900/30 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              <span className="font-semibold text-slate-700 dark:text-slate-200">Zero User Data Harvested:</span> This site is an authentic developer showcase. We do not track visitors or sell any user information.
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-200/80 dark:border-red-950/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-center sm:text-left">
            <p>
              &copy; {currentYear} Shivam Shankhdhar. All rights reserved.
            </p>
          </div>

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-red-950/40 bg-white/80 dark:bg-[#121218] hover:text-red-600 dark:hover:text-red-400 hover:border-red-500/50 transition shadow-xs cursor-pointer"
          >
            <span>Back to Top</span>
            <FiArrowUp className="h-3.5 w-3.5 text-red-500" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
