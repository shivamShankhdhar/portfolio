'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiMail, FiKey, FiArrowLeft, FiShield } from 'react-icons/fi';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, action: 'sendOTP' }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Failed to send OTP');

      toast.success('OTP verification code sent to your email');
      setStep('otp');
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP');
      toast.error(err.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, action: 'verifyOTP' }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Invalid OTP');

      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminEmail', data.email);
      toast.success('Logged in successfully!');
      router.push('/admin');
    } catch (err: any) {
      setError(err.message || 'Invalid OTP');
      toast.error(err.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#08080a] px-4 py-12 relative overflow-hidden">
      {/* Ambient Crimson Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-red-600/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="rounded-3xl border border-red-900/40 bg-[#111116]/95 backdrop-blur-xl p-8 shadow-2xl shadow-red-950/20">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-rose-700 text-white shadow-lg shadow-red-600/40 mb-4">
              <FiShield className="h-7 w-7" />
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Admin Authentication</h1>
            <p className="mt-1 text-xs text-slate-400">Secure passwordless verification via Email OTP</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-5 rounded-xl bg-red-950/40 border border-red-800/60 p-3.5 text-xs text-red-300">
              {error}
            </div>
          )}

          {step === 'email' ? (
            /* Step 1: Request OTP */
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
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-red-950/50 bg-[#161622] text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-colors"
                    placeholder="Enter your admin email"
                    autoFocus
                  />
                </div>
                <p className="mt-1.5 text-[11px] text-slate-500">
                  A 6-digit one-time code will be dispatched to your authorized email address.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || !email.trim()}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold text-sm shadow-md shadow-red-600/30 transition-all duration-200 disabled:opacity-50"
              >
                {loading ? 'Sending OTP...' : 'Send OTP Verification Code'}
              </button>
            </form>
          ) : (
            /* Step 2: Verify OTP */
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <p className="text-xs text-slate-400 text-center">
                Enter the 6-digit verification code sent to <strong className="text-white">{email}</strong>
              </p>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 text-center">
                  6-Digit OTP Code
                </label>
                <div className="relative">
                  <FiKey className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-red-950/50 bg-[#161622] text-white text-center text-xl tracking-widest font-mono focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
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
                {loading ? 'Verifying...' : 'Verify OTP & Access Dashboard'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep('email');
                  setOtp('');
                  setError('');
                }}
                className="w-full py-2 text-xs font-semibold text-slate-400 hover:text-white transition"
              >
                ← Use a different email address
              </button>
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
