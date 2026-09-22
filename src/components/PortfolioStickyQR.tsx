'use client';

import React, { useState, useEffect } from 'react';
import { createGradientQRCode } from '@/lib/qrGradient';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSmartphone,
  FiCopy,
  FiCheck,
  FiGlobe,
  FiMaximize2,
  FiX,
  FiChevronDown,
  FiShare2,
} from 'react-icons/fi';
import { toast } from 'sonner';

export default function PortfolioStickyQR() {
  const [domain, setDomain] = useState<string>('');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Strictly extract the domain from the current browser window
      const browserOrigin = window.location.origin;
      setDomain(browserOrigin);

      // Check mobile viewport to minimize by default on small screens
      if (window.innerWidth < 640) {
        setIsMinimized(true);
      }

      // Generate QR Code with Hero Section linear gradient & crisp black dots
      createGradientQRCode(browserOrigin, {
        width: 340,
        margin: 1.5,
        gradientColors: ['#f43f5e', '#e11d48', '#881337'],
        dotsColor: '#000000',
      })
        .then((url) => {
          setQrDataUrl(url);
        })
        .catch((err) => {
          console.error('Failed to generate Portfolio QR code:', err);
        });
    }
  }, []);

  const handleCopy = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!domain) return;
    navigator.clipboard.writeText(domain);
    setCopied(true);
    toast.success('Portfolio link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  if (!domain) return null;

  const displayHost = domain.replace(/^https?:\/\//, '');

  return (
    <>
      {/* Sticky Bottom Floating QR Widget */}
      <aside
        aria-label="Sticky Portfolio QR Code"
        className="fixed bottom-20 right-3 sm:bottom-6 sm:right-6 z-40 pointer-events-auto"
      >
        <AnimatePresence mode="wait">
          {isMinimized ? (
            /* Minimized Trigger Pill */
            <motion.button
              key="minimized-pill"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMinimized(false)}
              className="group flex items-center gap-2 sm:gap-2.5 px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-2xl bg-gradient-to-br from-[#0c0d15] via-[#120e18] to-[#1a0c14] text-white border border-red-500/40 shadow-xl shadow-red-950/40 backdrop-blur-md cursor-pointer hover:border-red-400 transition-all"
              title="Open Portfolio QR Code"
            >
              <div className="relative flex items-center justify-center h-6 w-6 sm:h-7 sm:w-7 rounded-lg bg-white text-black shadow-sm overflow-hidden p-0.5">
                {qrDataUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={qrDataUrl}
                    alt="Portfolio QR preview"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <FiShare2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-900" />
                )}
                <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-500 border border-white" />
              </div>

              <div className="text-left pr-0.5 sm:pr-1">
                <p className="text-[9px] sm:text-[10px] uppercase font-mono tracking-wider text-red-400 font-bold leading-tight">
                  Share &amp; Scan
                </p>
                <p className="text-[11px] sm:text-xs font-bold text-white leading-tight">
                  Portfolio QR
                </p>
              </div>

              <span className="text-[10px] text-slate-400 group-hover:text-white transition-colors">
                ▲
              </span>
            </motion.button>
          ) : (
            /* Expanded Full QR Card */
            <motion.div
              key="expanded-card"
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="relative w-fit max-w-[170px] rounded-2xl bg-gradient-to-br from-[#0c0d15] via-[#120e18] to-[#1a0c14] border border-red-500/40 p-2.5 text-white shadow-2xl shadow-red-950/50 backdrop-blur-xl space-y-2"
            >
              {/* Header */}
              <div className="relative z-10 flex items-center justify-between gap-1">
                <div className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-red-400">
                    Portfolio QR
                  </span>
                </div>

                <div className="flex items-center gap-0.5">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
                    title="Enlarge QR Code"
                  >
                    <FiMaximize2 className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => setIsMinimized(true)}
                    className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
                    title="Minimize"
                  >
                    <FiChevronDown className="h-3 w-3" />
                  </button>
                </div>
              </div>

              {/* Clean Black and White QR Code Container */}
              <div
                onClick={() => setIsModalOpen(true)}
                className="group/qr relative p-1.5 rounded-xl bg-white shadow-md cursor-pointer transition-transform hover:scale-[1.02] flex items-center justify-center"
                title="Click to view fullscreen QR"
              >
                <div className="relative w-36 h-36 flex items-center justify-center">
                  {qrDataUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={qrDataUrl}
                      alt={`Portfolio QR Code for ${displayHost}`}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="text-xs text-slate-500 animate-pulse">Generating...</div>
                  )}
                </div>
              </div>

              {/* Domain & Quick Copy */}
              <div className="space-y-1.5 pt-0.5">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-300 bg-black/40 border border-white/5 rounded-lg px-2 py-1 overflow-hidden">
                  <div className="flex items-center gap-1 truncate">
                    <FiGlobe className="h-2.5 w-2.5 text-red-400 shrink-0" />
                    <span className="truncate" title={domain}>
                      {displayHost}
                    </span>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="shrink-0 text-slate-400 hover:text-white transition ml-1 cursor-pointer"
                    title="Copy Portfolio Link"
                  >
                    {copied ? (
                      <FiCheck className="h-3 w-3 text-emerald-400" />
                    ) : (
                      <FiCopy className="h-3 w-3" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </aside>

      {/* Enlarged Fullscreen QR Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative max-w-sm w-full rounded-3xl bg-gradient-to-br from-[#0c0d15] via-[#120e18] to-[#1a0c14] border border-red-500/40 p-6 sm:p-7 text-white shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition cursor-pointer"
            >
              <FiX className="h-5 w-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 pr-8">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-red-600 via-rose-600 to-red-700 flex items-center justify-center text-lg font-black text-white shadow-md shadow-red-600/30">
                SS
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white">Shivam Shankhdhar</h3>
                <p className="text-xs text-red-400 font-mono">Portfolio Live Link</p>
              </div>
            </div>

            {/* Clean Black and White Large QR Display */}
            <div className="p-4 rounded-2xl bg-white shadow-2xl flex flex-col items-center justify-center relative">
              <div className="relative w-56 h-56 flex items-center justify-center">
                {qrDataUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={qrDataUrl}
                    alt={`High-Res Portfolio QR Code for ${displayHost}`}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
            </div>

            {/* Scan Guidance */}
            <div className="text-center space-y-1">
              <p className="text-xs font-bold text-white flex items-center justify-center gap-1.5">
                <FiSmartphone className="h-3.5 w-3.5 text-emerald-400" />
                <span>Scan with any Phone Camera or Google Lens</span>
              </p>
              <p className="text-[11px] text-slate-400 font-mono truncate">
                {domain}
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={handleCopy}
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/10 transition cursor-pointer"
                title="Copy Portfolio Link"
              >
                {copied ? <FiCheck className="h-3.5 w-3.5 text-emerald-400" /> : <FiCopy className="h-3.5 w-3.5" />}
                <span>{copied ? 'Portfolio Link Copied!' : 'Copy Portfolio Link'}</span>
              </button>

              <button
                onClick={() => setIsModalOpen(false)}
                className="py-2.5 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white transition cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
