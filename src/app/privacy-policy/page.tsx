import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FiShield,
  FiLock,
  FiCheckCircle,
  FiMail,
  FiClock,
  FiChevronRight,
  FiGlobe,
  FiExternalLink,
  FiInfo,
  FiUserCheck,
  FiDatabase,
  FiEyeOff,
  FiCpu,
} from 'react-icons/fi';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy | Shivam Shankhdhar Portfolio',
  description:
    'Official Privacy Policy for Shivam Shankhdhar\'s portfolio website. Learn about our zero personal data collection policy, Google AdSense integration, cookies, and privacy rights.',
  keywords: [
    'Privacy Policy',
    'Google AdSense Privacy Policy',
    'Shivam Shankhdhar',
    'Full Stack Engineer',
    'Data Protection',
    'GDPR',
    'CCPA',
  ],
};

const sections = [
  { id: 'introduction', title: '1. Introduction & Mission' },
  { id: 'zero-data', title: '2. Zero User Data Harvesting' },
  { id: 'contact-messages', title: '3. Contact Inquiries' },
  { id: 'google-adsense', title: '4. Google AdSense & Cookies' },
  { id: 'opt-out', title: '5. How to Opt-Out of Personalized Ads' },
  { id: 'server-logs', title: '6. Server Log Files & Analytics' },
  { id: 'local-storage', title: '7. Local Storage & Preferences' },
  { id: 'gdpr-ccpa', title: '8. GDPR & CCPA Compliance' },
  { id: 'children', title: '9. Children\'s Privacy (COPPA)' },
  { id: 'third-party-links', title: '10. External Links' },
  { id: 'updates', title: '11. Policy Changes' },
  { id: 'contact', title: '12. Contact Information' },
];

