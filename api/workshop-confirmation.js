// Vercel serverless function: POST /api/workshop-confirmation { registrationId }
//
// Emails a workshop registrant their confirmation (and the join link for online
// workshops). It only ever emails the address stored on a fresh registration,
// once, so it can't be used to send mail to arbitrary people.
//
// Required Vercel environment variables (server-only, NOT prefixed with VITE_):
//   RESEND_API_KEY             Resend API key with sending access
//   SUPABASE_SERVICE_ROLE_KEY  Supabase -> Project Settings -> API -> service_role key
// SUPABASE_URL is read from SUPABASE_URL or the existing VITE_SUPABASE_URL.

const FROM = 'CEC Educational Consult <no-reply@ceceducationalconsult.org>';
const REPLY_TO = 'contact@ceceducationalconsult.org';
const SITE_URL = 'https://ceceducationalconsult.org';
const LOGO_URL = 'https://res.cloudinary.com/qg0w6ewi/image/upload/v1786929268/cece_png.png';
const MAX_AGE_MINUTES = 15;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const escapeHtml = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const isSafeUrl = (value) => /^https:\/\/[^\s"'<>]+$/i.test(value || '');
const isWhatsAppGroup = (value) => isSafeUrl(value) && /^https:\/\/chat\.whatsapp\.com\//i.test(value);

const detailRow = (label, value) =>
  value
    ? `<tr><td style="padding:6px 0;color:#64748b;font-size:13px;width:90px;vertical-align:top;">${label}</td><td style="padding:6px 0;color:#0f172a;font-size:14px;font-weight:bold;">${escapeHtml(value)}</td></tr>`
    : '';

const buildEmail = ({ registration, workshop, meetingLink, whatsappGroupLink }) => {
  const firstName = escapeHtml((registration.name || '').trim().split(/\s+/)[0] || 'there');
  const when = [workshop.date, workshop.time].filter((v) => v && v.trim()).join(' · ');
  const price = !workshop.price || /^free$/i.test(workshop.price.trim()) ? 'Free' : workshop.price;
  const seats = registration.quantity > 1 ? `${registration.quantity} seats` : '';

  const joinBlock = isSafeUrl(meetingLink)
    ? `<tr><td style="padding:8px 32px 8px;">
         <div style="background:#f0f9fa;border:1px solid #cce8ec;border-radius:16px;padding:20px;text-align:center;">
           <p style="margin:0 0 12px;font-size:14px;color:#0f172a;font-weight:bold;">This is an online workshop. Join with this link:</p>
           <a href="${meetingLink}" style="display:inline-block;background:#126373;color:#ffffff;text-decoration:none;font-weight:bold;font-size:15px;padding:14px 32px;border-radius:14px;">Join the workshop</a>
           <p style="margin:12px 0 0;font-size:12px;color:#64748b;word-break:break-all;"><a href="${meetingLink}" style="color:#126373;">${escapeHtml(meetingLink)}</a></p>
         </div>
       </td></tr>`
    : '';

  const groupBlock = isWhatsAppGroup(whatsappGroupLink)
    ? `<tr><td style="padding:8px 32px 8px;">
         <div style="background:#effaf3;border:1px solid #c6ecd4;border-radius:16px;padding:20px;text-align:center;">
           <p style="margin:0 0 12px;font-size:14px;color:#0f172a;font-weight:bold;">Join the workshop WhatsApp group for updates and reminders:</p>
           <a href="${whatsappGroupLink}" style="display:inline-block;background:#25D366;color:#ffffff;text-decoration:none;font-weight:bold;font-size:15px;padding:14px 32px;border-radius:14px;">Join WhatsApp Group</a>
         </div>
       </td></tr>`
    : '';

  const html = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 12px;font-family:Arial,Helvetica,sans-serif;">
  <tr><td align="center">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #e2e8f0;">
      <tr><td style="height:5px;background:#126373;background-image:linear-gradient(90deg,#2ac0db,#fa7b2d,#2ac0db);font-size:0;line-height:0;">&nbsp;</td></tr>
      <tr><td align="center" style="padding:28px 32px 4px;">
        <img src="${LOGO_URL}" alt="CEC Educational Consult" width="140" style="display:block;width:140px;height:auto;border:0;">
      </td></tr>
      <tr><td style="padding:12px 32px 4px;">
        <h1 style="margin:0 0 10px;font-size:22px;line-height:1.3;color:#0f172a;">You're registered, ${firstName}!</h1>
        <p style="margin:0;font-size:15px;line-height:1.6;color:#475569;">Thank you for registering for <strong style="color:#0f172a;">${escapeHtml(workshop.title)}</strong>. Here are your details.</p>
      </td></tr>
      <tr><td style="padding:12px 32px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e2e8f0;border-bottom:1px solid #e2e8f0;">
          ${detailRow('When', when)}
          ${detailRow('Where', workshop.venue)}
          ${detailRow('Fee', price)}
          ${detailRow('Seats', seats)}
        </table>
      </td></tr>
      ${joinBlock}
      ${groupBlock}
      <tr><td style="padding:12px 32px 24px;">
        <p style="margin:0;font-size:13px;line-height:1.6;color:#64748b;">Keep this email so you have the details on the day. If you need to change anything, just reply to this email or WhatsApp us on +233 54 039 0029.</p>
      </td></tr>
      <tr><td style="padding:18px 32px;background:#f8fafc;border-top:1px solid #e2e8f0;">
        <p style="margin:0;font-size:12px;line-height:1.6;color:#94a3b8;">
          CEC Educational Consult · Accra, Ghana · <a href="${SITE_URL}/workshops" style="color:#126373;">ceceducationalconsult.org</a><br>
          WhatsApp +233 54 039 0029 · ${REPLY_TO}
        </p>
      </td></tr>
    </table>
  </td></tr>
</table>`;

  const text = [
    `You're registered, ${(registration.name || '').trim().split(/\s+/)[0] || 'there'}!`,
    '',
    `Workshop: ${workshop.title}`,
    when && `When: ${when}`,
    workshop.venue && `Where: ${workshop.venue}`,
    `Fee: ${price}`,
    seats && `Seats: ${seats}`,
    isSafeUrl(meetingLink) && `Join link: ${meetingLink}`,
    isWhatsAppGroup(whatsappGroupLink) && `WhatsApp group: ${whatsappGroupLink}`,
    '',
    'Questions? Reply to this email or WhatsApp +233 54 039 0029.'
  ]
    // Optional lines are `false`/'' when missing; keep only real strings (blank lines included)
    .filter((line) => typeof line === 'string')
    .join('\n');

  return { subject: `You're registered: ${workshop.title}`, html, text };
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const resendKey = process.env.RESEND_API_KEY;
  if (!supabaseUrl || !serviceKey || !resendKey) {
    return res.status(503).json({ error: 'Email is not configured yet' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  const registrationId = body.registrationId;
  if (!UUID.test(registrationId || '')) {
    return res.status(400).json({ error: 'Invalid registration' });
  }

  const db = (path, init = {}) =>
    fetch(`${supabaseUrl}/rest/v1/${path}`, {
      ...init,
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        'Content-Type': 'application/json',
        ...(init.headers || {})
      }
    });

  try {
    const regRes = await db(`inquiries?id=eq.${registrationId}&kind=eq.workshop&select=*`);
    const [registration] = regRes.ok ? await regRes.json() : [];
    if (!registration) return res.status(404).json({ error: 'Registration not found' });
    if (registration.confirmation_sent_at) return res.status(200).json({ sent: false, reason: 'already_sent' });
    if (!registration.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registration.email)) {
      return res.status(200).json({ sent: false, reason: 'no_email' });
    }
    const ageMinutes = (Date.now() - new Date(registration.created_at).getTime()) / 60000;
    if (ageMinutes > MAX_AGE_MINUTES) return res.status(200).json({ sent: false, reason: 'expired' });

    const [wsRes, linkRes] = await Promise.all([
      db(`workshops?id=eq.${registration.reference_id}&select=*`),
      db(`workshop_meeting_links?workshop_id=eq.${registration.reference_id}&select=*`)
    ]);
    const [workshop] = wsRes.ok ? await wsRes.json() : [];
    const [linkRow] = linkRes.ok ? await linkRes.json() : [];
    if (!workshop) return res.status(404).json({ error: 'Workshop not found' });

    // Claim the registration first so a double submit can't send two emails
    const claimRes = await db(`inquiries?id=eq.${registrationId}&confirmation_sent_at=is.null`, {
      method: 'PATCH',
      headers: { Prefer: 'return=representation' },
      body: JSON.stringify({ confirmation_sent_at: new Date().toISOString() })
    });
    const claimed = claimRes.ok ? await claimRes.json() : [];
    if (!claimed.length) return res.status(200).json({ sent: false, reason: 'already_sent' });

    const email = buildEmail({ registration, workshop, meetingLink: linkRow?.meeting_link || '', whatsappGroupLink: linkRow?.whatsapp_group_link || '' });
    const sendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: FROM, to: [registration.email], reply_to: REPLY_TO, ...email })
    });

    if (!sendRes.ok) {
      // Release the claim so it can be retried
      await db(`inquiries?id=eq.${registrationId}`, { method: 'PATCH', body: JSON.stringify({ confirmation_sent_at: null }) });
      const detail = await sendRes.text();
      console.error('Resend error', sendRes.status, detail);
      return res.status(502).json({ error: 'Could not send email' });
    }

    return res.status(200).json({ sent: true });
  } catch (err) {
    console.error('workshop-confirmation failed', err);
    return res.status(500).json({ error: 'Unexpected error' });
  }
}
