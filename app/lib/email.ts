import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Benin Tech Fest <noreply@info.oheo.site>';

export interface EmailData {
  name?: string;
  email?: string;
  phone?: string;
  [key: string]: unknown;
}

function escapeHtml(text: string | number | null | undefined): string {
  const normalized = text == null ? '' : String(text);
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return normalized.replace(/[&<>"']/g, (m) => map[m] || m);
}

export function renderPlainTextEmail(title: string, data: EmailData, fields: { label: string; value: string }[]): string {
  const fieldLines = fields.map((f) => `${f.label}: ${f.value ?? 'N/A'}`).join('\n');
  return [
    `Benin Tech Fest 2.0 — ${title} Confirmation`,
    '='.repeat(50),
    `Hi ${data.name},`,
    '',
    `Thank you for submitting your ${title}. We've received your details and will be in touch soon.`,
    '',
    "Here's a summary of what you submitted:",
    '-'.repeat(40),
    fieldLines,
    '-'.repeat(40),
    '',
    `Submitted on: ${new Date().toLocaleString()}`,
    '',
    'You received this email because you submitted a form on benintechfest.com.ng.',
    'If you did not make this submission, please ignore this email.',
    '',
    'Benin Tech Fest 2.0 | Benin City, Edo State, Nigeria',
    'benintechfest.com.ng',
  ].join('\n');
}

export function renderEmailTemplate(title: string, data: EmailData, fields: { label: string; value: string }[]): string {
  const rows = fields
    .map(
      (field) => `
        <tr>
          <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #0f172a; width: 40%; font-size: 14px;">${escapeHtml(field.label)}</td>
          <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; color: #334155; font-size: 14px;">${escapeHtml(field.value ?? '') || '<span style="color: #94a3b8;">N/A</span>'}</td>
        </tr>
      `
    )
    .join('');

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>${escapeHtml(title)}</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f8fbff; font-family: system-ui, -apple-system, sans-serif;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fbff; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                <tr>
                  <td style="background-color: #007cf9; padding: 32px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 800;">Benin Tech Fest 2.0</h1>
                    <p style="margin: 8px 0 0; color: #ffffff; font-size: 14px;">${escapeHtml(title)} Confirmation</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 32px;">
                    <p style="margin: 0 0 24px; color: #0f172a; font-size: 16px; line-height: 1.6;">Hi <strong>${escapeHtml(data.name)}</strong>,</p>
                    <p style="margin: 0 0 24px; color: #334155; font-size: 14px; line-height: 1.6;">Thank you for submitting your <strong>${escapeHtml(title)}</strong>. We&rsquo;ve received your details and will be in touch soon.</p>
                    <p style="margin: 0 0 16px; color: #0f172a; font-size: 14px; font-weight: 600;">Here&rsquo;s a summary of what you submitted:</p>
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                      ${rows}
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 24px 32px; background-color: #f8fbff; text-align: center;">
                    <p style="margin: 0 0 4px; color: #64748b; font-size: 12px;">Submitted on ${new Date().toLocaleString()}</p>
                    <p style="margin: 0 0 8px; color: #94a3b8; font-size: 12px;">You received this email because you submitted a form on <a href="https://benintechfest.com.ng" style="color: #94a3b8;">benintechfest.com.ng</a>.</p>
                    <p style="margin: 0 0 8px; color: #94a3b8; font-size: 12px;">If you did not make this submission, please ignore this email.</p>
                    <p style="margin: 0; color: #cbd5e1; font-size: 11px;">Benin Tech Fest 2.0 &bull; Benin City, Edo State, Nigeria &bull; <a href="https://benintechfest.com.ng" style="color: #cbd5e1;">benintechfest.com.ng</a></p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

export async function sendFormNotificationEmail(
  formType: string,
  data: EmailData,
  fields: { label: string; value: string }[]
): Promise<boolean> {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not configured. Email not sent.');
      return false;
    }

    const subject = `Your ${formType} – Benin Tech Fest 2.0`;
    const html = renderEmailTemplate(formType, data, fields);
    const text = renderPlainTextEmail(formType, data, fields);

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [data.email!],
      replyTo: FROM_EMAIL,
      subject,
      html,
      text,
      headers: {
        // Signals to inbox providers this is a transactional one-time mail
        'X-Entity-Ref-ID': `benintechfest-${Date.now()}`,
        'List-Unsubscribe': '<mailto:noreply@info.oheo.site?subject=unsubscribe>',
        'Precedence': 'bulk',
      },
    });

    if (error) {
      console.error('Failed to send email via Resend:', error);
      return false;
    }

    console.log(`Email sent successfully for ${formType} submission`);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

const SPEAKERS_BRIEF_URL = 'https://drive.google.com/file/d/1M9jEcDne1e6J0C8b5wZxvblZyA9auEFB/view?usp=drivesdk';

export async function sendSpeakerBriefEmail({ name, email }: Pick<EmailData, 'name' | 'email'>): Promise<boolean> {
  try {
    if (!process.env.RESEND_API_KEY || !email) {
      console.warn('RESEND_API_KEY or recipient email is missing. Speaker brief email not sent.');
      return false;
    }

    const recipientName = name?.trim() || 'there';
    const subject = 'Your speaker application has been received — Benin Tech Fest 2.0';
    const text = [
      `Hi ${recipientName},`,
      '',
      'Thank you for applying to speak at Benin Tech Fest 2.0. We have received your application.',
      'Please take a moment to read the Speakers Brief for important event and speaker information:',
      SPEAKERS_BRIEF_URL,
      '',
      'We will be in touch with next steps.',
      '',
      'Benin Tech Fest 2.0',
    ].join('\n');
    const html = `
      <!DOCTYPE html>
      <html lang="en">
        <body style="margin:0;padding:10px;background:#f8fbff;font-family:Arial,sans-serif;color:#0f172a;">
          <main style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;">
            <img src="https://pub-eeb28071668c42f88a2072344768bdf9.r2.dev/formBanner.png" style="width:100%;height:auto;display:block;" alt="Benin Tech Fest 2.0 Banner" />
            <div style="padding:32px;">            
              <p style="line-height:1.6;">Hi <strong>${escapeHtml(recipientName)}</strong>,</p>
              <p style="line-height:1.6;">Thank you for applying to speak at Benin Tech Fest 2.0. We have received your application.</p>
              <p style="line-height:1.6;">Please take a moment to read the Speakers Brief for important event and speaker information.</p>
              <p style="margin:28px 0;">
                <a href="${SPEAKERS_BRIEF_URL}" style="display:inline-block;border-radius:8px;background:#1570ef;padding:12px 20px;color:#ffffff;text-decoration:none;font-weight:700;">Read the Speakers Brief</a>
              </p>
              <p style="line-height:1.6;">We will be in touch with next steps.</p>
            </div>
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="padding: 24px 32px; background-color: #f8fbff; text-align: center;">
                  <p style="margin: 0 0 4px; color: #64748b; font-size: 12px;">Submitted on ${new Date().toLocaleString()}</p>
                  <p style="margin: 0 0 8px; color: #94a3b8; font-size: 12px;">You received this email because you submitted a form on <a href="https://benintechfest.com.ng" style="color: #94a3b8;">benintechfest.com.ng</a>.</p>
                  <p style="margin: 0 0 8px; color: #94a3b8; font-size: 12px;">If you did not make this submission, please ignore this email.</p>
                  <p style="margin: 0; color: #cbd5e1; font-size: 11px;">Benin Tech Fest 2.0 &bull; Benin City, Edo State, Nigeria &bull; <a href="https://benintechfest.com.ng" style="color: #cbd5e1;">benintechfest.com.ng</a></p>
                </td>
              </tr>
            </table>
          </main>
        </body>
      </html>`;

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      replyTo: FROM_EMAIL,
      subject,
      html,
      text,
    });

    if (error) {
      console.error('Failed to send speaker brief email via Resend:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error sending speaker brief email:', error);
    return false;
  }
}

