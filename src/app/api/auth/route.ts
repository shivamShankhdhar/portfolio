import { NextRequest, NextResponse } from 'next/server';
import connectDB, { isDbConfigured } from '@/lib/db';
import { Admin } from '@/models/Admin';
import ValidAdmin from '@/models/ValidAdmin';
import { sendOTPEmail } from '@/lib/email';

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function generateToken(email: string) {
  const secret = process.env.ADMIN_SECRET_KEY || 'portfolio-key-2026';
  return Buffer.from(`${email}:${Date.now()}:${secret}`).toString('base64');
}

async function verifyEmailAuthorized(normalizedEmail: string, configuredAdminEmail: string): Promise<boolean> {
  if (normalizedEmail === configuredAdminEmail) {
    return true;
  }

  if (isDbConfigured()) {
    try {
      await connectDB();
      // Check ValidAdmin collection
      const validAdmin = await ValidAdmin.findOne({ email: normalizedEmail });
      if (validAdmin) return true;

      // Check Admin collection
      const admin = await Admin.findOne({ email: normalizedEmail });
      if (admin) return true;
    } catch (err) {
      console.warn('[Auth] Error checking admin authorization in DB:', err);
      // If DB error occurs but email matches configured admin, allow access
      return normalizedEmail === configuredAdminEmail;
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

    if (!email) {
      return NextResponse.json({ error: 'Email address is required' }, { status: 400 });
    }

    // 1. Password Login (Direct Authentication)
    if (action === 'login' || action === 'password' || (password && !otp && action !== 'sendOTP')) {
      if (!password) {
        return NextResponse.json({ error: 'Password is required' }, { status: 400 });
      }

      const isAuthorized = await verifyEmailAuthorized(normalizedEmail, configuredAdminEmail);
      if (!isAuthorized) {
        return NextResponse.json(
          { error: 'This email is not registered or authorized as an admin' },
          { status: 403 }
        );
      }

      const configuredPassword = process.env.ADMIN_PASSWORD || 'admin123';
      if (password !== configuredPassword) {
        return NextResponse.json({ error: 'Incorrect admin password' }, { status: 401 });
      }

      // Mark admin record in DB if available
      if (isDbConfigured()) {
        try {
          await connectDB();
          let admin = await Admin.findOne({ email: normalizedEmail });
          if (!admin) {
            admin = new Admin({
              email: normalizedEmail,
              name: 'Admin',
              isVerified: true,
              lastLogin: new Date(),
            });
          } else {
            admin.isVerified = true;
            admin.lastLogin = new Date();
          }
          await admin.save();
        } catch (dbErr) {
          console.warn('[Auth] Could not update admin in DB during password login:', dbErr);
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

    // 2. Send OTP
    if (action === 'sendOTP') {
      const isAuthorized = await verifyEmailAuthorized(normalizedEmail, configuredAdminEmail);
      if (!isAuthorized) {
        return NextResponse.json(
          { error: 'This email is not authorized to access admin panel' },
          { status: 403 }
        );
      }

      const generatedOtp = generateOTP();
      const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      if (isDbConfigured()) {
        try {
          await connectDB();
          let admin = await Admin.findOne({ email: normalizedEmail });
          if (!admin) {
            admin = new Admin({ email: normalizedEmail, otp: generatedOtp, otpExpiry });
          } else {
            admin.otp = generatedOtp;
            admin.otpExpiry = otpExpiry;
          }
          await admin.save();
        } catch (e) {
          console.warn('[Auth] Could not save OTP to DB:', e);
        }
      }

      console.log(`[Auth] OTP for ${normalizedEmail}: ${generatedOtp}`);

      const hasSmtp = Boolean(process.env.GMAIL_USER && process.env.GMAIL_PASSWORD);
      if (hasSmtp) {
        try {
          const emailResult = await sendOTPEmail(normalizedEmail, generatedOtp);
          if (emailResult.success) {
            return NextResponse.json({
              message: 'OTP sent to your email address',
              success: true,
            });
          }
        } catch (err) {
          console.warn('[Auth] SMTP send failed:', err);
        }
      }

      // If SMTP is unconfigured or failed, return code to ensure admin isn't locked out
      return NextResponse.json({
        message: hasSmtp
          ? 'OTP generated and dispatched'
          : 'OTP generated. (Email SMTP not configured; use one-time passcode below or use password login)',
        success: true,
        devOtp: generatedOtp,
      });
    }

    // 3. Verify OTP
    if (action === 'verifyOTP') {
      if (!otp) {
        return NextResponse.json({ error: 'Verification code is required' }, { status: 400 });
      }

      if (isDbConfigured()) {
        try {
          await connectDB();
          const admin = await Admin.findOne({ email: normalizedEmail });
          if (admin && admin.otp === otp) {
            if (admin.otpExpiry && admin.otpExpiry < new Date()) {
              return NextResponse.json({ error: 'OTP has expired. Please request a new code.' }, { status: 400 });
            }
            admin.isVerified = true;
            admin.otp = undefined;
            admin.otpExpiry = undefined;
            admin.lastLogin = new Date();
            await admin.save();

            const token = generateToken(normalizedEmail);
            return NextResponse.json({ success: true, token, email: normalizedEmail });
          }
        } catch (e) {
          console.warn('[Auth] DB OTP verification error:', e);
        }
      }

      return NextResponse.json({ error: 'Invalid or expired verification code' }, { status: 400 });
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
