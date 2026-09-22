'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiSun, FiMoon, FiSend } from 'react-icons/fi';
import { useTheme } from '@/context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  name?: string;
  role?: string;
}

export default function Header({ name = 'Shivam Shankhdhar', role = 'Full Stack & Mobile Engineer' }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const nameParts = (name || 'Shivam Shankhdhar').trim().split(' ');
  const firstName = nameParts[0] || 'Shivam';
  const lastName = nameParts.slice(1).join(' ') || 'Shankhdhar';

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 110);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#education', label: 'Education' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <motion.header
      initial={{ y: 0, opacity: 1 }}
      animate={{
        y: isScrolled ? -85 : 0,
        opacity: isScrolled ? 0 : 1,
      }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled ? 'pointer-events-none' : 'pointer-events-auto'
      } bg-white/90 dark:bg-[#09090b]/90 backdrop-blur-xl border-b border-red-500/15 dark:border-red-950/40 shadow-sm`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo & Branding */}
          <Link href="/" className="group flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              className="relative flex h-10 w-10 overflow-hidden rounded-full border-2 border-red-500/40 shadow-md shadow-red-600/25 transition-all duration-300"
            >
              <img
                src="/avatar/shivam_avatar.png"
                alt="Shivam Shankhdhar"
                className="h-full w-full object-cover"
              />
            </motion.div>
            <div>
              <p className="text-base font-bold tracking-tight text-slate-900 dark:text-white transition-colors">
                {firstName} <span className="text-red-600 dark:text-red-500">{lastName}</span>
              </p>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                {role}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <motion.div key={link.href} whileHover={{ y: -1 }} whileTap={{ y: 0 }}>
                <Link
                  href={link.href}
                  className="px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 rounded-lg hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all duration-150"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Theme Toggle Button */}
            {mounted && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92, rotate: 180 }}
                onClick={toggleTheme}
                aria-label="Toggle Color Theme"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-red-950/40 bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-400 hover:border-red-500/40 shadow-xs transition-all duration-200"
              >
                {theme === 'dark' ? (
                  <FiSun className="h-4 w-4 text-amber-400" />
                ) : (
                  <FiMoon className="h-4 w-4 text-red-600" />
                )}
              </motion.button>
            )}

            {/* Hire / Contact CTA */}
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#contact"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-sm shadow-red-600/20 hover:shadow-md hover:shadow-red-600/35 transition-all duration-200"
            >
              <FiSend className="h-3.5 w-3.5" />
              <span>Hire Me</span>
            </motion.a>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle mobile menu"
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-red-950/40 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-red-950/40 transition-colors"
            >
              {isOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-red-200/40 dark:border-red-900/40 bg-white/95 dark:bg-[#09090b]/95 backdrop-blur-xl px-4 pt-2 pb-5 space-y-1 overflow-hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 flex items-center justify-end border-t border-slate-200/60 dark:border-red-900/30 px-3">
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-600 text-white shadow-sm"
              >
                <FiSend className="h-3 w-3" />
                <span>Contact</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