const EXHIBITORS_BRIEF_URL = 'https://drive.google.com/file/d/1XNQbEX-FfHrOG2fwfZCTXRjig5OP1I1z/view?usp=drivesdk';

export async function sendExhibitorBriefEmail({ name, email }: Pick<EmailData, 'name' | 'email'>): Promise<boolean> {
  try {
    if (!process.env.RESEND_API_KEY || !email) {
      console.warn('RESEND_API_KEY or recipient email is missing. Exhibitor brief email not sent.');
      return false;
    }

    const recipientName = name?.trim() || 'there';
    const subject = 'Your exhibitor application has been received — Benin Tech Fest 2.0';
    const text = [
      `Hi ${recipientName},`,
      '',
      'Thank you for applying to exhibit at Benin Tech Fest 2.0. We have received your application.',
      'Please take a moment to read the Exhibitors Brief for important event and exhibitor information:',
      EXHIBITORS_BRIEF_URL,
      '',
      'We will be in touch with next steps.',
      '',
      'Benin Tech Fest 2.0',
    ].join('\n');
    const html = `
      <!DOCTYPE html>
      <html lang="en">
        <body style="margin:0;padding:10px;background:#f8fbff;font-family:Arial,sans-serif;color:#0f172a;">
          <main style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;">
            <img src="https://pub-eeb28071668c42f88a2072344768bdf9.r2.dev/formBanner.png" style="width:100%;height:auto;display:block;" alt="Benin Tech Fest 2.0 Banner" />
            <div style="padding:32px;">            
              <p style="line-height:1.6;">Hi <strong>${escapeHtml(recipientName)}</strong>,</p>
              <p style="line-height:1.6;">Thank you for applying to exhibit at Benin Tech Fest 2.0. We have received your application.</p>
              <p style="line-height:1.6;">Please take a moment to read the Exhibitors Brief for important event and exhibitor information.</p>
              <p style="margin:28px 0;">
                <a href="${EXHIBITORS_BRIEF_URL}" style="display:inline-block;border-radius:8px;background:#1570ef;padding:12px 20px;color:#ffffff;text-decoration:none;font-weight:700;">Read the Exhibitors Brief</a>
              </p>
              <p style="line-height:1.6;">We will be in touch with next steps.</p>
            </div>
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="padding: 24px 32px; background-color: #f8fbff; text-align: center;">
                  <p style="margin: 0 0 4px; color: #64748b; font-size: 12px;">Submitted on ${new Date().toLocaleString()}</p>
                  <p style="margin: 0 0 8px; color: #94a3b8; font-size: 12px;">You received this email because you submitted a form on <a href="https://benintechfest.com.ng" style="color: #94a3b8;">benintechfest.com.ng</a>.</p>
                  <p style="margin: 0 0 8px; color: #94a3b8; font-size: 12px;">If you did not make this submission, please ignore this email.</p>
                  <p style="margin: 0; color: #cbd5e1; font-size: 11px;">Benin Tech Fest 2.0 &bull; Benin City, Edo State, Nigeria &bull; <a href="https://benintechfest.com.ng" style="color: #cbd5e1;">benintechfest.com.ng</a></p>
                </td>
              </tr>
            </table>
          </main>
        </body>
      </html>`;

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      replyTo: FROM_EMAIL,
      subject,
      html,
      text,
    });

    if (error) {
      console.error('Failed to send exhibitor brief email via Resend:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error sending exhibitor brief email:', error);
    return false;
  }
}

