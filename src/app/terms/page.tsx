import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FiFileText,
  FiShield,
  FiClock,
  FiChevronRight,
  FiGlobe,
  FiExternalLink,
  FiCheckCircle,
  FiAlertCircle,
  FiInfo,
  FiCode,
  FiMail,
} from 'react-icons/fi';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service | Shivam Shankhdhar Portfolio',
  description:
    'Terms of Service and conditions of use for Shivam Shankhdhar\'s portfolio website, showcase projects, and mobile applications.',
  keywords: [
    'Terms of Service',
    'Terms of Use',
    'Shivam Shankhdhar',
    'Portfolio Terms',
    'Intellectual Property',
  ],
};

const sections = [
  { id: 'acceptance', title: '1. Acceptance of Terms' },
  { id: 'intellectual-property', title: '2. Intellectual Property Rights' },
  { id: 'permitted-use', title: '3. Permitted & Acceptable Use' },
  { id: 'third-party-ads', title: '4. Google AdSense & Advertising' },
  { id: 'external-links', title: '5. External Links & Repositories' },
  { id: 'disclaimer', title: '6. Disclaimer of Warranties' },
  { id: 'limitation', title: '7. Limitation of Liability' },
  { id: 'governing-law', title: '8. Governing Law' },
  { id: 'contact', title: '9. Contact & Inquiries' },
];

