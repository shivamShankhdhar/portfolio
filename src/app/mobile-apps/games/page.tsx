import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FiShield,
  FiGlobe,
  FiSmartphone,
  FiCheckCircle,
  FiZap,
  FiChevronRight,
  FiLayers,
} from 'react-icons/fi';
import { FaStar, FaGooglePlay } from 'react-icons/fa6';
import GamesHeroSection from '@/components/games/GamesHeroSection';
import GameCardQRCode from '@/components/games/GameCardQRCode';
import connectDB, { isDbConfigured } from '@/lib/db';
import App from '@/models/App';
import { defaultApps } from '@/lib/defaultData';

export const metadata: Metadata = {
  title: 'Mobile Games - Chess Binge & Ludo Binge | Shivam Shankhdhar',
  description:
    'Explore production Android mobile games developed by Shivam Shankhdhar: Chess Binge (Grandmaster AI engine) and Ludo Binge (real-time multiplayer board game).',
  keywords: [
    'Chess Binge',
    'Ludo Binge',
    'Mobile Games',
    'Android Games',
    'React Native Games',
    'Expo Games',
    'Google Play Games',
    'Shivam Shankhdhar',
  ],
};

async function getGames() {
  try {
    if (isDbConfigured()) {
      await connectDB();
      const apps = await App.find({
        category: { $regex: /^games$/i },
      }).sort({ order: 1, createdAt: -1 });

      if (apps && apps.length > 0) {
        return JSON.parse(JSON.stringify(apps));
      }
    }
  } catch (error) {
    console.error('Error loading games from DB:', error);
  }

  // Fallback to default 2 production games if DB is empty or unconfigured
  return defaultApps.filter((a) => (a.category || '').toLowerCase() === 'games');
}