export async function sendRegistrationEmail({ name, email }: Pick<EmailData, 'name' | 'email'>): Promise<boolean> {
  try {
    if (!process.env.RESEND_API_KEY || !email) {
      console.warn('RESEND_API_KEY or recipient email is missing. Registration email not sent.');
      return false;
    }

    const recipientName = name?.trim() || 'there';
    const subject = 'Your registration has been received — Benin Tech Fest 2.0';
    const text = [
      `Hi ${recipientName},`,
      '',
      'Thank you for registering to attend Benin Tech Fest 2.0. We have received your details.',
      'To complete your registration, please make sure to secure your ticket:',
      'https://benintechfest.com.ng/ticket',
      '',
      'We look forward to seeing you there.',
      '',
      'Benin Tech Fest 2.0',
    ].join('\n');
    const html = `
      <!DOCTYPE html>
      <html lang="en">
        <body style="margin:0;padding:10px;background:#f8fbff;font-family:Arial,sans-serif;color:#0f172a;">
          <main style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;">
            <img src="https://pub-eeb28071668c42f88a2072344768bdf9.r2.dev/formBanner.png" style="width:100%;height:auto;display:block;" alt="Benin Tech Fest 2.0 Banner" />
            <div style="padding:32px;">             
              <p style="line-height:1.6;">Hi <strong>${escapeHtml(recipientName)}</strong>,</p>
              <p style="line-height:1.6;">Thank you for registering to attend Benin Tech Fest 2.0. We have received your details.</p>
              <p style="line-height:1.6;">To complete your registration and secure your spot, please make sure to purchase your ticket.</p>
              <p style="margin:28px 0;">
                <a href="https://benintechfest.com.ng/ticket" style="display:inline-block;border-radius:8px;background:#1570ef;padding:12px 20px;color:#ffffff;text-decoration:none;font-weight:700;">Get Your Ticket</a>
              </p>
              <p style="line-height:1.6;">We look forward to seeing you there.</p>
            </div>
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="padding: 24px 32px; background-color: #f8fbff; text-align: center;">
                  <p style="margin: 0 0 4px; color: #64748b; font-size: 12px;">Submitted on ${new Date().toLocaleString()}</p>
                  <p style="margin: 0 0 8px; color: #94a3b8; font-size: 12px;">You received this email because you submitted a form on <a href="https://benintechfest.com.ng" style="color: #94a3b8;">benintechfest.com.ng</a>.</p>
                  <p style="margin: 0 0 8px; color: #94a3b8; font-size: 12px;">If you did not make this submission, please ignore this email.</p>
                  <p style="margin: 0; color: #cbd5e1; font-size: 11px;">Benin Tech Fest 2.0 &bull; Benin City, Edo State, Nigeria &bull; <a href="https://benintechfest.com.ng" style="color: #cbd5e1;">benintechfest.com.ng</a></p>
                </td>
              </tr>
            </table>
          </main>
        </body>
      </html>`;

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      replyTo: FROM_EMAIL,
      subject,
      html,
      text,
    });

    if (error) {
      console.error('Failed to send registration email via Resend:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error sending registration email:', error);
    return false;
  }
}

