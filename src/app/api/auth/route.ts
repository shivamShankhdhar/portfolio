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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, action, otp } = body;
    const normalizedEmail = (email || '').trim().toLowerCase();
    const configuredAdminEmail = (process.env.ADMIN_EMAIL || 's.shankhdhar1981@gmail.com').trim().toLowerCase();

    // 1. Send OTP (Sole authentication method)
    if (action === 'sendOTP') {
      if (!email) {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 });
      }

      // Check if authorized
      const isAuthorized = normalizedEmail === configuredAdminEmail;
      if (!isAuthorized) {
        if (isDbConfigured()) {
          await connectDB();
          const validAdmin = await ValidAdmin.findOne({ email: normalizedEmail });
          if (!validAdmin) {
            return NextResponse.json(
              { error: 'This email is not authorized to access admin panel' },
              { status: 403 }
            );
          }
        } else {
          return NextResponse.json(
            { error: 'This email is not authorized to access admin panel' },
            { status: 403 }
          );
        }
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
              message: 'OTP sent to your email',
              success: true,
            });
          }
        } catch (err) {
          console.warn('[Auth] SMTP send failed, falling back to direct OTP return:', err);
        }
      }

      // Return clean success response without leaking OTP
      return NextResponse.json({
        message: 'OTP verification code sent to your email',
        success: true,
      });
    }

    // 2. Verify OTP
    if (action === 'verifyOTP') {
      if (!email || !otp) {
        return NextResponse.json({ error: 'Email and OTP are required' }, { status: 400 });
      }

      if (isDbConfigured()) {
        try {
          await connectDB();
          const admin = await Admin.findOne({ email: normalizedEmail });
          if (admin && admin.otp === otp) {
            if (admin.otpExpiry && admin.otpExpiry < new Date()) {
              return NextResponse.json({ error: 'OTP has expired' }, { status: 400 });
            }
            admin.isVerified = true;
            admin.otp = undefined;
            admin.otpExpiry = undefined;
            admin.lastLogin = new Date();
            await admin.save();

            const token = generateToken(normalizedEmail);
            return NextResponse.json({ success: true, token, email: normalizedEmail });
          } else {
            return NextResponse.json({ error: 'Invalid verification code' }, { status: 400 });
          }
        } catch (e) {
          console.warn('[Auth] DB OTP verification error:', e);
        }
      }

      return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: error.message || 'Authentication failed' },
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
