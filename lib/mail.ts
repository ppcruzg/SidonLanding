import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    ciphers: 'SSLv3',
    rejectUnauthorized: false
  }
});

export async function sendEmail({ to, subject, html, text }: { to: string, subject: string, html?: string, text?: string }) {
  const logoPath = path.join(process.cwd(), 'sidonBI.png');
  const hasLogo = fs.existsSync(logoPath);

  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    text,
    html,
    attachments: hasLogo ? [
      {
        filename: 'sidon-logo.png',
        path: logoPath,
        cid: 'sidonlogo' // Reference this in HTML as <img src="cid:sidonlogo">
      }
    ] : []
  });
  
  return info;
}