export default function PrivacyPolicyPage() {
  const lastUpdated = 'September 22, 2026';
  const publisherId = 'ca-pub-1113302487630583';

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#08080a] text-slate-800 dark:text-slate-200 font-sans py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-developer-grid bg-radial-gradient">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Top Navigation & Breadcrumbs */}
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
            <span className="text-slate-800 dark:text-slate-200 font-semibold">Privacy Policy</span>
          </div>
        </div>

        {/* Hero Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#13141f] via-[#0f1017] to-[#1c0f14] text-white p-7 sm:p-10 shadow-2xl border border-red-500/20">
          <div className="absolute -right-12 -bottom-12 w-72 h-72 bg-gradient-to-br from-red-600/20 via-rose-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-red-500/15 text-red-400 border border-red-500/30">
              <FiShield className="h-3.5 w-3.5 text-red-400" />
              <span>Google AdSense & Privacy Standards Compliant</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Privacy <span className="text-gradient-red">Policy</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              We respect your digital privacy. This policy outlines our commitment to transparency: <strong>we do not collect, harvest, monetize, or sell your personal data</strong>.
            </p>

            {/* Badges */}
            <div className="pt-2 flex flex-wrap gap-2 sm:gap-3 text-xs">
              <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 flex items-center gap-2">
                <FiClock className="h-3.5 w-3.5 text-red-400" />
                <span>Last Updated: {lastUpdated}</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 flex items-center gap-2">
                <FiEyeOff className="h-3.5 w-3.5 text-emerald-400" />
                <span className="font-semibold text-white">Zero User Data Sold</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 flex items-center gap-2">
                <span className="text-slate-400">AdSense Publisher ID:</span>
                <code className="text-red-400 font-mono font-semibold">{publisherId}</code>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Table of Contents Card */}
        <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-[#0f1017]/80 backdrop-blur-xl shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <FiInfo className="h-4 w-4 text-red-500" />
            <span>Table of Contents</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
            {sections.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className="px-2.5 py-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
              >
                {sec.title}
              </a>
            ))}
          </div>
        </div>

        {/* Policy Content Sections */}
        <div className="space-y-8 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          
          {/* Section 1 */}
          <section id="introduction" className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0f1017]/90 backdrop-blur-xl shadow-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 font-bold text-xs">
                1
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Introduction & Mission
              </h2>
            </div>
            <p>
              Welcome to the personal website and software portfolio of <strong>Shivam Shankhdhar</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;, or &ldquo;Developer&rdquo;). This website serves as a technical showcase of software projects, native mobile applications, full-stack architectural systems, and open-source contributions.
            </p>
            <p>
              We firmly believe that personal digital privacy is a fundamental right. We have designed this website with privacy-by-design principles: you can explore our projects, code repositories, architecture case studies, and engineering background completely anonymously without signing up for an account or surrendering personal information.
            </p>
          </section>

          {/* Section 2 */}
          <section id="zero-data" className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0f1017]/90 backdrop-blur-xl shadow-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold text-xs">
                2
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Zero User Data Harvesting
              </h2>
            </div>
            <p>
              Unlike commercial portals or social networks, <strong>this website does NOT collect, store, profile, or sell your personal data</strong>. Specifically:
            </p>
            <ul className="space-y-2 list-disc list-inside text-slate-600 dark:text-slate-400">
              <li><strong>No User Account Registration:</strong> We do not ask visitors to register, create accounts, supply phone numbers, or provide personal credentials.</li>
              <li><strong>No Secret Tracking or Profiling:</strong> We do not track your activity across unrelated websites, nor do we build shadow marketing profiles.</li>
              <li><strong>No Sale or Sharing of Data:</strong> We never monetize, sell, lease, rent, trade, or distribute user data to data brokers, advertising networks, or third-party marketers.</li>
            </ul>
            <div className="p-4 rounded-2xl bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/20 text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 flex items-start gap-3">
              <FiCheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
              <span>
                <strong>Our Guarantee:</strong> You can browse, read articles, inspect project code, and download resumes without any risk of personal data harvesting.
              </span>
            </div>
          </section>

          {/* Section 3 */}
          <section id="contact-messages" className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0f1017]/90 backdrop-blur-xl shadow-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 font-bold text-xs">
                3
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Contact Inquiries & Communications
              </h2>
            </div>
            <p>
              The only scenario where personal information is processed occurs when you <strong>voluntarily choose</strong> to reach out via our contact form or direct email:
            </p>
            <ul className="space-y-2 list-disc list-inside text-slate-600 dark:text-slate-400">
              <li><strong>Information Provided:</strong> Your name, email address, inquiry topic, and message body.</li>
              <li><strong>Purpose:</strong> Strictly to read your correspondence, evaluate engineering opportunities or consulting requests, and reply directly to you.</li>
              <li><strong>No Marketing Lists:</strong> Submitting a contact message will never subscribe you to unsolicited newsletters, spam emails, or marketing campaigns.</li>
              <li><strong>Security:</strong> All form transmissions occur over encrypted SSL/TLS connections to prevent interception.</li>
            </ul>
          </section>

          {/* Section 4 - CRITICAL FOR ADSENSE */}
          <section id="google-adsense" className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0f1017]/90 backdrop-blur-xl shadow-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 font-bold text-xs">
                4
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Google AdSense & Third-Party Advertising Cookies
              </h2>
            </div>
            <p>
              This website is enrolled in and displays contextual advertisements provided by <strong>Google AdSense</strong> (Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA). Ad revenue supports the hosting, development, and continuous maintenance of our open-source software and tutorials.
            </p>
            <p>
              In accordance with Google AdSense policy standards, please be advised of the following:
            </p>
            <div className="p-4 rounded-2xl bg-red-500/5 dark:bg-red-950/20 border border-red-500/20 space-y-3 text-xs sm:text-sm">
              <p className="font-semibold text-slate-900 dark:text-white">
                Key AdSense Policy Disclosures:
              </p>
              <ul className="space-y-2 list-disc list-inside text-slate-600 dark:text-slate-300">
                <li>
                  <strong>Third-Party Vendor Cookies:</strong> Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to this website or other websites on the Internet.
                </li>
                <li>
                  <strong>DoubleClick DART Cookie:</strong> Google&apos;s use of advertising cookies (including the DoubleClick cookie) enables it and its partners to serve ads to users based on their visits to this site and/or other sites on the Internet.
                </li>
                <li>
                  <strong>Opt-Out Rights:</strong> Users may opt out of personalized advertising by visiting Google&apos;s Ads Settings page at{' '}
                  <a
                    href="https://adssettings.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 dark:text-red-400 font-semibold underline inline-flex items-center gap-0.5"
                  >
                    <span>adssettings.google.com</span>
                    <FiExternalLink className="h-3 w-3" />
                  </a>.
                </li>
              </ul>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              For complete transparency regarding how Google manages data across partner sites and advertising networks, please visit Google&apos;s dedicated page:{' '}
              <a
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 dark:text-red-400 hover:underline"
              >
                &ldquo;How Google uses information from sites or apps that use our services&rdquo;
              </a>.
            </p>
          </section>

          {/* Section 5 */}
          <section id="opt-out" className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0f1017]/90 backdrop-blur-xl shadow-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 font-bold text-xs">
                5
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                How to Opt-Out of Personalized Advertising & Manage Cookies
              </h2>
            </div>
            <p>
              You maintain complete autonomy over advertising cookies. You can manage or disable interest-based advertising through any of the following independent consumer choice portals:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-[#141522] hover:border-red-500/40 transition group"
              >
                <div className="flex items-center justify-between text-slate-900 dark:text-white font-semibold text-xs sm:text-sm">
                  <span>Google Ads Settings</span>
                  <FiExternalLink className="h-4 w-4 text-red-500 group-hover:translate-x-0.5 transition" />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Opt out of personalized Google ads across all devices and browsers.
                </p>
              </a>

              <a
                href="https://www.aboutads.info/choices/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-[#141522] hover:border-red-500/40 transition group"
              >
                <div className="flex items-center justify-between text-slate-900 dark:text-white font-semibold text-xs sm:text-sm">
                  <span>Digital Advertising Alliance (DAA)</span>
                  <FiExternalLink className="h-4 w-4 text-red-500 group-hover:translate-x-0.5 transition" />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Manage third-party ad networks via the WebChoices consumer tool.
                </p>
              </a>

              <a
                href="https://www.youronlinechoices.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-[#141522] hover:border-red-500/40 transition group"
              >
                <div className="flex items-center justify-between text-slate-900 dark:text-white font-semibold text-xs sm:text-sm">
                  <span>Your Online Choices (EDAA - Europe)</span>
                  <FiExternalLink className="h-4 w-4 text-red-500 group-hover:translate-x-0.5 transition" />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  European Interactive Digital Advertising Alliance opt-out portal.
                </p>
              </a>

              <a
                href="https://optout.networkadvertising.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-[#141522] hover:border-red-500/40 transition group"
              >
                <div className="flex items-center justify-between text-slate-900 dark:text-white font-semibold text-xs sm:text-sm">
                  <span>Network Advertising Initiative (NAI)</span>
                  <FiExternalLink className="h-4 w-4 text-red-500 group-hover:translate-x-0.5 transition" />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Opt out of participating NAI member behavioral advertising.
                </p>
              </a>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 pt-2">
              Additionally, you can block or clear cookies at any time via your browser preferences (Chrome, Safari, Firefox, Edge). Note that disabling cookies may affect certain non-essential visual preferences.
            </p>
          </section>

          {/* Section 6 */}
          <section id="server-logs" className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0f1017]/90 backdrop-blur-xl shadow-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 font-bold text-xs">
                6
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Server Log Files & Technical Metrics
              </h2>
            </div>
            <p>
              Like virtually all standard web applications, our web hosting servers automatically record routine technical request metadata in server log files. This standard diagnostic data includes:
            </p>
            <ul className="space-y-1.5 list-disc list-inside text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
              <li>Internet Protocol (IP) address</li>
              <li>Browser type and version</li>
              <li>Internet Service Provider (ISP)</li>
              <li>Date and time stamp</li>
              <li>Referring and exit pages</li>
              <li>HTTP status codes (e.g., 200 OK, 404 Not Found)</li>
            </ul>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              This technical log information is not linked to any personally identifiable information and is utilized strictly for system security, DDoS mitigation, debugging errors, and ensuring high service availability.
            </p>
          </section>

          {/* Section 7 */}
          <section id="local-storage" className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0f1017]/90 backdrop-blur-xl shadow-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 font-bold text-xs">
                7
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Local Storage & Preferences
              </h2>
            </div>
            <p>
              We use client-side browser <code className="text-red-500 font-mono text-xs">localStorage</code> solely to remember your chosen user interface theme (Dark Mode vs. Light Mode). This preference stays strictly within your browser, is never sent to our database, and can be cleared at any time by clearing your browser cache.
            </p>
          </section>

          {/* Section 8 */}
          <section id="gdpr-ccpa" className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0f1017]/90 backdrop-blur-xl shadow-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 font-bold text-xs">
                8
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                GDPR & CCPA / CPRA Compliance
              </h2>
            </div>
            <p>
              Whether you are located in the European Economic Area (EEA), the United Kingdom, California, or elsewhere worldwide, we honor comprehensive international data privacy standards:
            </p>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#141520] border border-slate-200 dark:border-white/5">
                <p className="font-semibold text-slate-900 dark:text-white">
                  European General Data Protection Regulation (GDPR):
                </p>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  You possess the right to access, rectify, or request deletion of any email correspondence you have sent to us. Since we maintain no persistent visitor account database, there is no ongoing profile data stored to delete.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#141520] border border-slate-200 dark:border-white/5">
                <p className="font-semibold text-slate-900 dark:text-white">
                  California Consumer Privacy Act (CCPA) & CPRA:
                </p>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  We state unequivocally: <strong>We do not sell personal information, and we do not share personal information for cross-context behavioral advertising</strong>. We do not discriminate against any user who exercises their statutory privacy rights.
                </p>
              </div>
            </div>
          </section>

          {/* Section 9 */}
          <section id="children" className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0f1017]/90 backdrop-blur-xl shadow-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 font-bold text-xs">
                9
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Children&apos;s Privacy (COPPA Compliance)
              </h2>
            </div>
            <p>
              Protecting the online privacy of children is of paramount importance. Our website and services are directed to software engineers, professionals, and general audiences. We do not knowingly collect or solicit any personal information from children under the age of 13 (or under 16 in the European Union).
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              If you believe a child under 13 has inadvertently provided personal contact information through our contact form, please email us immediately at <a href="mailto:er.shivam1214@gmail.com" className="text-red-500 underline font-semibold">er.shivam1214@gmail.com</a>, and we will promptly purge the correspondence.
            </p>
          </section>

          {/* Section 10 */}
          <section id="third-party-links" className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0f1017]/90 backdrop-blur-xl shadow-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 font-bold text-xs">
                10
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Links to Third-Party Services
              </h2>
            </div>
            <p>
              This website contains outbound links to third-party services, including GitHub repositories, LinkedIn profiles, Google Play Store app listings (such as Chess Binge and Ludo Binge), and live hosted web applications.
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Please note that once you navigate to an external website, this Privacy Policy no longer applies. We strongly encourage you to review the privacy notices of any external site you visit.
            </p>
          </section>

          {/* Section 11 */}
          <section id="updates" className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0f1017]/90 backdrop-blur-xl shadow-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 font-bold text-xs">
                11
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Updates to this Privacy Policy
              </h2>
            </div>
            <p>
              We may periodically revise this Privacy Policy to reflect technical changes, regulatory updates, or newly integrated services. Any changes will be posted on this page with an updated &ldquo;Last Updated&rdquo; date at the top of the document.
            </p>
          </section>

          {/* Section 12 */}
          <section id="contact" className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0f1017]/90 backdrop-blur-xl shadow-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 font-bold text-xs">
                12
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Contact Information
              </h2>
            </div>
            <p>
              If you have any questions, inquiries, or feedback regarding this Privacy Policy or our privacy practices, please contact the site owner and developer directly:
            </p>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#141520] border border-slate-200 dark:border-white/5 space-y-2 text-xs sm:text-sm">
              <p className="font-bold text-slate-900 dark:text-white">
                Shivam Shankhdhar
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                Full Stack & Mobile Engineer
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                Location: Delhi, India
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                Email:{' '}
                <a
                  href="mailto:er.shivam1214@gmail.com"
                  className="text-red-600 dark:text-red-400 font-semibold hover:underline"
                >
                  er.shivam1214@gmail.com
                </a>
              </p>
            </div>
          </section>

        </div>

      </div>

      {/* Reusable Site Footer */}
      <Footer />
    </main>
  );
}
