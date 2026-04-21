'use server';

import { sendEmail } from '@/lib/mail';

const RECAPTCHA_THRESHOLD = 0.5; // Minimum acceptable score (0.0 = bot, 1.0 = human)

async function verifyRecaptcha(token: string): Promise<{ success: boolean; score?: number }> {
  if (!token) return { success: false };

  try {
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    });
    const data = await res.json();
    console.log('reCAPTCHA result:', data);
    return { success: data.success && data.score >= RECAPTCHA_THRESHOLD, score: data.score };
  } catch (err) {
    console.error('reCAPTCHA verification error:', err);
    return { success: false };
  }
}

export async function submitContactForm(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const company = formData.get('company') as string;
  const message = formData.get('message') as string;
  const recaptchaToken = formData.get('recaptchaToken') as string;

  if (!name || !email || !message) {
    return { success: false, error: 'Faltan campos obligatorios' };
  }

  // Verify reCAPTCHA
  const captchaResult = await verifyRecaptcha(recaptchaToken);
  if (!captchaResult.success) {
    console.warn(`Formulario rechazado por reCAPTCHA (score: ${captchaResult.score})`);
    return { success: false, error: 'Verificación de seguridad fallida. Por favor recarga la página e intenta de nuevo.' };
  }

  const brandColor = '#10b981'; // Emerald
  const darkColor = '#0f172a'; // Slate
  const lightBg = '#f8fafc';

  try {
    // 1. Notificación para el administrador
    try {
      await sendEmail({
        to: process.env.CONTACT_RECEIVER || 'ventas@ecosat.com.mx',
        subject: `[SidonLanding] Nuevo contacto: ${name}`,
        html: `
          <div style="font-family: sans-serif; color: ${darkColor}; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
            <div style="background-color: ${darkColor}; padding: 20px; text-align: center;">
              <img src="cid:sidonlogo" alt="SIDÓN" style="height: 40px; width: auto;" />
            </div>
            <div style="padding: 30px; background-color: white;">
              <h2 style="margin-top: 0; color: ${brandColor};">Nueva Solicitud de Contacto</h2>
              <p style="border-left: 4px solid ${brandColor}; padding-left: 15px; font-style: italic; color: #64748b;">
                "Has recibido un nuevo mensaje desde el formulario de SidonLanding."
              </p>
              <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr><td style="padding: 8px 0; font-weight: bold; width: 100px;">Nombre:</td><td style="padding: 8px 0;">${name}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: ${brandColor}; text-decoration: none;">${email}</a></td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Empresa:</td><td style="padding: 8px 0;">${company || 'No especificada'}</td></tr>
              </table>
              <div style="margin-top: 20px; padding: 15px; background-color: ${lightBg}; border-radius: 8px;">
                <p style="margin-top: 0; font-weight: bold;">Mensaje:</p>
                <p style="margin-bottom: 0; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
            <div style="background-color: #f1f5f9; padding: 15px; text-align: center; font-size: 12px; color: #94a3b8;">
              Este es un correo generado automáticamente por SidonLanding.
            </div>
          </div>
        `,
      });
    } catch (adminErr) {
      console.error('Error enviando notificación al administrador:', adminErr);
    }

    // 2. Confirmación para el cliente
    if (!email.endsWith('.example') && !email.includes('example.com')) {
      try {
        await sendEmail({
          to: email,
          subject: 'Recibimos tu mensaje - SIDÓN',
          html: `
            <div style="font-family: sans-serif; color: ${darkColor}; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
              <div style="background-color: ${darkColor}; padding: 20px; text-align: center;">
                <img src="cid:sidonlogo" alt="SIDÓN" style="height: 40px; width: auto;" />
              </div>
              <div style="padding: 40px; background-color: white; text-align: center;">
                <h1 style="color: ${brandColor}; margin-top: 0;">¡Hola ${name}!</h1>
                <p style="font-size: 16px; line-height: 1.6;">Gracias por tu interés en <strong>SIDÓN</strong>. Hemos recibido tu mensaje correctamente y pronto nos pondremos en contacto contigo.</p>
                <div style="margin: 30px 0;">
                  <a href="https://sidon.mx" style="background-color: ${brandColor}; color: white; padding: 14px 28px; border-radius: 50px; text-decoration: none; font-weight: bold; display: inline-block;">Visitar nuestro sitio</a>
                </div>
                <p style="color: #64748b; font-size: 14px;">Estamos listos para transformar la inteligencia operativa de tu negocio.</p>
              </div>
              <div style="border-top: 1px solid #e2e8f0; padding: 20px; text-align: center; background-color: #f8fafc;">
                <p style="margin: 0; font-size: 12px; color: #94a3b8;">&copy; ${new Date().getFullYear()} SIDÓN Business Intelligence. Todos los derechos reservados.</p>
              </div>
            </div>
          `,
        });
      } catch (clientErr) {
        console.error('Error enviando confirmación al cliente:', clientErr);
      }
    }

    return { success: true };
  } catch (error) {
    console.error('Error general en el proceso de contacto:', error);
    return { success: false, error: 'Hubo un error al procesar tu solicitud.' };
  }
}
