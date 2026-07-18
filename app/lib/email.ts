import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Benin Tech Fest <noreply@info.oheo.site>';

export interface EmailData {
  name: string;
  email: string;
  phone: string;
  [key: string]: any;
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
      to: [data.email],
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
