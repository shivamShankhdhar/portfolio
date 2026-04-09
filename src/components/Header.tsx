'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
                <span className="text-lg font-bold text-white">SS</span>
              </div>
              <span className="hidden text-xl font-bold text-slate-900 sm:block">Shivam Shankhdhar</span>
            </Link>

            <nav className="hidden gap-8 md:flex">
              <Link href="/#projects" className="text-sm font-semibold text-slate-700 transition-colors hover:text-blue-600">
                Projects
              </Link>
              <Link href="/#experience" className="text-sm font-semibold text-slate-700 transition-colors hover:text-blue-600">
                Experience
              </Link>
              <Link href="/#education" className="text-sm font-semibold text-slate-700 transition-colors hover:text-blue-600">
                Education
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Admin Panel
            </Link>

            <button
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {isOpen && (
          <nav className="border-t border-slate-200 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              <Link href="/#projects" className="text-sm font-semibold text-slate-700 hover:text-blue-600">
                Projects
              </Link>
              <Link href="/#experience" className="text-sm font-semibold text-slate-700 hover:text-blue-600">
                Experience
              </Link>
              <Link href="/#education" className="text-sm font-semibold text-slate-700 hover:text-blue-600">
                Education
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
