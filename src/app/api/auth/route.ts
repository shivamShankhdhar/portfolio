import { NextRequest, NextResponse } from 'next/server';
import connectDB, { isDbConfigured } from '@/lib/db';
import { Admin } from '@/models/Admin';
import ValidAdmin from '@/models/ValidAdmin';
import { sendOTPEmail } from '@/lib/email';

// Global in-memory OTP cache across API routes and development reloads
interface StoredOTP {
  otp: string;
  expiry: number;
  email: string;
}

declare global {
  // eslint-disable-next-line no-var
  var __PORTFOLIO_OTP_STORE__: Map<string, StoredOTP> | undefined;
}

if (!global.__PORTFOLIO_OTP_STORE__) {
  global.__PORTFOLIO_OTP_STORE__ = new Map<string, StoredOTP>();
}

const otpStore = global.__PORTFOLIO_OTP_STORE__;

const KNOWN_ADMIN_EMAILS = [
  'er.shivam1214@gmail.com',
  's.shankhdhar1981@gmail.com',
];

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function generateToken(email: string): string {
  const secret = process.env.ADMIN_SECRET_KEY || 'portfolio-key-2026';
  return Buffer.from(`${email}:${Date.now()}:${secret}`).toString('base64');
}

async function verifyEmailAuthorized(normalizedEmail: string, configuredAdminEmail: string): Promise<boolean> {
  // 1. Direct match with configured or known admin emails
  if (
    normalizedEmail === configuredAdminEmail ||
    KNOWN_ADMIN_EMAILS.includes(normalizedEmail)
  ) {
    return true;
  }

  // 2. Check Database collections
  if (isDbConfigured()) {
    try {
      await connectDB();
      const validAdmin = await ValidAdmin.findOne({ email: normalizedEmail });
      if (validAdmin) return true;

      const admin = await Admin.findOne({ email: normalizedEmail });
      if (admin) return true;
    } catch (err) {
      console.warn('[Auth] Error checking admin authorization in DB:', err);
      // Fallback: allow known admin emails even if DB is having transient connection issues
      return (
        normalizedEmail === configuredAdminEmail ||
        KNOWN_ADMIN_EMAILS.includes(normalizedEmail)
      );
    }
  }

  return false;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, action, otp } = body;
    const normalizedEmail = (email || '').trim().toLowerCase();
    const configuredAdminEmail = (process.env.ADMIN_EMAIL || 's.shankhdhar1981@gmail.com').trim().toLowerCase();

    if (!normalizedEmail) {
      return NextResponse.json({ error: 'Email address is required' }, { status: 400 });
    }

    // Explicitly reject password logins as authentication is strictly OTP-based
    if (action === 'login' || action === 'password' || (password && !otp && action !== 'sendOTP')) {
      return NextResponse.json(
        {
          error: 'Password login is disabled. Please request and verify using a 6-digit OTP code.',
        },
        { status: 400 }
      );
    }

    // 1. Send OTP
    if (action === 'sendOTP') {
      const isAuthorized = await verifyEmailAuthorized(normalizedEmail, configuredAdminEmail);
      if (!isAuthorized) {
        return NextResponse.json(
          { error: 'This email is not authorized to access the admin panel.' },
          { status: 403 }
        );
      }

      const generatedOtp = generateOTP();
      const expiryMs = Date.now() + 15 * 60 * 1000; // 15 minutes validity
      const otpExpiryDate = new Date(expiryMs);

      // A. Save to high-reliability in-memory store
      otpStore.set(normalizedEmail, {
        otp: generatedOtp,
        expiry: expiryMs,
        email: normalizedEmail,
      });

      // If this is one of the known admin aliases, associate it with both to avoid mismatched alias issues
      if (KNOWN_ADMIN_EMAILS.includes(normalizedEmail)) {
        KNOWN_ADMIN_EMAILS.forEach((alias) => {
          otpStore.set(alias, {
            otp: generatedOtp,
            expiry: expiryMs,
            email: normalizedEmail,
          });
        });
      }

      // B. Save to MongoDB
      if (isDbConfigured()) {
        try {
          await connectDB();
          await Admin.findOneAndUpdate(
            { email: normalizedEmail },
            {
              $set: {
                email: normalizedEmail,
                otp: generatedOtp,
                otpExpiry: otpExpiryDate,
              },
            },
            { upsert: true, new: true }
          );
        } catch (dbErr) {
          console.warn('[Auth] MongoDB write warning during sendOTP (in-memory store active):', dbErr);
        }
      }

      console.log(`[Auth] OTP for ${normalizedEmail}: ${generatedOtp}`);

      // C. Dispatch via SMTP if configured
      const hasSmtp = Boolean(process.env.GMAIL_USER && process.env.GMAIL_PASSWORD);
      if (hasSmtp) {
        try {
          const emailResult = await sendOTPEmail(normalizedEmail, generatedOtp);
          if (emailResult.success) {
            return NextResponse.json({
              message: `Verification code sent to ${normalizedEmail}`,
              success: true,
            });
          }
        } catch (err) {
          console.warn('[Auth] SMTP send failed, providing fallback devOtp:', err);
        }
      }

      // If SMTP is not set or failed, return devOtp so admin can authenticate seamlessly
      return NextResponse.json({
        message: hasSmtp
          ? 'OTP generated and dispatched'
          : 'OTP generated. Click the code below to auto-fill and verify.',
        success: true,
        devOtp: generatedOtp,
      });
    }

    // 2. Verify OTP
    if (action === 'verifyOTP') {
      const cleanOtp = String(otp || '').replace(/\D/g, '').trim();

      if (!cleanOtp) {
        return NextResponse.json({ error: '6-digit verification code is required' }, { status: 400 });
      }

      if (cleanOtp.length !== 6) {
        return NextResponse.json({ error: 'Verification code must be 6 digits' }, { status: 400 });
      }

      let isOtpValid = false;
      let isOtpExpired = false;

      // Check In-Memory Store
      const memEntry = otpStore.get(normalizedEmail);
      if (memEntry) {
        if (memEntry.otp === cleanOtp) {
          if (memEntry.expiry < Date.now()) {
            isOtpExpired = true;
          } else {
            isOtpValid = true;
          }
        }
      }

      // Check Database if not already confirmed valid
      if (!isOtpValid && isDbConfigured()) {
        try {
          await connectDB();
          const adminDoc = await Admin.findOne({ email: normalizedEmail });
          if (adminDoc && adminDoc.otp) {
            const dbOtp = String(adminDoc.otp).trim();
            if (dbOtp === cleanOtp) {
              const expiryTime = adminDoc.otpExpiry ? new Date(adminDoc.otpExpiry).getTime() : 0;
              if (expiryTime > 0 && expiryTime < Date.now()) {
                isOtpExpired = true;
              } else {
                isOtpValid = true;
              }
            }
          }
        } catch (dbErr) {
          console.warn('[Auth] Database lookup warning during verifyOTP:', dbErr);
        }
      }

      // If the email is a known admin alias, also check alternate alias in case OTP was requested under it
      if (!isOtpValid && KNOWN_ADMIN_EMAILS.includes(normalizedEmail)) {
        for (const alias of KNOWN_ADMIN_EMAILS) {
          if (alias === normalizedEmail) continue;
          const altMem = otpStore.get(alias);
          if (altMem && altMem.otp === cleanOtp) {
            if (altMem.expiry < Date.now()) {
              isOtpExpired = true;
            } else {
              isOtpValid = true;
              break;
            }
          }
        }
      }

      if (isOtpExpired && !isOtpValid) {
        return NextResponse.json(
          { error: 'Verification code has expired. Please click Resend Code to receive a new one.' },
          { status: 400 }
        );
      }

      if (!isOtpValid) {
        return NextResponse.json(
          { error: 'Invalid verification code. Please check the 6 digits and try again.' },
          { status: 400 }
        );
      }

      // OTP is valid! Clean up memory store
      otpStore.delete(normalizedEmail);
      KNOWN_ADMIN_EMAILS.forEach((alias) => otpStore.delete(alias));

      // Update MongoDB record
      if (isDbConfigured()) {
        try {
          await connectDB();
          await Admin.updateOne(
            { email: normalizedEmail },
            {
              $set: {
                isVerified: true,
                lastLogin: new Date(),
              },
              $unset: {
                otp: 1,
                otpExpiry: 1,
              },
            },
            { upsert: true }
          );
        } catch (dbErr) {
          console.warn('[Auth] Could not update admin status in DB:', dbErr);
        }
      }

      const token = generateToken(normalizedEmail);
      return NextResponse.json({
        success: true,
        token,
        email: normalizedEmail,
        message: 'Admin authenticated successfully',
      });
    }

    return NextResponse.json({ error: 'Invalid authentication action' }, { status: 400 });
  } catch (error: any) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: error.message || 'Authentication process failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const configured = isDbConfigured();
  return NextResponse.json({
    status: 'ok',
    dbConfigured: configured,
    adminEmail: process.env.ADMIN_EMAIL || 's.shankhdhar1981@gmail.com',
  });
}
