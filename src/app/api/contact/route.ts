import { NextRequest, NextResponse } from 'next/server';
import connectDB, { isDbConfigured } from '@/lib/db';
import Profile from '@/models/Profile';
import Message from '@/models/Message';
import { sendContactConfirmationEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Save to Database if DB is configured
    if (isDbConfigured()) {
      try {
        await connectDB();
        await Message.create({ name, email, message });
      } catch (dbErr) {
        console.warn('Could not save message to database:', dbErr);
      }
    }

    // Try sending email if SMTP is configured
    const hasSmtp = Boolean(process.env.GMAIL_USER && process.env.GMAIL_PASSWORD);
    if (hasSmtp) {
      try {
        let developerEmail = process.env.ADMIN_EMAIL || 's.shankhdhar1981@gmail.com';
        let developerName = 'Shivam Shankhdhar';

        if (isDbConfigured()) {
          try {
            const profile = await Profile.findOne();
            if (profile?.name) developerName = profile.name;
          } catch {}
        }

        await sendContactConfirmationEmail(
          email,
          name,
          message,
          developerEmail,
          developerName
        );
      } catch (emailErr) {
        console.warn('Could not send confirmation email:', emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Your message has been received! Thank you for reaching out.',
    });
  } catch (error: any) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process contact form' },
      { status: 500 }
    );
  }
}
