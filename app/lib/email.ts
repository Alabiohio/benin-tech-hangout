import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Benin Tech Fest <info@email.benintechfest.com.ng>';

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
        'List-Unsubscribe': '<mailto:info@email.benintechfest.com.ng?subject=unsubscribe>',
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

const EMAIL_BASE_URL = 'https://benintechhangoutpreview.vercel.app/assets/email';
const FOOTER_LOGO_URL = `${EMAIL_BASE_URL}/footerLogo.png`;

export interface SpeakerEmailData extends Pick<EmailData, 'name' | 'email'> {
  speakingCategory?: string;
  areaOfInterest?: string;
}

export async function sendSpeakerBriefEmail({ name, email, speakingCategory, areaOfInterest }: SpeakerEmailData): Promise<boolean> {
  try {
    if (!process.env.RESEND_API_KEY || !email) {
      console.warn('RESEND_API_KEY or recipient email is missing. Speaker brief email not sent.');
      return false;
    }

    const recipientName = name?.trim() || 'there';
    const submissionDate = new Date().toLocaleDateString('en-NG', { dateStyle: 'long' });
    const subject = 'Your speaker application has been received — Benin Tech Fest 2.0';
    const text = [
      `Hi ${recipientName},`,
      '',
      "Thanks for putting yourself forward to speak at Benin Tech Fest 2.0! We've received your application successfully and our programs team will review it shortly.",
      '',
      'Application details:',
      `  Speaking category: ${speakingCategory || 'N/A'}`,
      `  Area of interest: ${areaOfInterest || 'N/A'}`,
      `  Submission date: ${submissionDate}`,
      '',
      'While you await our response, go through the Speakers Brief:',
      SPEAKERS_BRIEF_URL,
      '',
      'Best regards,',
      'BTF 2.0 Team',
    ].join('\n');

    const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Benin Tech Fest 2.0 - Speaking Application Received</title><style>@media only screen and (max-width:480px){.btf-footer-row{display:block!important;}.btf-footer-logo{display:block!important;text-align:center!important;padding:0 0 10px 0!important;width:100%!important;}.btf-footer-logo img{margin:0 auto!important;}.btf-footer-copy{display:block!important;text-align:center!important;width:100%!important;}}</style></head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #111111; line-height: 1.5;">
  <div style="max-width: 650px; margin: 20px auto; background-color: #ffffff; border: 1px solid #e0e0e0; box-sizing: border-box;">
    <div style="width: 100%; background-color: #e5e5e5; text-align: center;">
      <img src="${EMAIL_BASE_URL}/speaker.png" alt="Benin Tech Fest 2.0 Speaking" style="width: 100%; height: auto; display: block;" />
    </div>
    <div style="padding: 30px 40px;">
      <h1 style="font-size: 28px; font-weight: 700; margin-top: 0; margin-bottom: 20px; color: #111111;">Your speaking application is in!</h1>
      <p style="margin-bottom: 20px;">Hi ${escapeHtml(recipientName)}</p>
      <p style="margin-bottom: 20px;">Thanks for putting yourself forward to speak at Benin Tech Fest 2.0! We&rsquo;ve received your application successfully and our programs team will review it shortly.</p>
      <p style="margin-bottom: 5px; font-weight: 700;">Application details</p>
      <ul style="list-style-type: disc; padding-left: 20px; margin: 0 0 20px 0;">
        <li style="margin-bottom: 5px;">Speaking category: ${escapeHtml(speakingCategory || 'N/A')}</li>
        <li style="margin-bottom: 5px;">Area of interest: ${escapeHtml(areaOfInterest || 'N/A')}</li>
        <li style="margin-bottom: 5px;">Submission date: ${escapeHtml(submissionDate)}</li>
      </ul>
      <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;" />
      <h2 style="font-size: 22px; font-weight: 700; margin-top: 0; margin-bottom: 20px; color: #111111;">What next?</h2>
      <ul style="list-style-type: disc; padding-left: 20px; margin: 0 0 30px 0;">
        <li style="margin-bottom: 18px;">
          <strong>We&rsquo;ll review your application</strong><br>
          Our programs team will review your submission and get in touch with you to discuss your exhibition plans and next steps.
        </li>
        <li style="margin-bottom: 18px;">
          <strong>Go through the speakers&rsquo; brief</strong><br>
          While you await our response, go through the speakers&rsquo; brief to get more details on the event theme and speakers&rsquo; expectations<br>
          <a href="${SPEAKERS_BRIEF_URL}" style="color: #0066ff; text-decoration: underline; font-weight: 600;">View speakers&rsquo; brief</a>
        </li>
        <li style="margin-bottom: 18px;">
          <strong>Session schedule</strong><br>
          Once your application is approved and finalised, we&rsquo;ll schedule your speaking session, guidelines, and other information you&rsquo;ll need to prepare for the event.
        </li>
      </ul>
      <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;" />
      <p style="margin-bottom: 25px;">We appreciate your interest in sharing your insights at Benin Tech Fest 2.0. We&rsquo;re looking forward to having you be part of the experience.</p>
      <p style="margin: 0;">Best regards,<br>BTF 2.0 Team</p>
    </div>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #e5e5e5;">
      <tr>
        <td style="padding: 20px 40px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
            <tr class="btf-footer-row">
              <td class="btf-footer-logo" style="vertical-align: middle; text-align: left;">
                <img src="${FOOTER_LOGO_URL}" alt="Benin Tech Fest Logo" style="height: 30px; width: auto; display: block;" />
              </td>
              <td class="btf-footer-copy" style="vertical-align: middle; text-align: right; font-size: 13px; color: #333333;">
                &copy; 2026 Benin Tech Fest
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
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

export interface ExhibitorEmailData extends Pick<EmailData, 'name' | 'email'> {
  companyName?: string;
  exhibitionPackage?: string;
}

export async function sendExhibitorBriefEmail({ name, email, companyName, exhibitionPackage }: ExhibitorEmailData): Promise<boolean> {
  try {
    if (!process.env.RESEND_API_KEY || !email) {
      console.warn('RESEND_API_KEY or recipient email is missing. Exhibitor brief email not sent.');
      return false;
    }

    const recipientName = name?.trim() || 'there';
    const company = companyName?.trim() || 'your organisation';
    const submissionDate = new Date().toLocaleDateString('en-NG', { dateStyle: 'long' });
    const subject = 'Your exhibition application has been received — Benin Tech Fest 2.0';
    const text = [
      `Hi ${recipientName},`,
      '',
      `Thank you for applying to exhibit at Benin Tech Fest 2.0 on behalf of ${company}. We've received your application successfully and our exhibition team will review it shortly.`,
      '',
      'Application details:',
      `  Company/organisation: ${company}`,
      `  Booth category: ${exhibitionPackage || 'N/A'}`,
      `  Submission date: ${submissionDate}`,
      '',
      'Explore the exhibition packages:',
      EXHIBITORS_BRIEF_URL,
      '',
      'Best regards,',
      'BTF 2.0 Team',
    ].join('\n');

    const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Benin Tech Fest 2.0 - Exhibition Application Received</title><style>@media only screen and (max-width:480px){.btf-footer-row{display:block!important;}.btf-footer-logo{display:block!important;text-align:center!important;padding:0 0 10px 0!important;width:100%!important;}.btf-footer-logo img{margin:0 auto!important;}.btf-footer-copy{display:block!important;text-align:center!important;width:100%!important;}}</style></head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #111111; line-height: 1.5;">
  <div style="max-width: 650px; margin: 20px auto; background-color: #ffffff; border: 1px solid #e0e0e0; box-sizing: border-box;">
    <div style="width: 100%; background-color: #00d287; text-align: center;">
      <img src="${EMAIL_BASE_URL}/exhibition.png" alt="Benin Tech Fest 2.0 Exhibition" style="width: 100%; height: auto; display: block;" />
    </div>
    <div style="padding: 30px 40px;">
      <h1 style="font-size: 28px; font-weight: 700; margin-top: 0; margin-bottom: 20px; color: #111111;">Your exhibition application is in!</h1>
      <p style="margin-bottom: 20px;">Hi ${escapeHtml(recipientName)}</p>
      <p style="margin-bottom: 20px;">Thank you for applying to exhibit at Benin Tech Fest 2.0 on behalf of ${escapeHtml(company)}. We&rsquo;ve received your application successfully and our exhibition team will review it shortly.</p>
      <p style="margin-bottom: 5px; font-weight: 700;">Application details</p>
      <ul style="list-style-type: disc; padding-left: 20px; margin: 0 0 20px 0;">
        <li style="margin-bottom: 5px;">Company/organisation: ${escapeHtml(company)}</li>
        <li style="margin-bottom: 5px;">Booth category: ${escapeHtml(exhibitionPackage || 'N/A')}</li>
        <li style="margin-bottom: 5px;">Submission date: ${escapeHtml(submissionDate)}</li>
      </ul>
      <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;" />
      <h2 style="font-size: 22px; font-weight: 700; margin-top: 0; margin-bottom: 20px; color: #111111;">What next?</h2>
      <ul style="list-style-type: disc; padding-left: 20px; margin: 0 0 30px 0;">
        <li style="margin-bottom: 18px;">
          <strong>We&rsquo;ll review your application</strong><br>
          Our exhibition team will review your submission and get in touch with you to discuss your exhibition plans and next steps.
        </li>
        <li style="margin-bottom: 18px;">
          <strong>Explore the exhibition packages</strong><br>
          While you await our response, take a look at our exhibition packages and see what&rsquo;s included with each option.<br>
          <a href="${EXHIBITORS_BRIEF_URL}" style="color: #0066ff; text-decoration: underline; font-weight: 600;">View exhibition packages</a>
        </li>
        <li style="margin-bottom: 18px;">
          <strong>Booth allocation</strong><br>
          Once your application is approved and finalised, we&rsquo;ll share your booth allocation, setup guidelines, and other information you&rsquo;ll need to prepare for the event.
        </li>
      </ul>
      <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;" />
      <p style="margin-bottom: 25px;">We appreciate your interest in showcasing your brand at Benin Tech Fest 2.0. We&rsquo;re looking forward to having you be part of the experience.</p>
      <p style="margin: 0;">Best regards,<br>BTF 2.0 Team</p>
    </div>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #e5e5e5;">
      <tr>
        <td style="padding: 20px 40px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
            <tr class="btf-footer-row">
              <td class="btf-footer-logo" style="vertical-align: middle; text-align: left;">
                <img src="${FOOTER_LOGO_URL}" alt="Benin Tech Fest Logo" style="height: 30px; width: auto; display: block;" />
              </td>
              <td class="btf-footer-copy" style="vertical-align: middle; text-align: right; font-size: 13px; color: #333333;">
                &copy; 2026 Benin Tech Fest
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
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

export async function sendRegistrationEmail({
  name,
  email,
  registrationId,
}: Pick<EmailData, 'name' | 'email'> & { registrationId?: string | number }): Promise<boolean> {
  try {
    if (!process.env.RESEND_API_KEY || !email) {
      console.warn('RESEND_API_KEY or recipient email is missing. Registration email not sent.');
      return false;
    }

    const recipientName = name?.trim() || 'there';
    const regDate = new Date().toLocaleDateString('en-NG', { dateStyle: 'long' });
    const registrationCode = registrationId ?? 'N/A';
    const subject = 'Your registration has been received — Benin Tech Fest 2.0';
    const text = [
      `Dear ${recipientName},`,
      '',
      'You are officially registered for Benin Tech Fest 2.0 happening 5th - 7th November, 2026 in Benin City, Edo State.',
      'Your spot is confirmed and we\'re excited to have you join us as we connect Edo to the future of tech.',
      '',
      `Registration ID: ${registrationCode}`,
      `Registration date: ${regDate}`,
      '',
      'Details on the event venue and other important updates will be communicated with you as they become available.',
      '',
      'Get your event pass: https://benintechfest.com.ng/ticket',
      'Join WhatsApp community: https://chat.whatsapp.com/J8KczV8DmAZ5ixIbkFT3EU',
      '',
      'Best regards,',
      'BTF 2.0 Team',
    ].join('\n');

    const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Benin Tech Fest 2.0 - Registration Confirmation</title><style>@media only screen and (max-width:480px){.btf-footer-row{display:block!important;}.btf-footer-logo{display:block!important;text-align:center!important;padding:0 0 10px 0!important;width:100%!important;}.btf-footer-logo img{margin:0 auto!important;}.btf-footer-copy{display:block!important;text-align:center!important;width:100%!important;}}</style></head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #111111; line-height: 1.5;">
  <div style="max-width: 650px; margin: 20px auto; background-color: #ffffff; border: 1px solid #e0e0e0; box-sizing: border-box;">
    <div style="width: 100%; background-color: #111111; text-align: center;">
      <img src="${EMAIL_BASE_URL}/register.png" alt="Benin Tech Fest 2.0" style="width: 100%; height: auto; display: block;" />
    </div>
    <div style="padding: 30px 40px;">
      <h1 style="font-size: 28px; font-weight: 700; margin-top: 0; margin-bottom: 20px; color: #111111;">Thanks for registering!</h1>
      <p style="margin-bottom: 20px;">Dear ${escapeHtml(recipientName)},</p>
      <p style="margin-bottom: 20px;">You are officially registered for Benin Tech Fest 2.0 happening <strong>5th - 7th November, 2026</strong> in Benin City, Edo State.</p>
      <p style="margin-bottom: 20px;">Your spot is confirmed and we&rsquo;re excited to have you join us as we connect Edo to the future of tech.</p>
      <p style="margin-bottom: 20px;">Registration ID: <strong>${escapeHtml(String(registrationCode))}</strong></p>
      <p style="margin-bottom: 20px;">Registration date: ${escapeHtml(regDate)}</p>
      <p style="margin-bottom: 30px;">Details on the event venue and other important updates will be communicated with you as they become available.</p>
      <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;" />
      <h2 style="font-size: 22px; font-weight: 700; margin-top: 0; margin-bottom: 20px; color: #111111;">What next?</h2>
      <ul style="list-style-type: disc; padding-left: 20px; margin: 0 0 30px 0;">
        <li style="margin-bottom: 18px;">
          <strong>Save the date</strong><br>
          Add BTF 2.0 to your calendar so you don&rsquo;t miss it.
        </li>
        <li style="margin-bottom: 18px;">
          <strong>Join the attendee community</strong><br>
          Connect with other attendees, get important updates, and stay in the loop.<br>
          <a href="https://chat.whatsapp.com/J8KczV8DmAZ5ixIbkFT3EU" style="color: #0066ff; text-decoration: underline; font-weight: 600;">Join the WhatsApp community</a>
        </li>
        <li style="margin-bottom: 18px;">
          <strong>Choose your event experience</strong><br>
          Your registration reserves your spot at BTF 2.0. To access the venue, event sessions and enjoy various attendee perks, you&rsquo;ll need to select and purchase an event pass.<br>
          <a href="https://benintechfest.com.ng/ticket" style="color: #0066ff; text-decoration: underline; font-weight: 600;">Get event pass</a>
        </li>
        <li style="margin-bottom: 18px;">
          <strong>Stay in the loop</strong><br>
          Connect with other attendees, follow BTF on social media and get important event updates and announcements
          <div style="margin-top: 8px;">
            <a href="https://chat.whatsapp.com/J8KczV8DmAZ5ixIbkFT3EU" style="color: #0066ff; text-decoration: underline; font-weight: 600; display: block; margin-bottom: 4px;">Join WhatsApp community</a>
            <a href="https://www.instagram.com/benintechfest/" style="color: #0066ff; text-decoration: underline; font-weight: 600; display: block; margin-bottom: 4px;">BTF on Instagram</a>
            <a href="https://www.linkedin.com/company/benin-tech-fest-page/" style="color: #0066ff; text-decoration: underline; font-weight: 600; display: block; margin-bottom: 4px;">BTF on LinkedIn</a>
            <a href="https://www.tiktok.com/@benintechfest" style="color: #0066ff; text-decoration: underline; font-weight: 600; display: block; margin-bottom: 4px;">BTF on TikTok</a>
            <a href="https://x.com/Benintechfest" style="color: #0066ff; text-decoration: underline; font-weight: 600; display: block;">BTF on X</a>
          </div>
        </li>
      </ul>
      <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;" />
      <p style="margin-bottom: 25px;">We can&rsquo;t wait to see you at Benin Tech Fest 2.0!</p>
      <p style="margin: 0;">Best regards,<br>BTF 2.0 Team</p>
    </div>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #e5e5e5;">
      <tr>
        <td style="padding: 20px 40px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
            <tr class="btf-footer-row">
              <td class="btf-footer-logo" style="vertical-align: middle; text-align: left;">
                <img src="${FOOTER_LOGO_URL}" alt="Benin Tech Fest Logo" style="height: 30px; width: auto; display: block;" />
              </td>
              <td class="btf-footer-copy" style="vertical-align: middle; text-align: right; font-size: 13px; color: #333333;">
                &copy; 2026 Benin Tech Fest
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
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
  registrationId?: string | number;
  totalPaid?: number;
}

export async function sendTicketConfirmationEmail(data: TicketConfirmationData): Promise<boolean> {
  try {
    if (!process.env.RESEND_API_KEY || !data.email) {
      console.warn('RESEND_API_KEY or recipient email is missing. Ticket confirmation email not sent.');
      return false;
    }

    const recipientName = `${data.firstName} ${data.lastName}`.trim() || 'there';
    const quantity = Number.isFinite(data.quantity) && data.quantity! > 0 ? data.quantity! : 1;
    const registrationId = data.registrationId ?? 'N/A';
    const totalPaid = Number.isFinite(data.totalPaid) ? data.totalPaid! : undefined;
    const formattedTotalPaid = totalPaid === undefined
      ? 'N/A'
      : new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(totalPaid / 100);
    const subject = `🎟️ Your ticket is confirmed — Benin Tech Fest 2.0`;

    const text = [
      `Hi ${recipientName},`,
      '',
      'Your payment was successful and your ticket to Benin Tech Fest 2.0 is confirmed!',
      '',
      `Ticket Type:        ${data.ticketLabel}`,
      `Tickets Bought:     ${quantity}`,
      `Registration ID:    ${registrationId}`,
      `Total Paid:         ${formattedTotalPaid}`,
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

    const purchaseDate = new Date().toLocaleDateString('en-NG', { dateStyle: 'long' });

    const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Benin Tech Fest 2.0 - Ticket Confirmation</title><style>@media only screen and (max-width:480px){.btf-footer-row{display:block!important;}.btf-footer-logo{display:block!important;text-align:center!important;padding:0 0 10px 0!important;width:100%!important;}.btf-footer-logo img{margin:0 auto!important;}.btf-footer-copy{display:block!important;text-align:center!important;width:100%!important;}.ticket-row{display:block!important;border-bottom:1px solid #d0d0d0!important;padding:10px 0!important;}.ticket-row:last-child{border-bottom:none!important;}.ticket-label{display:block!important;border:none!important;padding:0 0 4px 0!important;}.ticket-value{display:block!important;border:none!important;padding:0!important;text-align:left!important;word-break:break-all!important;}}</style></head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #111111; line-height: 1.5;">
  <div style="max-width: 650px; margin: 20px auto; background-color: #ffffff; border: 1px solid #e0e0e0; box-sizing: border-box;">
    <div style="width: 100%; background-color: #111111; text-align: center;">
      <img src="${EMAIL_BASE_URL}/ticket.png" alt="Benin Tech Fest 2.0" style="width: 100%; height: auto; display: block;" />
    </div>
    <div style="padding: 30px 40px;">
      <h1 style="font-size: 28px; font-weight: 700; margin-top: 0; margin-bottom: 20px; color: #111111;">Your ticket is confirmed!</h1>
      <p style="margin-bottom: 20px;">You are officially going to Benin Tech Fest 2.0!</p>
      <p style="margin-bottom: 20px;">Thanks for getting your event pass. Your payment was successful, and your ticket is now confirmed.</p>
      <p style="margin-bottom: 30px;">Please keep this email safe. You&rsquo;ll need to present your ticket details at check-in when you arrive at the venue to access the event.</p>
      <div style="background-color: #e5e5e5; border: 1.5px dashed #a0a0a0; border-radius: 12px; padding: 24px; margin-bottom: 30px;">
        <h2 style="font-size: 20px; font-weight: 700; margin-top: 0; margin-bottom: 16px; color: #111111;">Ticket detail</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #111111;">
          <tr class="ticket-row">
            <td class="ticket-label" style="padding: 10px 0; border-bottom: 1px solid #d0d0d0; color: #333333;">Registration ID:</td>
            <td class="ticket-value" style="padding: 10px 0; border-bottom: 1px solid #d0d0d0; text-align: right; font-weight: 700;">${escapeHtml(String(registrationId))}</td>
          </tr>
          <tr class="ticket-row">
            <td class="ticket-label" style="padding: 10px 0; border-bottom: 1px solid #d0d0d0; color: #333333;">Email:</td>
            <td class="ticket-value" style="padding: 10px 0; border-bottom: 1px solid #d0d0d0; text-align: right; font-weight: 700;">${escapeHtml(data.email)}</td>
          </tr>
          <tr class="ticket-row">
            <td class="ticket-label" style="padding: 10px 0; border-bottom: 1px solid #d0d0d0; color: #333333;">Ticket type:</td>
            <td class="ticket-value" style="padding: 10px 0; border-bottom: 1px solid #d0d0d0; text-align: right; font-weight: 700;">${escapeHtml(data.ticketLabel)}</td>
          </tr>
          <tr class="ticket-row">
            <td class="ticket-label" style="padding: 10px 0; border-bottom: 1px solid #d0d0d0; color: #333333;">Quantity:</td>
            <td class="ticket-value" style="padding: 10px 0; border-bottom: 1px solid #d0d0d0; text-align: right; font-weight: 700;">${quantity}</td>
          </tr>
          <tr class="ticket-row">
            <td class="ticket-label" style="padding: 10px 0; border-bottom: 1px solid #d0d0d0; color: #333333;">Total paid:</td>
            <td class="ticket-value" style="padding: 10px 0; border-bottom: 1px solid #d0d0d0; text-align: right; font-weight: 700;">${escapeHtml(formattedTotalPaid)}</td>
          </tr>
          <tr class="ticket-row">
            <td class="ticket-label" style="padding: 10px 0; border-bottom: 1px solid #d0d0d0; color: #333333;">Purchase date:</td>
            <td class="ticket-value" style="padding: 10px 0; border-bottom: 1px solid #d0d0d0; text-align: right; font-weight: 700;">${escapeHtml(purchaseDate)}</td>
          </tr>
          <tr class="ticket-row">
            <td class="ticket-label" style="padding: 10px 0 0 0; color: #333333;">Order ID:</td>
            <td class="ticket-value" style="padding: 10px 0 0 0; text-align: right; font-weight: 700;">${escapeHtml(data.paymentReference)}</td>
          </tr>
        </table>
      </div>
      <p style="margin-bottom: 25px;">We can&rsquo;t wait to see you at Benin Tech Fest 2.0!</p>
      <p style="margin: 0;">Best regards,<br>BTF 2.0 Team</p>
    </div>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #e5e5e5;">
      <tr>
        <td style="padding: 20px 40px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
            <tr class="btf-footer-row">
              <td class="btf-footer-logo" style="vertical-align: middle; text-align: left;">
                <img src="${FOOTER_LOGO_URL}" alt="Benin Tech Fest Logo" style="height: 30px; width: auto; display: block;" />
              </td>
              <td class="btf-footer-copy" style="vertical-align: middle; text-align: right; font-size: 13px; color: #333333;">
                &copy; 2026 Benin Tech Fest
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
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