export default async function MobileGamesPage() {
  const games = await getGames();

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#09090d] text-slate-800 dark:text-slate-200 font-sans py-10 sm:py-16 px-4 sm:px-6 lg:px-8 bg-developer-grid bg-radial-gradient">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Top Navigation & Breadcrumbs */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[#12131c] text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 hover:border-red-500/40 transition-all shadow-xs"
          >
            <FiGlobe className="h-3.5 w-3.5 text-red-500" />
            <span>Developer&apos;s Website</span>
          </Link>

          <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 text-xs">
            <Link href="/" className="hover:text-red-500 transition-colors">Home</Link>
            <FiChevronRight className="h-3 w-3" />
            <span>Mobile Apps</span>
            <FiChevronRight className="h-3 w-3" />
            <span className="text-slate-800 dark:text-slate-200 font-semibold">Games Hub</span>
          </div>
        </div>

        {/* Ultra-Attractive Hero Section with Dynamic Games Prop */}
        <GamesHeroSection games={games} />

        {/* Featured Games Grid */}
        <div id="titles" className="space-y-8 scroll-mt-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-600" />
                <span>Production Android Titles</span>
                <span className="text-xs font-normal font-mono px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-500 dark:text-red-400 border border-red-500/20">
                  {games.length} {games.length === 1 ? 'Title' : 'Titles'}
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Optimized with signed Android AABs, ProGuard bytecode compression, and Google AdMob monetization.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {games.map((game: any) => (
              <div
                key={game._id || game.id || game.package}
                className="relative flex flex-col justify-between rounded-3xl border border-slate-200/90 dark:border-white/10 bg-white/95 dark:bg-[#0f1018]/95 backdrop-blur-2xl shadow-xl shadow-red-950/5 hover:border-red-500/50 hover:shadow-2xl hover:shadow-red-600/10 transition-all duration-300 group overflow-hidden"
              >
                {/* Visual Game Card Banner */}
                <div className={`relative h-44 sm:h-48 overflow-hidden p-6 flex flex-col justify-between text-white ${
                  game.bannerType === 'chess'
                    ? 'bg-gradient-to-br from-[#1a1215] via-[#241318] to-[#120b0d]'
                    : game.bannerType === 'ludo'
                    ? 'bg-gradient-to-br from-[#131726] via-[#1a1324] to-[#160c16]'
                    : 'bg-gradient-to-br from-[#1c121f] via-[#151221] to-[#0e0c15]'
                }`}>
                  {/* Grid Texture */}
                  <div
                    className="absolute inset-0 opacity-15 pointer-events-none"
                    style={{
                      backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)`,
                      backgroundSize: '16px 16px',
                    }}
                  />

                  {/* Ambient Glow */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-600/25 rounded-full blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />

                  {/* Banner Top Row */}
                  <div className="relative z-10 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-black/40 backdrop-blur-md text-red-400 border border-red-500/30">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                      <span>{game.status || 'Play Store Ready'}</span>
                    </span>

                    {game.rating && (
                      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-black/40 backdrop-blur-md text-amber-300 border border-amber-500/30">
                        <FaStar className="h-3 w-3 text-amber-400 fill-current" />
                        <span>{game.rating}</span>
                        {game.ratingCount && (
                          <span className="text-slate-400 font-normal ml-0.5">({game.ratingCount})</span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Banner Center Title & Visual Identity */}
                  <div className="relative z-10 flex items-end justify-between">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-md">
                        {game.title}
                      </h3>
                      {game.subtitle && (
                        <p className="text-xs font-semibold text-red-400 drop-shadow-xs">
                          {game.subtitle}
                        </p>
                      )}
                    </div>

                    <div className="h-16 w-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-4xl shadow-inner group-hover:scale-110 transition-transform duration-300">
                      {game.icon || '🎮'}
                    </div>
                  </div>
                </div>

                {/* Card Content Area */}
                <div className="p-6 sm:p-7 space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-5">
                    {/* Description Tagline */}
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {game.tagline}
                    </p>

                    {/* Feature Specs Matrix */}
                    {game.features && game.features.length > 0 && (
                      <div className="grid grid-cols-2 gap-2.5 p-3.5 rounded-2xl bg-slate-50/80 dark:bg-[#141522] border border-slate-200/70 dark:border-white/5 text-xs">
                        {game.features.map((feat: any) => (
                          <div key={feat.label} className="space-y-0.5">
                            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">
                              {feat.label}
                            </span>
                            <p className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                              {feat.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Engineering Highlights */}
                    {game.highlights && game.highlights.length > 0 && (
                      <div className="space-y-2.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                          <FiCheckCircle className="h-3.5 w-3.5 text-red-500" />
                          <span>Key Engineering Highlights</span>
                        </span>
                        <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                          {game.highlights.map((item: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5 shrink-0 shadow-xs" />
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tech Stack Chips */}
                    {game.technologies && game.technologies.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                          Built With
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {game.technologies.map((tech: string) => (
                            <span
                              key={tech}
                              className="px-2.5 py-0.5 rounded-lg text-[11px] font-semibold bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-white/5"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Modern QR Scan Section */}
                    <div className="pt-2">
                      <GameCardQRCode
                        url={game.playStoreUrl || 'https://play.google.com/store/apps'}
                        gameTitle={game.title}
                        packageName={game.package}
                        gameIcon={game.icon || '🎮'}
                        accentColor={game.bannerType === 'chess' ? 'red' : 'amber'}
                      />
                    </div>

                  </div>

                  {/* Bottom Actions: Download on Google Play & Privacy Policy */}
                  <div className="pt-6 mt-4 border-t border-slate-100 dark:border-white/5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    {game.playStoreUrl && (
                      <a
                        href={game.playStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2.5 py-3 px-5 rounded-2xl text-xs sm:text-sm font-bold bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white shadow-lg shadow-red-600/25 hover:shadow-red-600/40 transition-all duration-200 cursor-pointer"
                      >
                        <FaGooglePlay className="h-4 w-4 shrink-0" />
                        <span>Download on Google Play</span>
                      </a>
                    )}

                    {game.privacyUrl && (
                      <Link
                        href={game.privacyUrl}
                        className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-xs sm:text-sm font-semibold border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#141520] text-slate-700 dark:text-slate-300 hover:border-red-500/40 hover:text-red-500 transition-all shadow-xs cursor-pointer shrink-0"
                      >
                        <FiShield className="h-4 w-4 text-red-500" />
                        <span>Privacy Policy</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture & Engineering Standards Card */}
        <div className="p-7 sm:p-9 rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0f1017]/90 backdrop-blur-xl shadow-xl shadow-red-950/5 space-y-6">
          <div className="flex items-center gap-2">
            <FiLayers className="h-5 w-5 text-red-500" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Studio Architecture Standards
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Every mobile title engineered by Shivam Shankhdhar adheres to strict memory efficiency, native responsiveness, and Google Play compliance standards:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-[#141522] border border-slate-200/70 dark:border-white/5 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-500">
                <FiZap className="h-4 w-4" />
                <span>60 FPS Game Loops</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Sub-16ms native canvas rendering with zero bridge bottlenecks and hardware-accelerated transforms.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-[#141522] border border-slate-200/70 dark:border-white/5 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-red-500">
                <FiShield className="h-4 w-4" />
                <span>Bytecode Hardening</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                ProGuard release obfuscation, stripped symbols, and minimum bundle payload footprint.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-[#141522] border border-slate-200/70 dark:border-white/5 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-500">
                <FiSmartphone className="h-4 w-4" />
                <span>Play Console Ready</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Full 64-bit architecture compliance, target SDK 34/35 compatibility, and privacy-first local storage.
              </p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
