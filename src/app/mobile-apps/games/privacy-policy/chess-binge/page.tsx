import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy - Chess Binge | Mobile Game',
  description:
    'Privacy Policy for Chess Binge on Google Play and Android. Learn how we handle your data, Google AdMob integration, notifications, and your privacy rights.',
  keywords: [
    'Chess Binge',
    'Privacy Policy',
    'Chess Binge Privacy Policy',
    'Google Play Privacy Policy',
    'Shivam Shankhdhar',
  ],
};

export default function ChessBingePrivacyPolicyPage() {
  const lastUpdated = 'September 19, 2026';

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span>Mobile Apps</span>
          <span>/</span>
          <span>Games</span>
          <span>/</span>
          <span className="text-slate-800 dark:text-slate-200 font-medium">Chess Binge Privacy Policy</span>
        </div>

        {/* Header Hero Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white p-8 md:p-10 shadow-xl border border-slate-700/50 mb-10">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-4">
              ♟️ Google Play Compliant • Official Policy
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3">
              Privacy Policy for <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-300 to-teal-200">Chess Binge</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              This Privacy Policy explains how <strong>Chess Binge</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;the App&rdquo;), developed by <strong>Shivam Shankhdhar</strong>, handles, processes, and protects your information when you download, install, and play our mobile chess game.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-xs sm:text-sm text-slate-400">
              <div><strong className="text-slate-300">Package Name:</strong> <code className="bg-slate-800/80 px-2 py-0.5 rounded text-amber-300">chess.binge</code></div>
              <div><strong className="text-slate-300">Developer:</strong> Shivam Shankhdhar</div>
              <div><strong className="text-slate-300">Effective Date:</strong> {lastUpdated}</div>
            </div>
          </div>

          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Policy Body */}
        <div className="space-y-10 bg-white dark:bg-slate-900/70 p-6 sm:p-10 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm leading-relaxed">
          
          {/* Section 1: Executive Summary */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
              1. Overview &amp; Privacy Principles
            </h2>
            <p className="mb-3">
              Your privacy is fundamental to us. Chess Binge is built with a <strong>privacy-first, offline-ready architecture</strong>:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
              <li><strong>No Account Required:</strong> You do not need to register, sign up with social media, or provide an email, phone number, or password to play.</li>
              <li><strong>Local Game Data:</strong> Your board moves, match history, ELO ratings, audio settings, and cosmetics are stored locally on your device.</li>
              <li><strong>Advertising Integration:</strong> We utilize Google AdMob to serve in-game advertisements (such as optional rewarded hints and daily wheel spins) to support free gameplay.</li>
              <li><strong>No Sale of Personal Data:</strong> We never sell, rent, or trade your personal information to data brokers or third parties.</li>
            </ul>
          </section>

          {/* Section 2: Information Collected */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
              2. Information We Collect &amp; How We Use It
            </h2>
            
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mt-4 mb-2">
              A. Information Stored Locally on Your Device
            </h3>
            <p className="mb-3">
              The App stores gameplay parameters in your device&apos;s sandboxed local storage:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-slate-700 dark:text-slate-300 mb-4">
              <li>Current game state, FEN board strings, and pending match moves (for the &ldquo;Continue Game&rdquo; feature).</li>
              <li>Offline match statistics, win/loss history, and ELO rating progress.</li>
              <li>Virtual currency balance (Binge Coins) and unlocked cosmetic board/piece themes.</li>
              <li>Local user preferences (sound effects volume, background music toggle, haptic feedback).</li>
            </ul>
            <p className="text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/50 p-3 rounded-lg">
              ℹ️ <strong>Note:</strong> Local gameplay data never leaves your device and is not synchronized to an external central database. Clearing app data or uninstalling the app permanently erases this local data.
            </p>

            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mt-6 mb-2">
              B. Automatically Collected Technical &amp; Advertising Data
            </h3>
            <p className="mb-3">
              When playing Chess Binge with an active internet connection, third-party software development kits (SDKs)&mdash;primarily <strong>Google AdMob</strong>&mdash;automatically collect standard technical diagnostics and advertising metrics:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-slate-700 dark:text-slate-300">
              <li><strong>Device Identifiers:</strong> Google Advertising ID (GAID / AAID), vendor identifiers, and hardware characteristics.</li>
              <li><strong>Technical Diagnostics:</strong> Operating system version, device model/manufacturer, screen resolution, language settings, and crash telemetry.</li>
              <li><strong>Network Information:</strong> General IP address (used to determine coarse/approximate geographic location such as country or city for localized ad delivery).</li>
              <li><strong>Ad Interaction Data:</strong> Ad views, clicks, completion of rewarded video ads (e.g., to grant free hints), and fraud prevention telemetry.</li>
            </ul>
          </section>

          {/* Section 3: Third-Party Services & Google AdMob */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
              3. Third-Party Services &amp; Advertising Providers
            </h2>
            <p className="mb-4">
              Chess Binge uses third-party services that may collect information used to identify you and display contextual or personalized advertisements:
            </p>

            <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-5 bg-slate-50/50 dark:bg-slate-800/30 mb-4">
              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1">Google AdMob (Google LLC)</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
                Used to deliver banner, interstitial, rewarded video, and app-open ads. Google processes device identifiers, location, and interaction logs in accordance with Google&apos;s Privacy Policy.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-medium">
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  Google Privacy Policy ↗
                </a>
                <a
                  href="https://policies.google.com/technologies/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  Google Ads &amp; Data Technologies ↗
                </a>
                <a
                  href="https://adssettings.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  Personalized Ads Settings ↗
                </a>
              </div>
            </div>

            <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-5 bg-slate-50/50 dark:bg-slate-800/30">
              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1">Expo / React Native Framework</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
                Used for core application runtime, device feature access (audio, haptics), and local scheduled notification delivery.
              </p>
              <a
                href="https://expo.dev/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
              >
                Expo Privacy Policy ↗
              </a>
            </div>
          </section>

          {/* Section 4: Notifications & Permissions */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
              4. Device Permissions &amp; Notifications
            </h2>
            <p className="mb-4">
              Chess Binge requests minimal system permissions strictly necessary to deliver core features:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
                    <th className="py-2.5 px-3 font-semibold">Permission</th>
                    <th className="py-2.5 px-3 font-semibold">Purpose</th>
                    <th className="py-2.5 px-3 font-semibold">Mandatory?</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-600 dark:text-slate-300">
                  <tr>
                    <td className="py-2.5 px-3 font-mono text-xs text-amber-600 dark:text-amber-400">POST_NOTIFICATIONS</td>
                    <td className="py-2.5 px-3">Delivers local welcome message and daily reminder notifications (Afternoon 1 PM, 6 PM, 8 PM).</td>
                    <td className="py-2.5 px-3 font-medium text-slate-500">Optional (Opt-in)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-mono text-xs text-amber-600 dark:text-amber-400">INTERNET &amp; NETWORK_STATE</td>
                    <td className="py-2.5 px-3">Retrieves Google AdMob advertisements and checks connection status.</td>
                    <td className="py-2.5 px-3 font-medium text-emerald-600 dark:text-emerald-400">Required for Ads</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-mono text-xs text-amber-600 dark:text-amber-400">VIBRATE</td>
                    <td className="py-2.5 px-3">Provides tactile haptic feedback on piece moves, captures, and checkmate.</td>
                    <td className="py-2.5 px-3 font-medium text-slate-500">Optional</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-mono text-xs text-amber-600 dark:text-amber-400">SCHEDULE_EXACT_ALARM</td>
                    <td className="py-2.5 px-3">Triggers offline daily reminders at exact scheduled times.</td>
                    <td className="py-2.5 px-3 font-medium text-slate-500">Optional</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
              You can revoke any granted permission at any time directly through your phone: <code>Settings &gt; Apps &gt; Chess Binge &gt; Permissions</code>.
            </p>
          </section>

          {/* Section 5: Children's Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
              5. Children&apos;s Privacy (COPPA &amp; GDPR-K Compliance)
            </h2>
            <p className="mb-3">
              Chess Binge is intended for general audiences aged 13 and older (or aged 16 and older in the European Union).
            </p>
            <p className="mb-3">
              We do not knowingly collect, solicit, or maintain personally identifiable information from children under the age of 13. If you believe that a child has provided us with personal information, or if Google AdMob has inadvertently gathered such data, please contact us immediately at <a href="mailto:s.shankhdhar1981@gmail.com" className="text-emerald-600 dark:text-emerald-400 underline">s.shankhdhar1981@gmail.com</a>, and we will take immediate measures to remove the information.
            </p>
          </section>

          {/* Section 6: Data Retention & User Deletion Rights */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
              6. Data Retention, Control &amp; Deletion Rights
            </h2>
            <div className="space-y-3 text-slate-700 dark:text-slate-300">
              <p>
                <strong>How to Delete Your Gameplay Data:</strong> Since your game data is stored exclusively on your device, you can delete all records, history, ELO rating, and unlocked assets at any time by navigating to <code>Settings &gt; Apps &gt; Chess Binge &gt; Storage &gt; Clear Storage / Clear Data</code>, or by uninstalling the application.
              </p>
              <p>
                <strong>How to Opt-Out of Targeted Advertising:</strong> You can reset or delete your Google Advertising ID on Android via <code>Settings &gt; Google &gt; Ads &gt; Delete advertising ID</code>. Once deleted, advertisers will no longer be able to associate ad activity across different apps with your device.
              </p>
              <p>
                <strong>Inquiries &amp; Deletion Requests:</strong> For any questions regarding privacy or data rights, contact us at <a href="mailto:s.shankhdhar1981@gmail.com" className="text-emerald-600 dark:text-emerald-400 underline">s.shankhdhar1981@gmail.com</a>. We will respond promptly within 30 days.
              </p>
            </div>
          </section>

          {/* Section 7: GDPR & CCPA/CPRA Legal Rights */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
              7. Rights for European (GDPR) &amp; California (CCPA) Users
            </h2>
            <p className="mb-3">
              Depending on your location, you may have specific rights under data protection laws such as the General Data Protection Regulation (GDPR) or the California Consumer Privacy Act (CCPA):
            </p>
            <ul className="list-disc pl-6 space-y-1 text-slate-700 dark:text-slate-300">
              <li><strong>Right of Access &amp; Portability:</strong> Request details regarding data collected by third-party advertising partners.</li>
              <li><strong>Right to Erasure (&ldquo;Right to be Forgotten&rdquo;):</strong> Delete your stored local data and request removal of ad identifiers.</li>
              <li><strong>Right to Opt-Out of Ad Sale/Sharing:</strong> We do not sell personal data. You can opt out of personalized tracking via device ad settings.</li>
              <li><strong>Right to Non-Discrimination:</strong> You will receive equal gameplay service and functionality regardless of exercising your privacy rights.</li>
            </ul>
          </section>

          {/* Section 8: Security */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
              8. Security of Information
            </h2>
            <p>
              We prioritize the security of your data. The App leverages Android&apos;s native application sandboxing to isolate local storage from other applications on your device. Network communication conducted by advertising SDKs utilizes encrypted Transport Layer Security (HTTPS/TLS) protocols.
            </p>
          </section>

          {/* Section 9: Changes to Policy */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
              9. Updates to This Privacy Policy
            </h2>
            <p>
              We may periodically update this Privacy Policy to reflect app enhancements, legal requirements, or advertising policy updates. Any changes will be published directly on this page with a revised &ldquo;Effective Date&rdquo;. We recommend checking this page periodically to stay informed.
            </p>
          </section>

          {/* Section 10: Contact Us */}
          <section className="bg-slate-50 dark:bg-slate-800/40 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              10. Contact Information
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
              If you have any questions, suggestions, or concerns regarding this Privacy Policy or our practices, please feel free to reach out to the developer:
            </p>
            <div className="space-y-1 text-sm">
              <p><strong>Developer:</strong> Shivam Shankhdhar</p>
              <p>
                <strong>Email:</strong>{' '}
                <a
                  href="mailto:s.shankhdhar1981@gmail.com"
                  className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline"
                >
                  s.shankhdhar1981@gmail.com
                </a>
              </p>
              <p><strong>Application:</strong> Chess Binge (Android)</p>
              <p><strong>Website:</strong> <Link href="/" className="text-emerald-600 dark:text-emerald-400 hover:underline">Portfolio Home</Link></p>
            </div>
          </section>

        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} Shivam Shankhdhar. All rights reserved.</p>
          <p className="mt-1">
            Chess Binge • Package: <code className="text-xs">chess.binge</code>
          </p>
        </div>
      </div>
    </main>
  );
}
