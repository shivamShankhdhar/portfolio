import nodemailer from 'nodemailer';

// ✅ Create transporter (robust config)
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER!,
    pass: process.env.GMAIL_PASSWORD!,
  },
});

// ✅ Verify transporter once (optional but helpful)
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Mail transporter error:', error);
  } else {
    console.log('✅ Mail server is ready');
  }
});

// ================= OTP EMAIL =================
export async function sendOTPEmail(
  email: string,
  otp: string,
  name?: string
) {
  try {
    const mailOptions = {
      from: `"Shivam Portfolio" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Your OTP for Portfolio Admin Access',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #FF6B35 0%, #FFA96D 100%); padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0;">Portfolio Admin</h1>
          </div>
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px;">
            <p>Hello ${name || 'Admin'},</p>
            <p>You requested an OTP. Use this:</p>
            <div style="background: white; border: 2px solid #FF6B35; padding: 20px; text-align: center; border-radius: 8px;">
              <h2 style="letter-spacing: 5px; color: #FF6B35;">${otp}</h2>
            </div>
            <p style="font-size: 12px; color: gray;">Expires in 10 minutes</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    console.log(`✅ OTP email sent to ${email}`);
    return { success: true };
  } catch (error) {
    console.error('❌ OTP email error:', error);
    return { success: false };
  }
}

// Helper to prevent HTML injection in emails
function escapeHtml(text: string): string {
  return (text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ================= CONTACT EMAIL =================
export async function sendContactConfirmationEmail(
  visitorEmail: string,
  visitorName: string,
  message: string,
  developerEmail: string,
  developerName: string,
  topic?: string
) {
  try {
    const safeVisitorName = escapeHtml(visitorName);
    const safeVisitorEmail = escapeHtml(visitorEmail);
    const safeDeveloperName = escapeHtml(developerName);
    const safeDeveloperEmail = escapeHtml(developerEmail);
    const safeTopic = topic ? escapeHtml(topic) : '';
    const formattedMessage = escapeHtml(message).replace(/\n/g, '<br/>');
    const formattedDate = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short',
    }) + ' IST';

    // 1. Client / Visitor Confirmation Email
    const visitorMail = {
      from: `"${developerName} via Portfolio" <${process.env.GMAIL_USER}>`,
      to: visitorEmail,
      replyTo: developerEmail,
      subject: `Message Received! Let's build something great — ${developerName}`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Message Received - ${safeDeveloperName}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0c0d14; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #0c0d14; padding: 32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 580px; background-color: #13141f; border-radius: 18px; border: 1px solid #25273b; overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);">
          <!-- Top Crimson Accent Bar -->
          <tr>
            <td style="height: 4px; background: linear-gradient(90deg, #ef4444 0%, #f43f5e 50%, #dc2626 100%); line-height: 0; font-size: 0;">&nbsp;</td>
          </tr>
          
          <!-- Header Banner -->
          <tr>
            <td style="padding: 32px 32px 24px 32px; background: linear-gradient(180deg, rgba(239, 68, 68, 0.1) 0%, rgba(19, 20, 31, 0) 100%);">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <!-- Monogram Badge -->
                    <div style="display: inline-block; width: 44px; height: 44px; line-height: 44px; border-radius: 12px; background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%); color: #ffffff; font-weight: 800; font-size: 18px; text-align: center; box-shadow: 0 4px 12px rgba(239, 68, 68, 0.35);">
                      SS
                    </div>
                    <div style="margin-top: 14px;">
                      <h1 style="margin: 0; font-size: 20px; font-weight: 800; color: #ffffff; letter-spacing: -0.02em;">
                        ${safeDeveloperName}
                      </h1>
                      <p style="margin: 4px 0 0 0; font-size: 13px; font-weight: 500; color: #f87171;">
                        Full Stack &amp; Mobile Engineer
                      </p>
                    </div>
                  </td>
                  <td align="right" valign="top">
                    <span style="display: inline-block; padding: 6px 12px; border-radius: 20px; background-color: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.3); color: #34d399; font-size: 11px; font-weight: 600;">
                      ● Available
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content Body -->
          <tr>
            <td style="padding: 0 32px 28px 32px;">
              <h2 style="margin: 0 0 12px 0; font-size: 22px; font-weight: 700; color: #ffffff; line-height: 1.3;">
                Thanks for reaching out, ${safeVisitorName}! 👋
              </h2>
              <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.6; color: #94a3b8;">
                I have received your message and wanted to confirm it reached me safely. I review every project requirement personally and will get back to you promptly.
              </p>

              <!-- Turnaround Callout -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 22px; background-color: rgba(239, 68, 68, 0.08); border-left: 3px solid #ef4444; border-radius: 0 10px 10px 0; padding: 12px 16px;">
                <tr>
                  <td style="font-size: 13px; color: #fca5a5; line-height: 1.5;">
                    ⏱️ <strong>Guaranteed Turnaround:</strong> You will hear back from me within <strong>12–24 business hours</strong>.
                  </td>
                </tr>
              </table>

              <!-- Submission Summary Card -->
              <div style="background-color: #1a1b2b; border: 1px solid #282a3f; border-radius: 14px; padding: 20px; margin-bottom: 24px;">
                <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #f87171; margin-bottom: 12px;">
                  Summary of Your Message
                </div>
                ${
                  safeTopic
                    ? `
                <div style="margin-bottom: 14px;">
                  <span style="font-size: 12px; color: #94a3b8;">Selected Topic:</span>
                  <span style="display: inline-block; margin-left: 6px; padding: 3px 10px; border-radius: 6px; background-color: rgba(239, 68, 68, 0.15); color: #fca5a5; font-size: 12px; font-weight: 600; border: 1px solid rgba(239, 68, 68, 0.25);">
                    ${safeTopic}
                  </span>
                </div>
                `
                    : ''
                }
                <div style="font-size: 13px; line-height: 1.6; color: #cbd5e1; word-break: break-word;">
                  ${formattedMessage}
                </div>
              </div>

              <!-- Action Button -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 24px 0 16px 0;">
                <tr>
                  <td align="center" style="border-radius: 12px; background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);">
                    <a href="https://github.com/shivamShankhdhar" target="_blank" style="display: inline-block; padding: 12px 26px; font-size: 13px; font-weight: 700; color: #ffffff; text-decoration: none; border-radius: 12px;">
                      Explore My Work &amp; GitHub &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 20px 0 0 0; font-size: 13px; line-height: 1.6; color: #94a3b8;">
                If your project is urgent or has attachments, feel free to reply directly to this email at <a href="mailto:${safeDeveloperEmail}" style="color: #f87171; text-decoration: underline;">${safeDeveloperEmail}</a>.
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 32px;">
              <div style="border-top: 1px solid #25273b;"></div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px 32px 32px; text-align: left;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <p style="margin: 0; font-size: 13px; font-weight: 700; color: #ffffff;">${safeDeveloperName}</p>
                    <p style="margin: 2px 0 0 0; font-size: 12px; color: #64748b;">Full Stack &amp; Mobile Engineer • Delhi, India (IST)</p>
                  </td>
                  <td align="right">
                    <a href="https://github.com/shivamShankhdhar" target="_blank" style="display: inline-block; margin-left: 12px; font-size: 12px; color: #f87171; text-decoration: none; font-weight: 600;">GitHub</a>
                    <a href="https://linkedin.com/in/shivam-shankhdhar" target="_blank" style="display: inline-block; margin-left: 12px; font-size: 12px; color: #f87171; text-decoration: none; font-weight: 600;">LinkedIn</a>
                  </td>
                </tr>
              </table>
              <p style="margin: 16px 0 0 0; font-size: 11px; color: #475569; line-height: 1.4;">
                This automated confirmation was generated because a message was submitted through Shivam Shankhdhar's portfolio.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    };

    // 2. Developer / Admin Notification Email
    const developerMail = {
      from: `"Portfolio Bot" <${process.env.GMAIL_USER}>`,
      to: developerEmail,
      replyTo: visitorEmail,
      subject: `🚀 New Inquiry from ${visitorName}${topic ? ` [${topic}]` : ''}`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Message from ${safeVisitorName}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0c0d14; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #0c0d14; padding: 32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 580px; background-color: #13141f; border-radius: 18px; border: 1px solid #25273b; overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);">
          <!-- Top Crimson Accent -->
          <tr>
            <td style="height: 4px; background: linear-gradient(90deg, #ef4444 0%, #f43f5e 50%, #dc2626 100%); line-height: 0; font-size: 0;">&nbsp;</td>
          </tr>
          
          <!-- Header -->
          <tr>
            <td style="padding: 28px 32px 20px 32px; background: linear-gradient(180deg, rgba(239, 68, 68, 0.1) 0%, rgba(19, 20, 31, 0) 100%);">
              <span style="display: inline-block; padding: 4px 10px; border-radius: 6px; background-color: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3); color: #f87171; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">
                🚀 New Portfolio Lead
              </span>
              <h1 style="margin: 6px 0 0 0; font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: -0.02em;">
                Inquiry from ${safeVisitorName}
              </h1>
            </td>
          </tr>

          <!-- Contact Details Table -->
          <tr>
            <td style="padding: 0 32px 24px 32px;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #1a1b2b; border: 1px solid #282a3f; border-radius: 14px; padding: 18px; margin-bottom: 20px;">
                <tr>
                  <td style="padding-bottom: 10px; width: 90px; font-size: 12px; font-weight: 600; color: #64748b;">Sender:</td>
                  <td style="padding-bottom: 10px; font-size: 13px; font-weight: 700; color: #ffffff;">${safeVisitorName}</td>
                </tr>
                <tr>
                  <td style="padding-bottom: 10px; font-size: 12px; font-weight: 600; color: #64748b;">Email:</td>
                  <td style="padding-bottom: 10px; font-size: 13px; font-weight: 600;">
                    <a href="mailto:${safeVisitorEmail}" style="color: #f87171; text-decoration: underline;">${safeVisitorEmail}</a>
                  </td>
                </tr>
                ${
                  safeTopic
                    ? `
                <tr>
                  <td style="padding-bottom: 10px; font-size: 12px; font-weight: 600; color: #64748b;">Topic:</td>
                  <td style="padding-bottom: 10px; font-size: 13px;">
                    <span style="display: inline-block; padding: 2px 8px; border-radius: 4px; background-color: rgba(239, 68, 68, 0.15); color: #fca5a5; font-size: 12px; font-weight: 600;">
                      ${safeTopic}
                    </span>
                  </td>
                </tr>
                `
                    : ''
                }
                <tr>
                  <td style="font-size: 12px; font-weight: 600; color: #64748b;">Received:</td>
                  <td style="font-size: 12px; color: #94a3b8;">${formattedDate}</td>
                </tr>
              </table>

              <!-- Message Body -->
              <div style="margin-bottom: 24px;">
                <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #f87171; margin-bottom: 8px;">
                  Message:
                </div>
                <div style="background-color: #1a1b2b; border: 1px solid #282a3f; border-left: 3px solid #ef4444; border-radius: 12px; padding: 18px; font-size: 14px; line-height: 1.6; color: #e2e8f0; word-break: break-word;">
                  ${formattedMessage}
                </div>
              </div>

              <!-- Reply Action -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-radius: 12px; background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);">
                    <a href="mailto:${safeVisitorEmail}?subject=Re: Your inquiry on Shivam Shankhdhar's Portfolio" style="display: inline-block; padding: 12px 24px; font-size: 13px; font-weight: 700; color: #ffffff; text-decoration: none; border-radius: 12px;">
                      Reply Directly to ${safeVisitorName} &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 16px 32px 24px 32px; border-top: 1px solid #25273b; text-align: left; font-size: 11px; color: #475569;">
              Portfolio Lead Notification • Generated by Shivam Portfolio API
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    };

    await Promise.all([
      transporter.sendMail(visitorMail),
      transporter.sendMail(developerMail),
    ]);

    console.log('✅ Themed contact emails sent successfully');
    return { success: true };
  } catch (error) {
    console.error('❌ Contact email error:', error);
    return { success: false };
  }
}