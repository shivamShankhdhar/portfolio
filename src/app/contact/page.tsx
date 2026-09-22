import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FiMail,
  FiMapPin,
  FiSend,
  FiGithub,
  FiLinkedin,
  FiClock,
  FiShield,
  FiGlobe,
  FiChevronRight,
  FiCheckCircle,
} from 'react-icons/fi';
import ContactFormClient from './ContactFormClient';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Contact Shivam Shankhdhar | Full Stack & Mobile Engineer',
  description:
    'Get in touch with Shivam Shankhdhar for full-stack web engineering, mobile app development (React Native), Java Spring Boot backends, or consulting inquiries.',
  keywords: [
    'Contact Shivam Shankhdhar',
    'Hire Full Stack Engineer',
    'Hire React Native Developer',
    'Software Engineer Contact',
  ],
};

export default function ContactPage() {
  const adminEmail = 'er.shivam1214@gmail.com';
  const githubUrl = 'https://github.com/shivamshankhdhar';
  const linkedinUrl = 'https://linkedin.com/in/shivam-shankhdhar-559092203';

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#08080a] text-slate-800 dark:text-slate-200 font-sans py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-developer-grid bg-radial-gradient">
      <div className="max-w-5xl mx-auto space-y-10">
        
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
            <span className="text-slate-800 dark:text-slate-200 font-semibold">Contact</span>
          </div>
        </div>

        {/* Hero Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#13141f] via-[#0f1017] to-[#1c0f14] text-white p-7 sm:p-10 shadow-2xl border border-red-500/20">
          <div className="absolute -right-12 -bottom-12 w-72 h-72 bg-gradient-to-br from-red-600/20 via-rose-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-red-500/15 text-red-400 border border-red-500/30">
              <FiSend className="h-3.5 w-3.5 text-red-400" />
              <span>Direct Communication Channel</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Get In <span className="text-gradient-red">Touch</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Have an engineering opportunity, mobile app concept, architectural question, or consulting project? Send a direct message below or email directly.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 sm:gap-3 text-xs">
              <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 flex items-center gap-2">
                <FiClock className="h-3.5 w-3.5 text-red-400" />
                <span>Response Time: 12–24 Hours</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 flex items-center gap-2">
                <FiShield className="h-3.5 w-3.5 text-emerald-400" />
                <span>Zero Data Sold • Strictly Confidential</span>
              </div>
            </div>
          </div>
        </div>

        {/* Client-side Form and Contact Details */}
        <ContactFormClient
          adminEmail={adminEmail}
          githubUrl={githubUrl}
          linkedinUrl={linkedinUrl}
        />

      </div>

      <Footer adminEmail={adminEmail} githubUrl={githubUrl} linkedinUrl={linkedinUrl} />
    </main>
  );
}
