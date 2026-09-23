'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMail,
  FiGlobe,
  FiPhone,
  FiMapPin,
  FiCheck,
  FiCopy,
  FiArrowRight,
  FiLoader,
  FiSmartphone,
  FiMaximize2,
  FiX,
} from 'react-icons/fi';
import { toast } from 'sonner';
import { createGradientQRCode } from '@/lib/qrGradient';

interface WorkTogetherSectionProps {
  profile?: {
    email?: string;
    portfolioUrl?: string;
    phone?: string;
    location?: string;
    available?: boolean;
  };
  adminEmail?: string;
  onOpenContact?: () => void;
}

export default function WorkTogetherSection({
  profile,
  adminEmail,
  onOpenContact,
}: WorkTogetherSectionProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Embedded QR Code State
  const [domain, setDomain] = useState<string>('');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const contactEmail = profile?.email || adminEmail || 's.shankhdhar1981@gmail.com';
  const portfolioUrl = profile?.portfolioUrl || 'https://shivamshankhdhar.dev';
  const phone = profile?.phone || '+91 8448967919';
  const location = profile?.location || 'Bareilly, Uttar Pradesh, India';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const browserOrigin = window.location.origin;
      setDomain(browserOrigin);

      createGradientQRCode(browserOrigin, {
        width: 340,
        margin: 1.5,
        dotsColor: '#000000',
      })
        .then((url) => setQrDataUrl(url))
        .catch((err) => console.error('Failed to generate Portfolio QR:', err));
    }
  }, []);

  const copyToClipboard = (text: string, label: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    toast.success(`${label} copied to clipboard!`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const contactItems = [
    {
      key: 'email',
      icon: FiMail,
      label: 'Email',
      value: contactEmail,
      href: `mailto:${contactEmail}`,
      isCopyable: true,
    },
    {
      key: 'web',
      icon: FiGlobe,
      label: 'Website',
      value: portfolioUrl.replace(/^https?:\/\//, ''),
      href: portfolioUrl,
      isExternal: true,
    },
    {
      key: 'phone',
      icon: FiPhone,
      label: 'Phone',
      value: phone,
      href: `tel:${phone.replace(/\s+/g, '')}`,
      isCopyable: true,
    },
    {
      key: 'location',
      icon: FiMapPin,
      label: 'Location',
      value: location,
      isCopyable: false,
    },
  ];

  return (
    <section id="contact" className="pt-6 pb-14 sm:pt-8 sm:pb-16 bg-[#07080b] text-white border-t border-white/5 relative isolate w-full max-w-full overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[600px] h-[300px] sm:h-[500px] bg-red-600/10 rounded-full blur-[120px] sm:blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* The 3-Column Showcase: Left: Intro & Modal Trigger, Middle: Contact Pills, Right: Embedded QR Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Heading, Subtitle & Action */}
          <div className="md:col-span-2 lg:col-span-4 space-y-5 text-center lg:text-left">
            <div>
              <h2 className="font-bebas text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase leading-[0.95] flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <span>LET&apos;S WORK</span>
                <span className="text-red-500">TOGETHER</span>
                <span className="text-rose-400">✦</span>
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium max-w-md mx-auto lg:mx-0">
              I&apos;m currently open for full-time engineering roles, mobile app contracts, and scalable backend consulting. Let&apos;s create something remarkable that drives real technical results.
            </p>

            <div className="pt-2 flex justify-center lg:justify-start">
              <button
                type="button"
                onClick={onOpenContact || (() => {
                  window.location.href = `mailto:${contactEmail}?subject=Software%20Collaboration`;
                })}
                className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-white/5 hover:bg-red-600 border border-white/10 hover:border-red-500 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-slate-200 hover:text-white transition-all group cursor-pointer max-w-full"
              >
                <span className="h-2 w-2 rounded-full bg-red-500 group-hover:bg-white animate-pulse shrink-0" />
                <span className="hidden sm:inline">AVAILABLE FOR FREELANCE / FULL-TIME</span>
                <span className="sm:hidden">AVAILABLE FOR HIRE</span>
                <FiArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 shrink-0" />
              </button>
            </div>
          </div>

          {/* Middle Column: Rounded Contact Pills */}
          <div className="md:col-span-1 lg:col-span-4 space-y-3">
            {contactItems.map((item) => {
              const Icon = item.icon;
              const isCopied = copiedKey === item.key;

              return (
                <div
                  key={item.key}
                  className="p-3.5 rounded-2xl bg-[#0f1017] border border-white/10 hover:border-red-500/40 transition-all flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-red-400 shrink-0 transition-colors">
                      <Icon className="h-4 w-4" />
                    </div>

                    <div className="min-w-0">
                      <span className="text-[10px] font-mono uppercase text-slate-500 tracking-wider block">
                        {item.label}
                      </span>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.isExternal ? '_blank' : undefined}
                          rel={item.isExternal ? 'noopener noreferrer' : undefined}
                          className="text-xs sm:text-sm font-mono font-bold text-white hover:text-red-400 truncate block transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-xs sm:text-sm font-mono font-bold text-white truncate block">
                          {item.value}
                        </span>
                      )}
                    </div>
                  </div>

                  {item.isCopyable && (
                    <button
                      onClick={() => copyToClipboard(item.value, item.label, item.key)}
                      className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors shrink-0 cursor-pointer"
                      title={`Copy ${item.label}`}
                    >
                      {isCopied ? <FiCheck className="h-4 w-4 text-emerald-400" /> : <FiCopy className="h-4 w-4" />}
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: High-End Embedded Portfolio QR Section */}
          <div className="md:col-span-1 lg:col-span-4 flex justify-center w-full">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-sm rounded-3xl bg-gradient-to-b from-[#12131c] via-[#0f1017] to-[#0a0a0f] border border-red-500/25 p-5 sm:p-6 text-white shadow-2xl shadow-red-950/30 relative overflow-hidden flex flex-col items-center group hover:border-red-500/45 transition-all"
            >
              {/* Subtle top red glow line */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-80" />
              <div className="absolute top-0 right-0 w-36 h-36 bg-red-600/10 rounded-full blur-2xl pointer-events-none" />

              {/* Card Header */}
              <div className="w-full flex items-center justify-between gap-2 pb-3.5 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                  </span>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-red-400">
                    PORTFOLIO QR CODE
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition cursor-pointer"
                  title="Enlarge QR Code"
                >
                  <FiMaximize2 className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* QR Container with Viewfinder Frame */}
              <div className="my-4 relative p-3 rounded-2xl bg-white shadow-xl shadow-red-950/20 group/qr">
                {/* Viewfinder corner accents */}
                <div className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 border-t-2 border-l-2 border-red-500 rounded-tl-sm pointer-events-none" />
                <div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 border-t-2 border-r-2 border-red-500 rounded-tr-sm pointer-events-none" />
                <div className="absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 border-b-2 border-l-2 border-red-500 rounded-bl-sm pointer-events-none" />
                <div className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 border-b-2 border-r-2 border-red-500 rounded-br-sm pointer-events-none" />

                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt="Portfolio QR Code"
                    className="w-40 h-40 sm:w-44 sm:h-44 object-contain transition-transform duration-300 group-hover/qr:scale-102"
                  />
                ) : (
                  <div className="w-40 h-40 sm:w-44 sm:h-44 bg-slate-100 flex items-center justify-center text-slate-400">
                    <FiLoader className="h-6 w-6 animate-spin text-red-500" />
                  </div>
                )}
              </div>

              {/* Mobile Scan Instruction */}
              <div className="text-center space-y-1 mb-4">
                <p className="text-xs font-semibold text-white flex items-center justify-center gap-1.5">
                  <FiSmartphone className="h-3.5 w-3.5 text-red-400" />
                  <span>Scan to open on your phone</span>
                </p>
                <p className="text-[11px] text-slate-400 max-w-[240px]">
                  Instant mobile access to projects, live apps, and contact details.
                </p>
              </div>

              {/* Copy URL Pill */}
              <div className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-[#151622] border border-white/10 hover:border-red-500/30 transition-colors">
                <div className="flex items-center gap-2 min-w-0">
                  <FiGlobe className="h-3.5 w-3.5 text-red-400 shrink-0" />
                  <span className="text-xs font-mono font-medium text-slate-300 truncate">
                    {domain ? domain.replace(/^https?:\/\//, '') : 'shivamshankhdhar.dev'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(domain || 'https://shivamshankhdhar.dev', 'Portfolio link', 'qr-domain')}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-md transition cursor-pointer shrink-0"
                  title="Copy link"
                >
                  {copiedKey === 'qr-domain' ? (
                    <FiCheck className="h-3.5 w-3.5 text-emerald-400" />
                  ) : (
                    <FiCopy className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Modal for Full-Size QR */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative max-w-sm w-full rounded-3xl bg-[#0f1017] border border-red-500/40 p-6 text-white shadow-2xl shadow-red-950/60 flex flex-col items-center space-y-4"
              >
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
                >
                  <FiX className="h-4 w-4" />
                </button>

                <div className="text-center pt-2">
                  <span className="text-[11px] font-mono font-bold text-red-400 uppercase tracking-wider block">
                    Interactive QR
                  </span>
                  <h4 className="text-lg font-bold text-white mt-1">
                    Scan to Share &amp; Connect
                  </h4>
                </div>

                <div className="p-4 rounded-2xl bg-white shadow-xl shadow-red-950/30">
                  <img
                    src={qrDataUrl}
                    alt="Full-Size Portfolio QR Code"
                    className="w-56 h-56 object-contain"
                  />
                </div>

                <p className="text-xs text-slate-400 font-mono text-center truncate max-w-full">
                  {domain}
                </p>

                <button
                  type="button"
                  onClick={() => copyToClipboard(domain, 'Portfolio Link', 'modal-copy')}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {copiedKey === 'modal-copy' ? <FiCheck className="h-4 w-4" /> : <FiCopy className="h-4 w-4" />}
                  <span>{copiedKey === 'modal-copy' ? 'Copied Link!' : 'Copy Portfolio Link'}</span>
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
