'use client';

import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { FiSmartphone, FiMaximize2, FiX, FiCheck, FiCopy, FiExternalLink } from 'react-icons/fi';
import { FaGooglePlay, FaAndroid } from 'react-icons/fa6';

interface GameCardQRCodeProps {
  url: string;
  gameTitle: string;
  packageName: string;
  gameIcon: string;
  accentColor?: 'red' | 'amber';
}

export default function GameCardQRCode({
  url,
  gameTitle,
  packageName,
  gameIcon,
  accentColor = 'red',
}: GameCardQRCodeProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    QRCode.toDataURL(url, {
      width: 320,
      margin: 1.5,
      color: {
        dark: '#0f1017',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'H',
    })
      .then((dataUrl) => {
        setQrDataUrl(dataUrl);
      })
      .catch((err) => {
        console.error('Failed to generate QR code', err);
      });
  }, [url]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isAmber = accentColor === 'amber';
  const borderColor = isAmber ? 'border-amber-500/40' : 'border-red-500/40';
  const cornerColor = isAmber ? 'border-amber-400' : 'border-red-500';
  const badgeBg = isAmber
    ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
    : 'bg-red-500/15 text-red-300 border-red-500/30';
  const glowShadow = isAmber ? 'shadow-amber-500/10' : 'shadow-red-500/10';

  return (
    <div className="w-full">
      {/* Modern QR Scan Card Block */}
      <div className={`relative overflow-hidden rounded-2xl p-4 bg-slate-900/95 dark:bg-[#0c0d16] text-white border ${borderColor} shadow-lg ${glowShadow} transition-all`}>
        {/* Subtle glowing ambient gradient behind QR */}
        <div
          className={`absolute -top-10 -left-10 w-32 h-32 rounded-full blur-2xl pointer-events-none ${
            isAmber ? 'bg-amber-600/15' : 'bg-red-600/15'
          }`}
        />

        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4">
          
          {/* QR Code Viewfinder Container */}
          <div
            onClick={() => setIsModalOpen(true)}
            className="group/qr relative shrink-0 p-2.5 rounded-2xl bg-white cursor-pointer shadow-md transition-transform duration-200 hover:scale-105 active:scale-95"
            title="Click to enlarge QR code"
          >
            {/* Viewfinder Laser Corner Accents */}
            <span className={`absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 ${cornerColor} rounded-tl-sm pointer-events-none`} />
            <span className={`absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 ${cornerColor} rounded-tr-sm pointer-events-none`} />
            <span className={`absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 ${cornerColor} rounded-bl-sm pointer-events-none`} />
            <span className={`absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 ${cornerColor} rounded-br-sm pointer-events-none`} />

            {/* QR Image with Center Emblem */}
            <div className="relative w-28 h-28 flex items-center justify-center">
              {qrDataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={qrDataUrl}
                  alt={`QR Code for ${gameTitle}`}
                  className="w-full h-full object-contain rounded-lg"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs animate-pulse">
                  Generating...
                </div>
              )}

              {/* Center Game Emblem Overlay */}
              {qrDataUrl && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="h-7 w-7 rounded-lg bg-white border border-slate-300 shadow-md flex items-center justify-center text-sm font-bold">
                    <span>{gameIcon}</span>
                  </div>
                </div>
              )}

              {/* Hover Enlarge Hint Overlay */}
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] opacity-0 group-hover/qr:opacity-100 rounded-lg flex items-center justify-center transition-opacity text-white text-[11px] font-bold gap-1">
                <FiMaximize2 className="h-3.5 w-3.5 text-white" />
                <span>Enlarge</span>
              </div>
            </div>
          </div>

          {/* Instructions & Metadata */}
          <div className="space-y-2 flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border ${badgeBg}`}>
                <FaAndroid className="h-2.5 w-2.5" />
                <span>Instant Android Scan</span>
              </span>

              <span className="text-[11px] font-mono text-slate-400">
                Play Store
              </span>
            </div>

            <div className="space-y-0.5">
              <h4 className="text-sm font-bold text-white flex items-center justify-center sm:justify-start gap-1.5">
                <FiSmartphone className="h-4 w-4 text-emerald-400" />
                <span>Scan to Install on Phone</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Scan with any Android Camera or Google Lens to instantly open the verified store page.
              </p>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-3 pt-1">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-400 hover:text-red-300 cursor-pointer transition-colors"
              >
                <FiMaximize2 className="h-3 w-3" />
                <span>View Fullscreen QR</span>
              </button>

              <span className="text-slate-600">•</span>

              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white cursor-pointer transition-colors"
              >
                {copied ? <FiCheck className="h-3 w-3 text-emerald-400" /> : <FiCopy className="h-3 w-3" />}
                <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Enlarged QR Code Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative max-w-sm w-full rounded-3xl bg-[#0e0f19] border border-red-500/40 p-6 sm:p-7 text-white shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <FiX className="h-5 w-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 pr-8">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-red-500/20 to-rose-600/20 border border-red-500/40 flex items-center justify-center text-2xl shadow-sm">
                {gameIcon}
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white">{gameTitle}</h3>
                <p className="text-xs text-slate-400 font-mono">package: {packageName}</p>
              </div>
            </div>

            {/* Big High-Res QR Code */}
            <div className="p-4 rounded-2xl bg-white shadow-xl flex flex-col items-center justify-center relative">
              {/* Corner brackets */}
              <span className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-red-600 pointer-events-none" />
              <span className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-red-600 pointer-events-none" />
              <span className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-red-600 pointer-events-none" />
              <span className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-red-600 pointer-events-none" />

              <div className="relative w-56 h-56 flex items-center justify-center">
                {qrDataUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={qrDataUrl}
                    alt={`High-Res QR Code for ${gameTitle}`}
                    className="w-full h-full object-contain rounded-xl"
                  />
                )}
                {/* Center Badge */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="h-11 w-11 rounded-xl bg-white border border-slate-300 shadow-xl flex items-center justify-center text-xl font-bold">
                    <span>{gameIcon}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Scan Guidance Text */}
            <div className="text-center space-y-1">
              <p className="text-xs font-bold text-white flex items-center justify-center gap-1.5">
                <FiSmartphone className="h-3.5 w-3.5 text-emerald-400" />
                <span>Point Camera or Google Lens to Scan</span>
              </p>
              <p className="text-[11px] text-slate-400">
                Directly opens the certified Google Play Store listing on your Android device.
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={handleCopyLink}
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors cursor-pointer"
              >
                {copied ? <FiCheck className="h-3.5 w-3.5 text-emerald-400" /> : <FiCopy className="h-3.5 w-3.5" />}
                <span>{copied ? 'Copied Link!' : 'Copy Play Store URL'}</span>
              </button>

              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white transition-colors cursor-pointer"
              >
                <FaGooglePlay className="h-3 w-3" />
                <span>Open URL</span>
                <FiExternalLink className="h-3 w-3" />
              </a>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
