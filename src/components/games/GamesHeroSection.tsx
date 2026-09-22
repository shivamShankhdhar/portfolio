'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import QRCode from 'qrcode';
import {
  FiZap,
  FiCpu,
  FiShield,
  FiActivity,
  FiChevronRight,
  FiDownloadCloud,
  FiLayers,
  FiAward,
  FiSmartphone,
  FiCopy,
  FiCheck,
} from 'react-icons/fi';
import {
  FaGamepad,
  FaGooglePlay,
  FaStar,
  FaAndroid,
  FaDice,
  FaChessKnight,
  FaShieldHalved,
  FaBolt,
} from 'react-icons/fa6';
import { defaultApps } from '@/lib/defaultData';

interface GamesHeroSectionProps {
  games?: any[];
}

export default function GamesHeroSection({ games }: GamesHeroSectionProps) {
  const gameItems = games && games.length > 0 ? games : defaultApps;
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [deckMode, setDeckMode] = useState<'simulation' | 'qr'>('simulation');
  const [heroQrUrl, setHeroQrUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [diceValue, setDiceValue] = useState<number>(6);
  const [isRolling, setIsRolling] = useState<boolean>(false);

  const currentGame = gameItems[selectedIdx] || gameItems[0];
  const isLudo =
    currentGame.bannerType === 'ludo' ||
    (currentGame.title || '').toLowerCase().includes('ludo');

  const activePlayStoreUrl =
    currentGame.playStoreUrl ||
    'https://play.google.com/store/apps/details?id=' + (currentGame.package || 'chess.binge');

  useEffect(() => {
    QRCode.toDataURL(activePlayStoreUrl, {
      width: 280,
      margin: 1.5,
      color: {
        dark: '#0e0f18',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'H',
    })
      .then((url) => setHeroQrUrl(url))
      .catch((err) => console.error('Hero QR error', err));
  }, [activePlayStoreUrl]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(activePlayStoreUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRollDice = () => {
    if (isRolling) return;
    setIsRolling(true);
    let count = 0;
    const interval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
      count++;
      if (count > 7) {
        clearInterval(interval);
        setDiceValue(Math.floor(Math.random() * 6) + 1);
        setIsRolling(false);
      }
    }, 70);
  };

  return (
    <div id="hero" className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c0d15] via-[#120e18] to-[#1a0c14] text-white p-6 sm:p-9 lg:p-11 shadow-2xl border border-red-500/25">
      {/* Dynamic Ambient Neon Glows */}
      <div className="absolute -top-20 -right-20 w-[26rem] h-[26rem] bg-gradient-to-br from-red-600/25 to-rose-600/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute -bottom-24 -left-20 w-[24rem] h-[24rem] bg-gradient-to-tr from-rose-700/20 to-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Cybernetic Tech Grid Texture */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(239, 68, 68, 0.3) 1px, transparent 1px), linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
          backgroundSize: '24px 24px, 48px 48px',
        }}
      />

      <div className="relative z-10 space-y-8">
        {/* Top Control Bar: Studio Beacon & Dynamic Title Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-white/10">
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-red-500/15 text-red-400 border border-red-500/30 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            <span className="font-mono uppercase tracking-wider text-[11px]">Shivam Game Studios</span>
            <span className="text-slate-500">•</span>
            <span className="text-white font-medium">Production Android Engine</span>
          </div>

          {/* Interactive Game Switcher Tabs */}
          <div className="inline-flex p-1 rounded-2xl bg-[#09090f]/90 border border-white/10 backdrop-blur-xl max-w-full overflow-x-auto">
            {gameItems.map((g, idx) => {
              const isSelected = selectedIdx === idx;
              return (
                <button
                  key={g._id || g.id || idx}
                  onClick={() => setSelectedIdx(idx)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{g.icon || '🎮'}</span>
                  <span>{g.title}</span>
                  {g.version && (
                    <span className="hidden sm:inline text-[10px] opacity-80 font-mono">
                      {g.version}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Grid Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Headline, Narrative & Metric Cards */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-400">
                <FaBolt className="h-3 w-3" />
                <span>Zero Latency • Native 60 FPS • Signed AAB</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.15]">
                Engineered for <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-rose-300 to-amber-300">Competition</span>. Crafted for Mobile.
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                High-performance native Android games engineered by <strong className="text-white">Shivam Shankhdhar</strong> utilizing React Native &amp; Expo SDK, multi-depth AI decision engines, zero-latency offline board loops, and Google Play certified architecture.
              </p>
            </div>

            {/* Quick CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={activePlayStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 py-3 px-5 rounded-2xl text-xs sm:text-sm font-bold bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white shadow-xl shadow-red-600/30 hover:shadow-red-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                <FaGooglePlay className="h-4 w-4 text-emerald-300" />
                <span>Get {currentGame.title} on Play Store</span>
                <FiChevronRight className="h-3.5 w-3.5" />
              </a>

              <a
                href="#titles"
                className="inline-flex items-center gap-2 py-3 px-4 rounded-2xl text-xs sm:text-sm font-semibold border border-white/15 bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white transition-all shadow-xs"
              >
                <FaGamepad className="h-4 w-4 text-red-400" />
                <span>Compare Specs &amp; Highlights</span>
              </a>
            </div>

            {/* 4 Performance Metric Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md hover:border-red-500/40 transition-colors space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold">
                  <FiZap className="h-3.5 w-3.5" />
                  <span>Loop Rate</span>
                </div>
                <p className="text-xl font-black text-white font-mono">60 FPS</p>
                <p className="text-[10px] text-slate-400">&lt; 16ms frame times</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md hover:border-red-500/40 transition-colors space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-red-400 font-semibold">
                  <FiCpu className="h-3.5 w-3.5" />
                  <span>AI Latency</span>
                </div>
                <p className="text-xl font-black text-white font-mono">0 ms</p>
                <p className="text-[10px] text-slate-400">Offline bot threads</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md hover:border-red-500/40 transition-colors space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                  <FaAndroid className="h-3.5 w-3.5" />
                  <span>Packaging</span>
                </div>
                <p className="text-xl font-black text-white font-mono">Signed</p>
                <p className="text-[10px] text-slate-400">Play Console AAB</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md hover:border-red-500/40 transition-colors space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold">
                  <FaStar className="h-3.5 w-3.5" />
                  <span>Player Score</span>
                </div>
                <p className="text-xl font-black text-white font-mono">{currentGame.rating || '4.9'} ★</p>
                <p className="text-[10px] text-slate-400">{currentGame.ratingCount || 'Verified reviews'}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Holographic Gaming Pod Console */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl border border-red-500/40 bg-gradient-to-b from-[#131422] to-[#090a12] p-5 sm:p-6 shadow-2xl space-y-5 overflow-hidden">
              
              {/* Top Pod HUD Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                <div className="flex items-center gap-2 font-mono">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold text-white tracking-wider">HOLOGRAPHIC DECK</span>
                </div>
                
                {/* Mode Switcher: HUD simulation vs QR Scanner */}
                <div className="flex items-center gap-1 p-0.5 rounded-xl bg-black/40 border border-white/10 text-[11px] font-mono">
                  <button
                    onClick={() => setDeckMode('simulation')}
                    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                      deckMode === 'simulation'
                        ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    HUD View
                  </button>
                  <button
                    onClick={() => setDeckMode('qr')}
                    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                      deckMode === 'qr'
                        ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <FiSmartphone className="h-3 w-3" />
                    <span>Scan QR</span>
                  </button>
                </div>
              </div>

              {/* Dynamic View: QR Scanner Mode */}
              {deckMode === 'qr' ? (
                <div className="space-y-4 py-1 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-xl shadow-xs">
                        {currentGame.icon || '🎮'}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">
                          {currentGame.title} QR
                        </h4>
                        <p className="text-[11px] text-slate-400 font-mono">
                          {currentGame.package} • Google Play
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      Camera Ready
                    </span>
                  </div>

                  {/* Modern QR Viewfinder */}
                  <div className="relative p-3 rounded-2xl bg-[#090a12] border border-white/10 flex flex-col items-center justify-center space-y-2.5">
                    <div className="relative p-2 rounded-xl bg-white shadow-xl flex items-center justify-center">
                      {/* Viewfinder laser corners */}
                      <span className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-red-500 rounded-tl-sm pointer-events-none" />
                      <span className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-red-500 rounded-tr-sm pointer-events-none" />
                      <span className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-red-500 rounded-bl-sm pointer-events-none" />
                      <span className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-red-500 rounded-br-sm pointer-events-none" />

                      <div className="relative w-40 h-40 flex items-center justify-center">
                        {heroQrUrl && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={heroQrUrl}
                            alt="Play Store QR"
                            className="w-full h-full object-contain rounded-lg"
                          />
                        )}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="h-9 w-9 rounded-lg bg-white border border-slate-300 shadow-md flex items-center justify-center text-base font-bold">
                            {currentGame.icon || '🎮'}
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-300 text-center flex items-center gap-1.5 font-medium">
                      <FiSmartphone className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span>Point your phone camera to download directly</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyLink}
                      className="flex-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-slate-200 hover:text-white border border-white/10 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {copied ? <FiCheck className="h-3.5 w-3.5 text-emerald-400" /> : <FiCopy className="h-3.5 w-3.5" />}
                      <span>{copied ? 'Copied Link!' : 'Copy Store URL'}</span>
                    </button>
                    <a
                      href={activePlayStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-xs font-bold text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <FaGooglePlay className="h-3 w-3" />
                      <span>Open Link</span>
                    </a>
                  </div>
                </div>
              ) : isLudo ? (
                <div className="space-y-4">
                  {/* Title & Multiplayer Specs */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-amber-600/30 via-red-500/20 to-amber-800/40 border border-amber-500/40 flex items-center justify-center text-2xl shadow-md">
                        {currentGame.icon || '🎲'}
                      </div>
                      <div>
                        <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                          {currentGame.title}
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
                            {currentGame.status || 'Play Store Ready'}
                          </span>
                        </h3>
                        <p className="text-xs text-slate-400 font-mono">
                          package: {currentGame.package} • {currentGame.version || 'v1.0.0'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Dice Roller Simulation Widget */}
                  <div className="rounded-2xl bg-[#0b0c14] border border-white/10 p-4 space-y-3 text-center">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span className="text-amber-400 flex items-center gap-1.5 font-bold">
                        <FaDice className="h-3.5 w-3.5" />
                        Physics Dice Arena
                      </span>
                      <span className="text-emerald-400">60 FPS Native Loop</span>
                    </div>

                    {/* Interactive Animated Dice Cube */}
                    <div className="py-2 flex flex-col items-center justify-center gap-2">
                      <div
                        className={`h-16 w-16 rounded-2xl bg-gradient-to-br from-amber-500 to-red-600 text-white flex items-center justify-center text-3xl font-black shadow-lg shadow-amber-600/30 border-2 border-white/20 select-none transition-transform duration-200 ${
                          isRolling ? 'rotate-180 scale-110' : 'hover:scale-105'
                        }`}
                      >
                        {diceValue === 1 && '⚀'}
                        {diceValue === 2 && '⚁'}
                        {diceValue === 3 && '⚂'}
                        {diceValue === 4 && '⚃'}
                        {diceValue === 5 && '⚄'}
                        {diceValue === 6 && '⚅'}
                      </div>

                      <button
                        onClick={handleRollDice}
                        disabled={isRolling}
                        className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-xs font-bold text-white border border-white/20 transition-all cursor-pointer inline-flex items-center gap-1.5"
                      >
                        <span>{isRolling ? 'Rolling...' : 'Click to Test Dice Roll'}</span>
                      </button>
                    </div>

                    {/* 4 Player Arena Base Lights */}
                    <div className="flex items-center justify-center gap-3 pt-1">
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-red-400">
                        <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
                        P1 Red
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        P2 Green
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-amber-400">
                        <span className="h-2 w-2 rounded-full bg-amber-400" />
                        P3 Yellow
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-sky-400">
                        <span className="h-2 w-2 rounded-full bg-sky-500" />
                        P4 Blue
                      </span>
                    </div>
                  </div>

                  {/* Multiplayer Feature Highlights */}
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2 rounded-xl bg-white/5 border border-white/5 text-slate-300 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                      <span>Real-Time WebSockets</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white/5 border border-white/5 text-slate-300 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                      <span>Zero-Latency AI Bots</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Title & Engine Specs */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-red-600/30 via-rose-500/20 to-red-800/40 border border-red-500/40 flex items-center justify-center text-2xl shadow-md">
                        {currentGame.icon || '♟️'}
                      </div>
                      <div>
                        <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                          {currentGame.title}
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            {currentGame.status || 'Live on Play Store'}
                          </span>
                        </h3>
                        <p className="text-xs text-slate-400 font-mono">
                          package: {currentGame.package} • {currentGame.version || 'v2.0.2'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tactical Mini-Board Preview Widget */}
                  <div className="rounded-2xl bg-[#0b0c14] border border-white/10 p-3.5 space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span className="text-amber-400 flex items-center gap-1.5 font-bold">
                        <FaChessKnight className="h-3 w-3" />
                        Tactical Board Engine
                      </span>
                      <span className="text-emerald-400">Depth: 18 Ply</span>
                    </div>

                    {/* Mini 4x4 Chess Board Representation */}
                    <div className="grid grid-cols-4 gap-1 p-1.5 rounded-xl bg-black/40 border border-white/5 max-w-[200px] mx-auto">
                      {['♜', '', '♝', '♚', '', '♘', '♟', '', '♙', '♕', '', '♙', '', '', '♔', ''].map((piece, idx) => {
                        const isEven = (Math.floor(idx / 4) + (idx % 4)) % 2 === 0;
                        const isHighlighted = idx === 5 || idx === 9; // Knight tactical focus
                        return (
                          <div
                            key={idx}
                            className={`h-9 flex items-center justify-center text-lg font-bold rounded-md select-none transition-all ${
                              isHighlighted
                                ? 'bg-red-600/40 text-amber-300 border border-red-500/60 shadow-xs'
                                : isEven
                                ? 'bg-white/10 text-white'
                                : 'bg-white/5 text-slate-300'
                            }`}
                          >
                            {piece}
                          </div>
                        );
                      })}
                    </div>

                    {/* Stockfish Engine Evaluation Bar */}
                    <div className="space-y-1 pt-1">
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                        <span>Advantage White</span>
                        <span className="text-emerald-400 font-bold">+2.4 Eval</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden flex">
                        <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full w-[68%]" />
                        <div className="bg-slate-700 h-full w-[32%]" />
                      </div>
                    </div>
                  </div>

                  {/* Engine Feature Highlights */}
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2 rounded-xl bg-white/5 border border-white/5 text-slate-300 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                      <span>FIDE Validation</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white/5 border border-white/5 text-slate-300 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      <span>FEN Board State</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Console Action Link */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                <Link
                  href={currentGame.privacyUrl || '/mobile-apps/games/privacy-policy/chess-binge'}
                  className="inline-flex items-center gap-1.5 text-slate-400 hover:text-red-400 transition-colors"
                >
                  <FiShield className="h-3.5 w-3.5" />
                  <span>Privacy Policy &amp; Safety</span>
                </Link>

                <a
                  href={activePlayStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-bold text-red-400 hover:text-red-300 transition-colors"
                >
                  <span>Play Store Link</span>
                  <FiChevronRight className="h-3 w-3" />
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* Studio Telemetry Ribbon */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-400">
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-slate-300">
              <FaAndroid className="h-3.5 w-3.5 text-emerald-400" />
              <span>Android API 26 to API 35+</span>
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5 text-slate-300">
              <FaShieldHalved className="h-3.5 w-3.5 text-red-400" />
              <span>ProGuard Obfuscated &amp; Hardened</span>
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5 text-slate-300">
              <FiLayers className="h-3.5 w-3.5 text-amber-400" />
              <span>React Native 0.86 • Expo SDK 57</span>
            </span>
          </div>

          <div className="text-slate-400">
            Official Developer Studio: <span className="text-white font-semibold">Shivam Shankhdhar</span>
          </div>
        </div>

      </div>
    </div>
  );
}
