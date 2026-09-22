import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FiUser,
  FiCode,
  FiSmartphone,
  FiServer,
  FiDatabase,
  FiAward,
  FiMail,
  FiGithub,
  FiLinkedin,
  FiArrowRight,
  FiChevronRight,
  FiGlobe,
  FiCheckCircle,
  FiCpu,
  FiLayers,
  FiZap,
} from 'react-icons/fi';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'About Me - Shivam Shankhdhar | Full Stack & Mobile Engineer',
  description:
    'Learn about Shivam Shankhdhar, Full Stack & Native Mobile Engineer specializing in React Native, Java Spring Boot, Next.js, and scalable cloud systems.',
  keywords: [
    'Shivam Shankhdhar',
    'About Shivam Shankhdhar',
    'Full Stack Engineer',
    'React Native Developer',
    'Java Spring Boot Architect',
    'Software Engineer Portfolio',
  ],
};

const competencies = [
  {
    icon: FiSmartphone,
    title: 'Mobile Engineering',
    skills: 'React Native, Expo, Android SDK, App Architecture, State Management, Google Play Publishing',
    description: 'Specialized in crafting fluid, 60fps cross-platform and native Android experiences with low memory footprints and offline capabilities.',
  },
  {
    icon: FiServer,
    title: 'Backend & Microservices',
    skills: 'Java, Spring Boot, Node.js, Express, REST APIs, WebSockets, JWT Auth, Microservices',
    description: 'Designing resilient server-side architectures, secure transaction pipelines, and high-throughput RESTful endpoints.',
  },
  {
    icon: FiCode,
    title: 'Modern Web & Frontend',
    skills: 'Next.js 14/15, React, TypeScript, Tailwind CSS, Framer Motion, Server Components',
    description: 'Building ultra-responsive, accessible, and SEO-optimized web applications with dark-mode elegance and snappy interactions.',
  },
  {
    icon: FiDatabase,
    title: 'Data & DevOps',
    skills: 'PostgreSQL, MongoDB, Redis, Docker, Git, CI/CD, Vercel, Cloud Deployments',
    description: 'Proficient in relational and document database modeling, index optimization, containerized environments, and cloud automated pipelines.',
  },
];

