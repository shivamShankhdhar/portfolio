'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { FiCode, FiBriefcase, FiBook, FiSun, FiMoon, FiAward, FiMail } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface SidebarLayoutProps {
  children: React.ReactNode;
  hasProjects?: boolean;
  hasExperience?: boolean;
  hasEducation?: boolean;
  hasSkills?: boolean;
}

export default function SidebarLayout({
  children,
  hasProjects = true,
  hasExperience = true,
  hasEducation = true,
  hasSkills = true,
}: SidebarLayoutProps) {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { id: 'projects', icon: FiCode, label: 'Projects', show: hasProjects },
    { id: 'skills', icon: FiAward, label: 'Skills', show: hasSkills },
    { id: 'experience', icon: FiBriefcase, label: 'Experience', show: hasExperience },
    { id: 'education', icon: FiBook, label: 'Education', show: hasEducation },
    { id: 'contact', icon: FiMail, label: 'Contact', show: true },
  ].filter((item) => item.show);

  useEffect(() => {
    setIsHydrated(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 110);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let visibleSection: string | null = null;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSection = entry.target.id;
          }
        });

        if (visibleSection) {
          setActiveSection(visibleSection);
        }
      },
      {
        root: null,
        rootMargin: '-30% 0px -40% 0px',
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section!));

    return () => {
      sections.forEach((section) => observer.unobserve(section!));
    };
  }, [navItems]);

  return (
    <>
      {/* Floating Bottom Quick Navigation Dock (Only visible when scrolled down) */}
      {isHydrated && (
        <motion.nav
          aria-label="Quick Section Navigation"
          initial={{ y: 90, opacity: 0, scale: 0.9 }}
          animate={{
            y: isScrolled ? 0 : 90,
            opacity: isScrolled ? 1 : 0,
            scale: isScrolled ? 1 : 0.9,
          }}
          transition={{ type: 'spring', stiffness: 360, damping: 28 }}
          className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/95 dark:bg-[#121217]/95 backdrop-blur-2xl border border-red-200/80 dark:border-red-900/50 shadow-2xl shadow-red-950/20 ${
            isScrolled ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => handleScrollToSection(item.id)}
                aria-label={`Scroll to ${item.label}`}
                className={`group relative flex items-center justify-center h-9 w-9 rounded-xl transition-colors duration-150 ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50/80 dark:hover:bg-red-950/40'
                }`}
              >
                {/* Active Animated Pill Bubble */}
                {isActive && (
                  <motion.div
                    layoutId="activeDockSection"
                    transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                    className="absolute inset-0 rounded-xl bg-gradient-to-br from-red-600 to-rose-700 shadow-md shadow-red-600/40"
                  />
                )}

                <span className="relative z-10">
                  <Icon className="h-4 w-4" />
                </span>

                {/* Floating Tooltip */}
                <div className="absolute -top-10 px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap pointer-events-none bg-slate-900 text-white dark:bg-white dark:text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity duration-150 shadow-lg">
                  {item.label}
                </div>
              </motion.button>
            );
          })}

          <div className="h-5 w-[1px] bg-slate-200 dark:bg-red-900/30 mx-0.5" />

          {/* Bottom Dock Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.9, rotate: 180 }}
            onClick={toggleTheme}
            aria-label="Toggle Dark or Light Mode"
            className="group relative flex items-center justify-center h-9 w-9 rounded-xl text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50/80 dark:hover:bg-red-950/40 transition-colors"
          >
            {theme === 'dark' ? (
              <FiSun className="h-4 w-4 text-amber-400" />
            ) : (
              <FiMoon className="h-4 w-4 text-red-600" />
            )}
            <div className="absolute -top-10 px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap pointer-events-none bg-slate-900 text-white dark:bg-white dark:text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity duration-150 shadow-lg">
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </div>
          </motion.button>
        </motion.nav>
      )}

      <main className="space-y-0 scroll-smooth">{children}</main>
    </>
  );
}