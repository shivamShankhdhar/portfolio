'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiMail, FiKey, FiArrowLeft, FiShield, FiCheckCircle, FiRefreshCw } from 'react-icons/fi';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();

  // Admin Email & OTP state
  const [email, setEmail] = useState('');
  const [otpStep, setOtpStep] = useState<'email' | 'otp'>('email');
  const [otp, setOtp] = useState('');
  const [devOtpHint, setDevOtpHint] = useState<string | null>(null);

  // Loading & error statuses
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState('');

  // 1. Send OTP Request
  const handleSendOTP = async (e?: React.FormEvent, overrideEmail?: string) => {
    if (e) e.preventDefault();
    const targetEmail = (overrideEmail || email).trim().toLowerCase();

    if (!targetEmail) {
      setError('Please enter an admin email address');
      return;
    }

    setLoading(true);
    setError('');
    setDevOtpHint(null);

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: targetEmail,
          action: 'sendOTP',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send verification code');
      }

      if (data.devOtp) {
        setDevOtpHint(data.devOtp);
      }

      toast.success(data.message || 'OTP verification code dispatched');
      setOtpStep('otp');
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP');
      toast.error(err.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  // 2. Resend OTP Handler
  const handleResendOTP = async () => {
    setResending(true);
    setError('');
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          action: 'sendOTP',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to resend verification code');
      }

      if (data.devOtp) {
        setDevOtpHint(data.devOtp);
      }

      toast.success('New OTP verification code sent!');
    } catch (err: any) {
      setError(err.message || 'Failed to resend code');
      toast.error(err.message || 'Failed to resend code');
    } finally {
      setResending(false);
    }
  };

  // 3. Verify OTP Handler
  const handleVerifyOTP = async (e?: React.FormEvent, manualOtp?: string) => {
    if (e) e.preventDefault();
    const codeToVerify = (manualOtp || otp).replace(/\D/g, '').trim();

    if (!codeToVerify || codeToVerify.length !== 6) {
      setError('Please enter the 6-digit verification code');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          otp: codeToVerify,
          action: 'verifyOTP',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Invalid or expired verification code');
      }

      // Store credentials in localStorage
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminEmail', data.email);

      toast.success('Admin verified successfully! Access granted.');
      router.push('/admin');
    } catch (err: any) {
      setError(err.message || 'Invalid or expired OTP code');
      toast.error(err.message || 'Invalid or expired OTP code');
    } finally {
      setLoading(false);
    }
  };

  // One-click fill and submit
  const handleAutoFillAndVerify = (code: string) => {
    setOtp(code);
    handleVerifyOTP(undefined, code);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#08080a] px-4 py-12 relative overflow-hidden">
      {/* Ambient Crimson Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-red-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="rounded-3xl border border-red-900/40 bg-[#111116]/95 backdrop-blur-xl p-8 shadow-2xl shadow-red-950/20">
          
          {/* Shield Header */}
          <div className="text-center mb-6">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-rose-700 text-white shadow-lg shadow-red-600/40 mb-3.5">
              <FiShield className="h-7 w-7" />
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Admin Portal</h1>
            <p className="mt-1 text-xs text-slate-400">Secure One-Time Passcode (OTP) Authentication</p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-5 rounded-xl bg-red-950/60 border border-red-800/70 p-3.5 text-xs text-red-200 flex items-start gap-2 animate-fadeIn">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* STEP 1: ENTER EMAIL */}
          {otpStep === 'email' ? (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Admin Email Address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-800 bg-[#161622] text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-colors"
                    placeholder="admin@example.com"
                    autoFocus
                  />
                </div>

                <p className="mt-2 text-[11px] text-slate-400">
                  Enter your registered admin email address to receive a one-time verification code.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || !email.trim()}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold text-sm shadow-md shadow-red-600/30 transition-all duration-200 disabled:opacity-50 mt-1"
              >
                {loading ? 'Generating Code...' : 'Send OTP Verification Code'}
              </button>
            </form>
          ) : (
            /* STEP 2: ENTER OTP */
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div className="text-center">
                <p className="text-xs text-slate-400">
                  Verification code dispatched for:
                </p>
                <p className="text-sm font-semibold text-white font-mono mt-0.5">
                  {email}
                </p>
              </div>

              {/* Dev / Local Fallback Code Highlight Card */}
              {devOtpHint && (
                <div className="p-3.5 bg-gradient-to-r from-red-950/40 via-red-900/20 to-red-950/40 border border-red-700/50 rounded-2xl text-center space-y-2">
                  <p className="text-[11px] text-red-300 font-medium">
                    Email service not configured — One-Time Passcode:
                  </p>
                  <button
                    type="button"
                    onClick={() => handleAutoFillAndVerify(devOtpHint)}
                    className="w-full py-2 px-3 bg-red-600 hover:bg-red-500 text-white rounded-xl text-sm font-mono font-bold tracking-wider shadow-lg shadow-red-600/30 transition flex items-center justify-center gap-2 group"
                  >
                    <FiCheckCircle className="h-4 w-4 text-red-200 group-hover:scale-110 transition-transform" />
                    <span>Auto-Fill & Verify ({devOtpHint})</span>
                  </button>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 text-center">
                  Enter 6-Digit Code
                </label>
                <div className="relative">
                  <FiKey className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    required
                    maxLength={6}
                    value={otp}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                      setOtp(val);
                      if (val.length === 6) {
                        handleVerifyOTP(undefined, val);
                      }
                    }}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-800 bg-[#161622] text-white text-center text-2xl tracking-[0.3em] font-mono focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
                    placeholder="000000"
                    autoFocus
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold text-sm shadow-md shadow-red-600/30 transition-all duration-200 disabled:opacity-50"
              >
                {loading ? 'Verifying OTP...' : 'Verify OTP & Access Dashboard'}
              </button>

              <div className="flex items-center justify-between pt-1 text-xs">
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={resending || loading}
                  className="inline-flex items-center gap-1 text-red-400 hover:text-red-300 font-medium transition disabled:opacity-50"
                >
                  <FiRefreshCw className={`h-3 w-3 ${resending ? 'animate-spin' : ''}`} />
                  <span>{resending ? 'Sending...' : 'Resend Code'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setOtpStep('email');
                    setOtp('');
                    setError('');
                    setDevOtpHint(null);
                  }}
                  className="text-slate-400 hover:text-slate-200 transition"
                >
                  Change email
                </button>
              </div>
            </form>
          )}

          {/* Return Home Link */}
          <div className="mt-8 text-center pt-4 border-t border-slate-800/80">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-red-400 transition"
            >
              <FiArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Portfolio</span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
