'use client';

import TypingAnimation from '@/components/TypingAnimation';
import { BsCopy } from 'react-icons/bs';

export default function HeroSection({ profile, adminEmail }: any) {
  return (
     <section className="relative min-h-screen overflow-hidden px-6 sm:px-8 flex items-center justify-center">
            {/* Background Gradient */}
            <div className="absolute inset-0 opacity-30 dark:opacity-10">
              <div className="absolute top-20 right-20 h-96 w-96 rounded-full bg-gradient-to-br from-rose-500 to-rose-600 blur-3xl"></div>
              <div className="absolute bottom-20 left-20 h-96 w-96 rounded-full bg-gradient-to-br from-rose-400 to-rose-500 blur-3xl"></div>
            </div>
    
            <div className="relative mx-auto max-w-6xl">
              <div className="grid items-center gap-16 md:grid-cols-[2fr_1fr]">
                {/* Left Content */}
                <div className="space-y-8">
                  <div className="space-y-4 animate-slideIn">
                    <p className="text-sm font-semibold uppercase tracking-widest text-rose-600 dark:text-rose-400">
                      Welcome to my World
                    </p>
                    <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
                      Hi, I'm{' '}
                      
                    </h1>
                    <h1 className="bg-gradient-to-r text-5xl font-bold tracking-tight sm:text-6xl from-rose-500 to-rose-600 bg-clip-text text-transparent">
                        {profile?.name || 'Shivam Shankhdhar'}
                      </h1>
                  </div>
                  {/* Typing Animation - Roles */}
                    {profile?.roles && profile.roles.length > 0 && (
                      <div className="">
                        {/* <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">Currently</p> */}
                        <p className="text-xl font-semibold">
                          <TypingAnimation
                            phrases={profile.roles}
                            speed={60}
                            delay={1500}
                            className="bg-gradient-to-r from-rose-500 to-rose-600 dark:from-rose-400 dark:to-rose-500 bg-clip-text text-transparent"
                          />
                        </p>
                      </div>
                    )}
    
                  <div className="space-y-0">
                    <p className=" text-lg max-w-xl leading-relaxed text-slate-600 dark:text-slate-400">
                      {profile?.bio || 'Building beautiful, scalable, and user-friendly applications using modern technologies. Always passionate about learning and creating innovative solutions.'}
                    </p>
                    
                    
                  </div>
    
                  <div className="flex flex-wrap gap-3 pt-4">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(adminEmail);
                        alert('Email copied to clipboard!');
                      }}
                      className="inline-flex items-center gap-2 rounded-xl text-sm bg-gradient-to-r from-slate-600 to-slate-700 dark:from-slate-700 dark:to-slate-800 px-4 py-2 text-white transition-all hover:shadow-lg hover:scale-105"
                    >
                      <BsCopy className="h-4 w-4" />
                      Copy Email
                    </button>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 text-sm rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 px-5 py-2 text-white transition-all hover:shadow-lg hover:scale-105"
                    >
                      Hire Me
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </a>
                  </div>
                </div>
    
                    {/* Right Avatar with Enhanced Bubbles */}
                <div className="flex justify-center items-center">
                  <div className="relative w-96 h-96 flex items-center justify-center">
                    {/* Wave Animated Rings Background */}
                    <div className="absolute inset-0 rounded-full border border-rose-300/40 dark:border-rose-500/30" style={{ animation: 'wave 2.5s ease-in-out infinite' }}></div>
                    <div className="absolute inset-0 rounded-full border border-rose-200/20 dark:border-rose-500/15" style={{ animation: 'wave 3.5s ease-in-out infinite 0.5s' }}></div>
                    <style>{`
                      @keyframes wave {
                        0%, 100% { transform: scale(0.8); opacity: 0.3; }
                        50% { transform: scale(1.1); opacity: 0.8; }
                      }
                    `}</style>
    
                    {/* Main Circular Avatar */}
                    <div className="relative z-10 w-80 h-80 flex items-center justify-center">
                      {/* Avatar Image */}
                      <div className="relative w-72 h-72 overflow-hidden rounded-full shadow-2xl animate-fadeInScale">
                        <img
                          src="/avatar/shivam_avatar.png"
                          alt="Shivam Shankhdhar"
                          className="w-full h-full object-cover"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
                      </div>
                    </div>
    
                    {/* Floating Badge */}
                    {/* Removed - now showing after name */}
                  </div>
                </div>
              </div>
            </div>
          </section>
  );
}