export interface TicketConfirmationData {
  firstName: string;
  lastName: string;
  email: string;
  ticketType: string;
  ticketLabel: string;
  paymentReference: string;
  quantity?: number;
}

export async function sendTicketConfirmationEmail(data: TicketConfirmationData): Promise<boolean> {
  try {
    if (!process.env.RESEND_API_KEY || !data.email) {
      console.warn('RESEND_API_KEY or recipient email is missing. Ticket confirmation email not sent.');
      return false;
    }

    const recipientName = `${data.firstName} ${data.lastName}`.trim() || 'there';
    const quantity = Number.isFinite(data.quantity) && data.quantity! > 0 ? data.quantity! : 1;
    const subject = `🎟️ Your ticket is confirmed — Benin Tech Fest 2.0`;

    const text = [
      `Hi ${recipientName},`,
      '',
      'Your payment was successful and your ticket to Benin Tech Fest 2.0 is confirmed!',
      '',
      `Ticket Type:        ${data.ticketLabel}`,
      `Tickets Bought:     ${quantity}`,
      `Name:               ${recipientName}`,
      `Email:              ${data.email}`,
      `Payment Reference:  ${data.paymentReference}`,
      '',
      'Please keep this email as proof of your registration.',
      'We will send further event details closer to the date.',
      '',
      'See you at Benin Tech Fest 2.0!',
      '',
      'Benin Tech Fest 2.0 | Benin City, Edo State, Nigeria',
      'benintechfest.com.ng',
    ].join('\n');

    const html = `
      <!DOCTYPE html>
      <html lang="en">
        <body style="margin:0;padding:10px;background:#f8fbff;font-family:Arial,sans-serif;color:#0f172a;">
          <main style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 15px 35px rgba(15,23,42,0.08);">
            <img src="https://pub-eeb28071668c42f88a2072344768bdf9.r2.dev/formBanner.png" style="width:100%;height:auto;display:block;" alt="Benin Tech Fest 2.0 Banner" />

            <div style="padding:32px 32px 20px; text-align:center;">
              <p style="margin:0 0 12px;color:#1570ef;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Payment confirmed</p>
              <h1 style="margin:0;color:#0f172a;font-size:28px;line-height:1.2;font-weight:800;">Your ticket is secured.</h1>
            </div>

            <div style="padding:0 32px;">
              <p style="margin:0;line-height:1.7;color:#334155;font-size:16px;">Hi <strong style="color:#0f172a;">${escapeHtml(recipientName)}</strong>,</p>
              <p style="margin:12px 0 0;line-height:1.7;color:#475569;font-size:14px;">
                Thank you for purchasing your ticket. Your payment has been verified, and your spot at Benin Tech Fest 2.0 is officially confirmed. We can't wait to see you there.
              </p>
            </div>

            <div style="padding:28px 32px 8px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f8fbff;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;">
                <tr>
                  <td style="background:linear-gradient(90deg,#1570ef,#0ea5e9);padding:14px 20px;">
                    <p style="margin:0;color:#ffffff;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">🎟️ Your Ticket</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid #e2e8f0;">
                          <span style="color:#64748b;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Ticket Type</span><br>
                          <span style="color:#0f172a;font-size:18px;font-weight:800;margin-top:4px;display:block;">${escapeHtml(data.ticketLabel)}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid #e2e8f0;">
                          <span style="color:#64748b;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Attendee</span><br>
                          <span style="color:#334155;font-size:15px;margin-top:4px;display:block;">${escapeHtml(recipientName)}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid #e2e8f0;">
                          <span style="color:#64748b;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Email</span><br>
                          <span style="color:#334155;font-size:15px;margin-top:4px;display:block;">${escapeHtml(data.email)}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid #e2e8f0;">
                          <span style="color:#64748b;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Tickets Bought</span><br>
                          <span style="color:#334155;font-size:15px;margin-top:4px;display:block;">${quantity}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;">
                          <span style="color:#64748b;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Payment Reference</span><br>
                          <span style="color:#1570ef;font-size:13px;font-family:monospace;margin-top:4px;display:block;">${escapeHtml(data.paymentReference)}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </div>

            <div style="padding:20px 32px 32px;text-align:center;">
              <p style="margin:0 0 20px;color:#64748b;font-size:13px;line-height:1.6;">
                Keep this email safe &mdash; it serves as your registration proof. Further event details will be sent closer to the date.
              </p>
              <a href="https://benintechfest.com.ng" style="display:inline-block;border-radius:10px;background:#1570ef;padding:14px 32px;color:#ffffff;text-decoration:none;font-weight:700;font-size:15px;">Visit Our Website</a>
            </div>

            <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="padding:24px 32px;background-color:#f8fbff;text-align:center;">
                  <p style="margin:0 0 4px;color:#64748b;font-size:12px;">Paid on ${new Date().toLocaleString('en-NG', { dateStyle: 'long', timeStyle: 'short' })}</p>
                  <p style="margin:0 0 8px;color:#94a3b8;font-size:12px;">
                    You received this because you purchased a ticket on <a href="https://benintechfest.com.ng" style="color:#94a3b8;">benintechfest.com.ng</a>.
                  </p>
                  <p style="margin:0;color:#cbd5e1;font-size:11px;">Benin Tech Fest 2.0 &bull; Benin City, Edo State, Nigeria &bull; <a href="https://benintechfest.com.ng" style="color:#cbd5e1;">benintechfest.com.ng</a></p>
                </td>
              </tr>
            </table>
          </main>
        </body>
      </html>`;

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [data.email],
      replyTo: FROM_EMAIL,
      subject,
      html,
      text,
      headers: {
        'X-Entity-Ref-ID': `btf-ticket-${data.paymentReference}-${Date.now()}`,
      },
    });

    if (error) {
      console.error('Failed to send ticket confirmation email via Resend:', error);
      return false;
    }

    console.log(`Ticket confirmation email sent to ${data.email} for ref ${data.paymentReference}`);
    return true;
  } catch (error) {
    console.error('Error sending ticket confirmation email:', error);
    return false;
  }
}
