import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FiGlobe,
  FiChevronRight,
  FiSmartphone,
  FiZap,
} from 'react-icons/fi';
import { FaGamepad } from 'react-icons/fa6';
import connectDB, { isDbConfigured } from '@/lib/db';
import App from '@/models/App';
import Profile from '@/models/Profile';
import { defaultApps } from '@/lib/defaultData';
import MobileAppsClient from '@/components/mobile-apps/MobileAppsClient';

export const metadata: Metadata = {
  title: 'Mobile Applications & Games | Shivam Shankhdhar',
  description:
    'Explore production Android applications and mobile games engineered by Shivam Shankhdhar using React Native, Expo, Java, and modern mobile architectures.',
  keywords: [
    'Mobile Apps',
    'Android Apps',
    'React Native',
    'Expo',
    'Mobile Games',
    'Chess Binge',
    'Ludo Binge',
    'Shivam Shankhdhar',
  ],
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getApps() {
  try {
    if (isDbConfigured()) {
      await connectDB();
      const apps = await App.find().sort({ order: 1, createdAt: -1 }).lean();

      if (apps && apps.length > 0) {
        return JSON.parse(JSON.stringify(apps));
      }
    }
  } catch (error) {
    console.error('Error loading mobile apps from DB:', error);
  }

  // Fallback to default apps if DB is unconfigured or empty
  return defaultApps;
}

async function getAppsUrl() {
  try {
    if (isDbConfigured()) {
      await connectDB();
      const profile: any = await Profile.findOne().lean();
      if (profile?.appsUrl) return profile.appsUrl;
    }
  } catch (error) {
    console.error('Error loading appsUrl from DB:', error);
  }
  return process.env.NEXT_PUBLIC_APPS_URL || 'https://www.apps.shivamshankhdhar.online';
}

export default async function MobileAppsPage() {
  const [apps, appsUrl] = await Promise.all([getApps(), getAppsUrl()]);
  const gamesCount = apps.filter(
    (a: any) => (a.category || '').toLowerCase() === 'games'
  ).length;

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#09090d] text-slate-800 dark:text-slate-200 font-sans py-10 sm:py-16 px-4 sm:px-6 lg:px-8 bg-developer-grid bg-radial-gradient">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Top Breadcrumb & Back Link */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[#12131c] text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 hover:border-red-500/40 transition-all shadow-xs"
          >
            <FiGlobe className="h-3.5 w-3.5 text-red-500" />
            <span>Developer&apos;s Website</span>
          </Link>

          <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 text-xs">
            <Link href="/" className="hover:text-red-500 transition-colors">
              Home
            </Link>
            <FiChevronRight className="h-3 w-3" />
            <span className="text-slate-800 dark:text-slate-200 font-semibold">
              Mobile Apps
            </span>
          </div>
        </div>

        {/* Hero Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 shadow-xs">
            <FiSmartphone className="h-3.5 w-3.5" />
            <span>Mobile Engineering Showcase</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Native <span className="text-gradient-red">Mobile Applications</span> & Games
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Engineered with React Native, Expo, and Android native modules. Featuring low-latency architecture, ProGuard bytecode optimization, and production Google Play releases.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-white dark:bg-[#12131c] border border-slate-200 dark:border-white/10 shadow-xs">
              <FiZap className="h-3.5 w-3.5 text-red-500" />
              <span>{apps.length} Total Applications</span>
            </span>

            {gamesCount > 0 && (
              <Link
                href="/mobile-apps/games"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30 transition-colors"
              >
                <FaGamepad className="h-3.5 w-3.5" />
                <span>{gamesCount} Games on Showcase →</span>
              </Link>
            )}

            <a
              href={appsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-xl text-xs font-semibold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-sm transition-all"
            >
              <span>Visit Dedicated Mobile Lab Hub</span>
              <span className="text-[10px] opacity-80">↗</span>
            </a>
          </div>
        </div>

        {/* Interactive Apps Client with Category Filter and Games Spotlight */}
        <MobileAppsClient initialApps={apps} />
      </div>
    </main>
  );
}
