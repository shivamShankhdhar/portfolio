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
  FiUser,
  FiMessageSquare,
  FiClock,
} from 'react-icons/fi';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface ContactFormClientProps {
  adminEmail: string;
  githubUrl: string;
  linkedinUrl: string;
}

const topics = [
  'Full-Time Engineering Role',
  'Mobile App Development',
  'Java / Spring Boot Backend',
  'Full Stack Web Project',
  'Consulting & Architecture',
  'General Inquiry',
];

export default function ContactFormClient({
  adminEmail,
  githubUrl,
  linkedinUrl,
}: ContactFormClientProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(adminEmail);
    setCopied(true);
    toast.success('Email copied to clipboard!', {
      description: adminEmail,
    });
    setTimeout(() => setCopied(false), 2000);
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
          topic: selectedTopic || undefined,
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
      setSelectedTopic(null);
    } catch (err: any) {
      toast.error('Failed to send message', {
        description: err.message || 'Please try emailing directly at ' + adminEmail,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Direct Info Card */}
      <div className="lg:col-span-5 space-y-6">
        <div className="relative p-6 sm:p-7 rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0f1017]/90 backdrop-blur-xl shadow-xl shadow-red-950/5 space-y-6 overflow-hidden">
          
          <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100 dark:border-white/5">
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

          {/* Email Info */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Direct Contact Email
            </span>
            <div className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-slate-50/80 dark:bg-[#141520] border border-slate-200/80 dark:border-white/5">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
                  <FiMail className="h-4 w-4" />
                </div>
                <a
                  href={`mailto:${adminEmail}`}
                  className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-400 truncate block transition"
                >
                  {adminEmail}
                </a>
              </div>

              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label="Copy Email"
                className="p-2 text-slate-400 hover:text-red-600 transition shrink-0 cursor-pointer"
              >
                {copied ? <FiCheck className="h-4 w-4 text-emerald-500" /> : <FiCopy className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Location & Timezone */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Location & Availability
            </span>
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50/80 dark:bg-[#141520] border border-slate-200/80 dark:border-white/5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
                <FiMapPin className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Delhi, India (IST / UTC+5:30)
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Available for Remote Worldwide & Hybrid Roles
                </p>
              </div>
            </div>
          </div>

          {/* Turnaround Note */}
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-red-500/5 dark:bg-red-950/20 border border-red-200/60 dark:border-red-900/30 text-xs">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
              <FiClock className="h-4 w-4" />
            </div>
            <div>
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                Prompt Response
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Direct reply within 12–24 business hours
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="pt-1 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Social & Code Repositories
            </span>
            <div className="flex items-center gap-3">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-[#141520] text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-red-500/50 hover:text-red-600 transition"
              >
                <FiGithub className="h-4 w-4" />
                <span>GitHub</span>
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-[#141520] text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-red-500/50 hover:text-red-600 transition"
              >
                <FiLinkedin className="h-4 w-4" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Right Column: Contact Form */}
      <div className="lg:col-span-7">
        <form
          onSubmit={handleSubmit}
          className="relative p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0f1017]/90 backdrop-blur-xl shadow-xl shadow-red-950/5 space-y-6 overflow-hidden"
        >
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Send a Direct Message
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Fill out the form below. Zero data is shared or sold.
            </p>
          </div>

          {/* Topics Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              Topic / Area of Interest <span className="text-[11px] font-normal text-slate-400">(Optional)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {topics.map((t) => {
                const isSelected = selectedTopic === t;
                return (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setSelectedTopic(isSelected ? null : t)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                      isSelected
                        ? 'bg-red-600 text-white shadow-sm shadow-red-600/30 border border-red-600'
                        : 'bg-slate-100 dark:bg-[#151624] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/5 hover:border-red-500/40 hover:text-red-500'
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Name & Email */}
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

          {/* Message textarea */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <FiMessageSquare className="h-3.5 w-3.5 text-red-500" />
                <span>Message & Inquiries</span>
              </label>
            </div>
            <textarea
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell me about your role, project requirements, timeline, or engineering ideas..."
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-[#141520] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:border-red-500 text-sm transition resize-none leading-relaxed"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl font-bold text-sm bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white shadow-lg shadow-red-600/25 transition disabled:opacity-60 cursor-pointer"
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
          </button>
        </form>
      </div>
    </div>
  );
}
