'use client';

import React, { useState } from 'react';
import {
  FiMail,
  FiMapPin,
  FiSend,
  FiGithub,
  FiLinkedin,
  FiCopy,
  FiCheck,
  FiArrowUp,
  FiMessageSquare,
  FiUser,
  FiClock,
  FiZap,
} from 'react-icons/fi';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface ContactSectionProps {
  adminEmail: string;
  profile: {
    githubUrl?: string;
    linkedinUrl?: string;
  };
}

const projectTypes = [
  'Mobile App',
  'Full Stack Web',
  'Backend & APIs',
  'AI & Automation',
  'Full-Time Role',
  'Consulting / Other',
];

export default function ContactSection({ adminEmail, profile }: ContactSectionProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    const emailToCopy = adminEmail || 's.shankhdhar1981@gmail.com';
    navigator.clipboard.writeText(emailToCopy);
    setCopied(true);
    toast.success('Email copied to clipboard!', {
      description: emailToCopy,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSelectType = (type: string) => {
    setSelectedType((prev) => (prev === type ? null : type));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          topic: selectedType || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      toast.success('Message sent successfully! 🚀', {
        description: 'Thank you for reaching out. A confirmation has been sent to your email.',
      });
      setFormData({ name: '', email: '', message: '' });
      setSelectedType(null);
    } catch (err: any) {
      toast.error('Failed to send message', {
        description: err.message || 'Please try copying my email directly.',
      });
    } finally {
      setLoading(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="contact" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-red-100/80 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900/40 shadow-xs">
          <FiZap className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
          <span>Let's Connect</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Let's Build Something <span className="text-gradient-red">Exceptional</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Have an app idea, backend challenge, or an exciting opportunity? Send a message directly or connect across social channels.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
        
        {/* Left Side: Contact Hub */}
        <div className="lg:col-span-5 space-y-6">
          <div className="relative group p-6 sm:p-7 rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0f1017]/90 backdrop-blur-xl shadow-xl shadow-red-950/5 space-y-6 overflow-hidden transition-all duration-300 hover:border-red-500/30">
            
            {/* Ambient Red Glow in Card */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br from-red-600/15 via-rose-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

            {/* Profile Intro Badge with Status */}
            <div className="flex items-center justify-between gap-3.5 pb-4 border-b border-slate-100 dark:border-white/5">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-red-500/40 shrink-0">
                  <img
                    src="/avatar/shivam_avatar.png"
                    alt="Shivam Shankhdhar"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white truncate">
                    Shivam Shankhdhar
                  </h3>
                  <p className="text-xs text-red-600 dark:text-red-400 font-medium truncate">
                    Full Stack & Mobile Engineer
                  </p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Available</span>
              </span>
            </div>

            {/* Email Address with Copy Button */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Direct Email
              </span>
              <div className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-slate-50/80 dark:bg-[#141520] border border-slate-200/80 dark:border-white/5">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
                    <FiMail className="h-4 w-4" />
                  </div>
                  <a
                    href={`mailto:${adminEmail || 's.shankhdhar1981@gmail.com'}`}
                    className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-400 truncate block transition"
                  >
                    {adminEmail || 's.shankhdhar1981@gmail.com'}
                  </a>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCopyEmail}
                  aria-label="Copy Email"
                  className="p-2 text-slate-400 hover:text-red-600 transition shrink-0 cursor-pointer"
                >
                  {copied ? <FiCheck className="h-4 w-4 text-emerald-500" /> : <FiCopy className="h-4 w-4" />}
                </motion.button>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Location & Timezone
              </span>
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50/80 dark:bg-[#141520] border border-slate-200/80 dark:border-white/5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
                  <FiMapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                    Delhi, India (IST)
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Available for Remote Worldwide & Relocation
                  </p>
                </div>
              </div>
            </div>

            {/* Turnaround Guarantee - Cohesive Themed Badge */}
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-red-500/5 dark:bg-red-950/20 border border-red-200/60 dark:border-red-900/30 text-xs">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
                <FiClock className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-200">
                  Fast Turnaround
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Guaranteed response within 12–24 business hours
                </p>
              </div>
            </div>

            {/* Social Channels */}
            <div className="pt-1 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Professional Networks
              </span>
              <div className="flex items-center gap-3">
                <motion.a
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href={profile?.githubUrl || 'https://github.com/shivamShankhdhar'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-[#141520] text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-red-500/50 hover:text-red-600 transition"
                >
                  <FiGithub className="h-4 w-4" />
                  <span>GitHub</span>
                </motion.a>

                <motion.a
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href={profile?.linkedinUrl || 'https://www.linkedin.com/in/shivam-shankhdhar'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-[#141520] text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-red-500/50 hover:text-red-600 transition"
                >
                  <FiLinkedin className="h-4 w-4" />
                  <span>LinkedIn</span>
                </motion.a>
              </div>
            </div>

          </div>
        </div>

        {/* Right Side: Sleek Direct Message Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="relative p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0f1017]/90 backdrop-blur-xl shadow-xl shadow-red-950/5 space-y-6 overflow-hidden transition-all duration-300 hover:border-red-500/30"
          >
            {/* Subtle glow accent */}
            <div className="absolute -top-16 -right-16 w-44 h-44 bg-gradient-to-br from-red-600/10 via-rose-600/5 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Send a Direct Message
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Fill in the details below and I'll reply promptly.
              </p>
            </div>

            {/* Quick Topic / Interest Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  What is this regarding? <span className="text-[11px] font-normal text-slate-400">(Optional)</span>
                </label>
                {selectedType && (
                  <button
                    type="button"
                    onClick={() => setSelectedType(null)}
                    className="text-[11px] text-red-500 hover:underline cursor-pointer"
                  >
                    Clear selection
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {projectTypes.map((type) => {
                  const isSelected = selectedType === type;
                  return (
                    <button
                      type="button"
                      key={type}
                      onClick={() => handleSelectType(type)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                        isSelected
                          ? 'bg-red-600 text-white shadow-sm shadow-red-600/30 border border-red-600 scale-102'
                          : 'bg-slate-100/90 dark:bg-[#151624] text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-white/5 hover:border-red-500/40 hover:text-red-500'
                      }`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Fields: Name and Email Side-by-Side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <FiUser className="h-3.5 w-3.5 text-red-500" />
                  <span>Your Name</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Shivam Shankhdhar"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-[#141520] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:border-red-500 text-sm transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <FiMail className="h-3.5 w-3.5 text-red-500" />
                  <span>Your Email Address</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-[#141520] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:border-red-500 text-sm transition"
                />
              </div>
            </div>

            {/* Message Area */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <FiMessageSquare className="h-3.5 w-3.5 text-red-500" />
                  <span>Project Details & Message</span>
                </label>
                <span className="text-[11px] text-slate-400">
                  {formData.message.length > 0 ? `${formData.message.length} chars` : ''}
                </span>
              </div>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your project requirements, timeline, tech preferences, or role details..."
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-[#141520] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:border-red-500 text-sm transition resize-none leading-relaxed"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl font-bold text-sm bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white shadow-lg shadow-red-600/25 hover:shadow-red-600/40 transition-all duration-200 disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending Message...
                </span>
              ) : (
                <>
                  <FiSend className="h-4 w-4" />
                  <span>Send Message</span>
                </>
              )}
            </motion.button>
          </form>
        </div>

      </div>

      {/* Footer & Back to Top */}
      <footer className="mt-20 pt-8 border-t border-slate-200/80 dark:border-red-950/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
        <p>
          &copy; {new Date().getFullYear()} Shivam Shankhdhar • Full Stack & Mobile Engineer.
        </p>

        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-red-950/40 bg-white/80 dark:bg-[#121218] hover:text-red-600 dark:hover:text-red-400 hover:border-red-500/50 transition shadow-xs cursor-pointer"
        >
          <span>Back to Top</span>
          <FiArrowUp className="h-3.5 w-3.5 text-red-500" />
        </motion.button>
      </footer>
    </section>
  );
}