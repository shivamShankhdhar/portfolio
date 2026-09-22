'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiX,
  FiUser,
  FiMail,
  FiMessageSquare,
  FiSend,
  FiLoader,
  FiCheckCircle,
  FiZap,
} from 'react-icons/fi';
import { toast } from 'sonner';

interface ContactDialogProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTopic?: string;
}

const inquiryTopics = [
  'Full-Time Engineering Role',
  'Mobile App Development',
  'Java / Spring Boot Backend',
  'Full Stack Web Project',
  'Consulting & Architecture',
];

export default function ContactDialog({
  isOpen,
  onClose,
  defaultTopic = 'Full-Time Engineering Role',
}: ContactDialogProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [selectedTopic, setSelectedTopic] = useState<string>(defaultTopic);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error('Please fill in your name, email, and message.');
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
          topic: selectedTopic,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSubmitted(true);
      toast.success('Message sent successfully! 🚀', {
        description: 'Thank you for reaching out. I will get back to you shortly.',
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (err: any) {
      toast.error('Failed to send message', {
        description: err.message || 'Please reach out directly via email.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop with animated fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container with animated spring scale & slide */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-xl rounded-3xl bg-[#0c0d14]/95 border border-red-500/30 backdrop-blur-2xl p-6 sm:p-8 text-white shadow-2xl shadow-red-950/50 z-10 overflow-hidden my-auto"
          >
            {/* Ambient Card Glows */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-rose-600/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent" />

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 hover:border-red-500/40 transition-all cursor-pointer z-20"
              title="Close modal"
            >
              <FiX className="h-4 w-4" />
            </button>

            {submitted ? (
              /* Success State */
              <div className="py-8 text-center space-y-4 relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 15 }}
                  className="h-16 w-16 mx-auto rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400"
                >
                  <FiCheckCircle className="h-8 w-8" />
                </motion.div>
                <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide">
                  MESSAGE RECEIVED!
                </h3>
                <p className="text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out regarding freelance &amp; project opportunities. I will review your requirements and respond promptly.
                </p>
                <div className="pt-4 flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleResetAndClose}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 hover:from-red-500 hover:to-rose-500 transition-all cursor-pointer"
                  >
                    Done
                  </button>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-semibold transition-all cursor-pointer"
                  >
                    Send Another
                  </button>
                </div>
              </div>
            ) : (
              /* Form State */
              <div className="space-y-6 relative z-10">
                {/* Header */}
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider text-red-400 bg-red-950/50 border border-red-500/20 mb-2 uppercase">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span>Available For Freelance &amp; Roles</span>
                  </div>
                  <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide">
                    LET&apos;S WORK TOGETHER
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Fill out the form below to kickstart our collaboration.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Topic Chips */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                      Select Project Type
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {inquiryTopics.map((topic) => {
                        const isSelected = selectedTopic === topic;
                        return (
                          <button
                            key={topic}
                            type="button"
                            onClick={() => setSelectedTopic(topic)}
                            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-red-600 text-white font-bold shadow-md shadow-red-600/30 border border-red-500'
                                : 'bg-[#151622] text-slate-300 hover:text-white border border-white/5 hover:border-white/15'
                            }`}
                          >
                            {topic}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="John Doe"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#141520] border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                        Your Email <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@example.com"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#141520] border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiMessageSquare className="absolute left-3.5 top-3 h-3.5 w-3.5 text-slate-500" />
                      <textarea
                        required
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell me about project scope, goals, stack, or timeline..."
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#141520] border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all resize-y min-h-[85px]"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex items-center justify-between gap-3">
                    <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                      <FiZap className="h-3 w-3 text-red-400" />
                      <span>Direct to Shivam</span>
                    </span>

                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 hover:shadow-red-600/50 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <FiLoader className="h-3.5 w-3.5 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <FiSend className="h-3.5 w-3.5" />
                          <span>Send Inquiry</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