export default function TermsPage() {
  const lastUpdated = 'September 22, 2026';

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#08080a] text-slate-800 dark:text-slate-200 font-sans py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-developer-grid bg-radial-gradient">
      <div className="max-w-4xl mx-auto space-y-10">
        
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
            <span className="text-slate-800 dark:text-slate-200 font-semibold">Terms of Service</span>
          </div>
        </div>

        {/* Hero Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#13141f] via-[#0f1017] to-[#1c0f14] text-white p-7 sm:p-10 shadow-2xl border border-red-500/20">
          <div className="absolute -right-12 -bottom-12 w-72 h-72 bg-gradient-to-br from-red-600/20 via-rose-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-red-500/15 text-red-400 border border-red-500/30">
              <FiFileText className="h-3.5 w-3.5 text-red-400" />
              <span>Legal Guidelines & User Agreement</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Terms of <span className="text-gradient-red">Service</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              These Terms of Service govern your access to and use of this website, project demos, code snippets, and related services operated by <strong>Shivam Shankhdhar</strong>.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 sm:gap-3 text-xs">
              <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 flex items-center gap-2">
                <FiClock className="h-3.5 w-3.5 text-red-400" />
                <span>Last Updated: {lastUpdated}</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 flex items-center gap-2">
                <FiCheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                <span>Free Open Access</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links Table of Contents */}
        <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-[#0f1017]/80 backdrop-blur-xl shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <FiInfo className="h-4 w-4 text-red-500" />
            <span>Overview & Sections</span>
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

        {/* Terms Content Sections */}
        <div className="space-y-8 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          
          {/* Section 1 */}
          <section id="acceptance" className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0f1017]/90 backdrop-blur-xl shadow-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 font-bold text-xs">
                1
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Acceptance of Terms
              </h2>
            </div>
            <p>
              By accessing or using this website (including all subdomains, interactive demos, and linked services), you agree to be bound by these Terms of Service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
            </p>
            <p>
              If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          {/* Section 2 */}
          <section id="intellectual-property" className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0f1017]/90 backdrop-blur-xl shadow-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 font-bold text-xs">
                2
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Intellectual Property & Portfolio Projects
              </h2>
            </div>
            <p>
              All original content, visual design, custom UI components, architectural schematics, articles, and brand marks created by <strong>Shivam Shankhdhar</strong> are protected by international copyright and intellectual property laws.
            </p>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#141520] border border-slate-200 dark:border-white/5">
                <p className="font-semibold text-slate-900 dark:text-white">
                  Mobile Games & Proprietary Applications:
                </p>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  Mobile games published by Shivam Shankhdhar, including <strong>Chess Binge</strong> and <strong>Ludo Binge</strong> on Google Play, their assets, game logic, and proprietary codebases, are exclusively owned by the Developer.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#141520] border border-slate-200 dark:border-white/5">
                <p className="font-semibold text-slate-900 dark:text-white">
                  Open Source Code & Repositories:
                </p>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  Code published publicly on GitHub under specific open-source licenses (such as MIT or Apache 2.0) is governed by their respective license terms.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section id="permitted-use" className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0f1017]/90 backdrop-blur-xl shadow-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 font-bold text-xs">
                3
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Permitted & Acceptable Use
              </h2>
            </div>
            <p>
              You are granted a non-exclusive, non-transferable, revocable license to access and view this portfolio for personal, educational, recruiting, or business evaluation purposes.
            </p>
            <p className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm">
              You expressly agree not to:
            </p>
            <ul className="space-y-1.5 list-disc list-inside text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
              <li>Engage in automated scraping, data-mining, or bot crawling that degrades server performance.</li>
              <li>Attempt to gain unauthorized access to our administrative endpoints, servers, or APIs.</li>
              <li>Introduce malicious software, viruses, Trojan horses, or harmful code.</li>
              <li>Transmit unsolicited commercial messages (spam) through our contact forms.</li>
              <li>Perform denial-of-service (DoS or DDoS) attacks against the website infrastructure.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section id="third-party-ads" className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0f1017]/90 backdrop-blur-xl shadow-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 font-bold text-xs">
                4
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Google AdSense & Third-Party Advertising
              </h2>
            </div>
            <p>
              This website serves contextual and programmatic advertisements powered by <strong>Google AdSense</strong>. Please understand that:
            </p>
            <ul className="space-y-2 list-disc list-inside text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
              <li>Advertisements displayed on this website are generated automatically by third-party ad networks. We do not endorse the products, services, claims, or offerings presented in third-party advertisements.</li>
              <li>Clicking on any advertisement will navigate you outside of this website to third-party domains. Any transactions, interactions, or warranties between you and third-party advertisers are solely between you and the advertiser.</li>
              <li>Users are strictly forbidden from clicking their own ads or engaging in artificial impression generation (invalid click activity), which is contrary to Google AdSense program policies.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section id="external-links" className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0f1017]/90 backdrop-blur-xl shadow-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 font-bold text-xs">
                5
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                External Links & Third-Party Repositories
              </h2>
            </div>
            <p>
              We provide links to external websites, including GitHub, LinkedIn, Google Play, and live application deployments for your convenience and demonstration. We do not control or endorse the content or practices of these external sites and accept no liability for damages arising from your use of them.
            </p>
          </section>

          {/* Section 6 */}
          <section id="disclaimer" className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0f1017]/90 backdrop-blur-xl shadow-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 font-bold text-xs">
                6
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Disclaimer of Warranties
              </h2>
            </div>
            <p>
              The materials and demonstrations on this website are provided on an <strong>&ldquo;as is&rdquo;</strong> and <strong>&ldquo;as available&rdquo;</strong> basis. Shivam Shankhdhar makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
            </p>
          </section>

          {/* Section 7 */}
          <section id="limitation" className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0f1017]/90 backdrop-blur-xl shadow-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 font-bold text-xs">
                7
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Limitation of Liability
              </h2>
            </div>
            <p>
              In no event shall Shivam Shankhdhar or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on this website or showcase demos.
            </p>
          </section>

          {/* Section 8 */}
          <section id="governing-law" className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0f1017]/90 backdrop-blur-xl shadow-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 font-bold text-xs">
                8
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Governing Law & Jurisdiction
              </h2>
            </div>
            <p>
              These Terms of Service are governed by and construed in accordance with the laws of India, and any legal proceedings shall be subject to the exclusive jurisdiction of the competent courts in Delhi, India.
            </p>
          </section>

          {/* Section 9 */}
          <section id="contact" className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0f1017]/90 backdrop-blur-xl shadow-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 font-bold text-xs">
                9
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Contact & Legal Inquiries
              </h2>
            </div>
            <p>
              For questions regarding these Terms of Service or to report any technical or legal concerns, please contact:
            </p>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#141520] border border-slate-200 dark:border-white/5 space-y-2 text-xs sm:text-sm">
              <p className="font-bold text-slate-900 dark:text-white">Shivam Shankhdhar</p>
              <p className="text-slate-600 dark:text-slate-400">Full Stack & Mobile Engineer</p>
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

      <Footer />
    </main>
  );
}