const highlights = [
  {
    title: 'Chess Binge',
    platform: 'Android / Google Play',
    desc: 'Flagship chess game built with React Native and Expo. Features offline AI engine, customized piece skins, move timers, sound synthesis, and AdMob integration.',
  },
  {
    title: 'Ludo Binge',
    platform: 'Android / Google Play',
    desc: 'High-performance interactive board game featuring deterministic dice physics, local multi-player, smooth token animations, and responsive token movement.',
  },
  {
    title: 'Full Stack Developer Portfolio Platform',
    platform: 'Web / Cloud Native',
    desc: 'Engineered with Next.js App Router, MongoDB, Tailwind CSS, and secure administrative authentication for dynamic content management.',
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#08080a] text-slate-800 dark:text-slate-200 font-sans py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-developer-grid bg-radial-gradient">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Top Breadcrumb Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[#12131c] text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 hover:border-red-500/40 transition-all shadow-xs"
          >
            <FiGlobe className="h-3.5 w-3.5 text-red-500" />
            <span>&larr; Return to Portfolio</span>
          </Link>

          <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 text-xs">
            <Link href="/" className="hover:text-red-500 transition-colors">Home</Link>
            <FiChevronRight className="h-3 w-3" />
            <span className="text-slate-800 dark:text-slate-200 font-semibold">About Me</span>
          </div>
        </div>

        {/* Hero Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#13141f] via-[#0f1017] to-[#1c0f14] text-white p-7 sm:p-10 shadow-2xl border border-red-500/20">
          <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-gradient-to-br from-red-600/20 via-rose-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8">
            <div className="relative h-28 w-28 sm:h-36 sm:w-36 rounded-3xl overflow-hidden border-2 border-red-500/50 shadow-2xl shadow-red-600/30 shrink-0">
              <img
                src="/avatar/shivam_avatar.png"
                alt="Shivam Shankhdhar"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="space-y-3 text-center md:text-left flex-1">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-red-500/15 text-red-400 border border-red-500/30">
                <FiZap className="h-3.5 w-3.5 text-red-400" />
                <span>Passionate Full Stack & Mobile Engineer</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                Shivam <span className="text-gradient-red">Shankhdhar</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                I am a dedicated software engineer with deep expertise in full-stack web engineering, cross-platform mobile development, and enterprise Java backend architectures. I turn ambitious architectural requirements into elegant, high-throughput applications that deliver real-world impact.
              </p>

              {/* Status & Links */}
              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Open for Opportunities & Consulting</span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-300">
                  <span>Based in Delhi, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Narrative Biography */}
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0f1017]/90 backdrop-blur-xl shadow-md space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 font-bold">
              <FiUser className="h-4 w-4" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              My Engineering Journey
            </h2>
          </div>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
            <p>
              My passion for computing began with a relentless curiosity about how software shapes the modern world. With a strong academic foundation in <strong>Computer Science & Engineering (B.Tech)</strong>, I channeled that curiosity into mastering both frontend finesse and backend robustness.
            </p>
            <p>
              Over the years, I have architected and deployed full-lifecycle software applications: from complex data-driven enterprise systems built with <strong>Java & Spring Boot</strong> to consumer-facing mobile applications built using <strong>React Native and Expo</strong> currently published on the Google Play Store.
            </p>
            <p>
              Whether engineering microservices, tuning database queries, constructing reusable component libraries, or designing pixel-perfect animations in dark mode, I adhere to principles of clean architecture, modularity, and relentless user empathy.
            </p>
          </div>
        </div>

        {/* Core Pillars / Competencies */}
        <div className="space-y-4">
          <div className="text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FiLayers className="h-5 w-5 text-red-500" />
              <span>Core Architectural Pillars</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Key domains where I build production-grade, enterprise-ready software.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {competencies.map((comp) => {
              const Icon = comp.icon;
              return (
                <div
                  key={comp.title}
                  className="p-6 rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0f1017]/90 backdrop-blur-xl shadow-md space-y-3 hover:border-red-500/40 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {comp.title}
                      </h3>
                      <p className="text-xs text-red-600 dark:text-red-400 font-semibold">
                        {comp.skills}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {comp.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Highlighted Production Projects */}
        <div className="space-y-4">
          <div className="text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FiAward className="h-5 w-5 text-red-500" />
              <span>Flagship Published Software</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Real-world products engineered and shipped to global audiences.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0f1017]/90 backdrop-blur-xl shadow-sm space-y-2 hover:border-red-500/30 transition"
              >
                <span className="text-[11px] font-bold text-red-500 uppercase tracking-wider">
                  {item.platform}
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Engineering Philosophy & Authenticity */}
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0f1017]/90 backdrop-blur-xl shadow-md space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FiCheckCircle className="h-5 w-5 text-emerald-500" />
            <span>Philosophy & Commitment to Transparency</span>
          </h2>
          <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            <p>
              <strong>1. Clean Code & Long-Term Maintainability:</strong> Writing code that runs is easy; crafting systems that other developers can comfortably read, refactor, and scale requires discipline. I prioritize rigorous typing, clean separation of concerns, and defensive error handling.
            </p>
            <p>
              <strong>2. Privacy-First Experience:</strong> This portfolio has been intentionally engineered with zero user-data collection. I do not run intrusive surveillance scripts, sell visitor data, or track users. The advertising served through Google AdSense is compliant with strict industry transparency guidelines.
            </p>
            <p>
              <strong>3. Relentless Curiosity:</strong> The tech ecosystem evolves constantly. I continuously expand my engineering toolkit through hands-on side projects, algorithmic problem solving, and building tools that improve everyday developer productivity.
            </p>
          </div>
        </div>

        {/* CTA Bar */}
        <div className="p-7 rounded-3xl bg-gradient-to-r from-red-600/10 via-rose-600/10 to-red-600/10 border border-red-500/20 text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Interested in Collaborating?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
            Whether you have an upcoming project, a challenging full-stack engineering role, or a mobile app idea, let&apos;s start a conversation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-red-600/25 hover:from-red-500 hover:to-rose-500 transition"
            >
              <FiMail className="h-4 w-4" />
              <span>Contact Shivam</span>
            </Link>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl border border-slate-300 dark:border-white/10 bg-white dark:bg-[#141520] text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm hover:border-red-500/40 hover:text-red-500 transition"
            >
              <span>Explore Projects</span>
              <FiArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

      </div>

      <Footer />
    </main>
  );
}
