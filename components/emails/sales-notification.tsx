import * as React from 'react';

interface SalesNotificationEmailProps {
  name: string;
  email: string;
  company: string;
  message: string;
}

export const SalesNotificationEmail = ({ name, email, company, message }: SalesNotificationEmailProps) => {
  const mainColor = "#10b981"; // Emerald 500
  const secondaryColor = "#0f172a"; // Slate 900
  const borderColor = "#e2e8f0"; // Slate 200

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Nuevo Prospecto - Sidón</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #334155; margin: 0; padding: 20px; background-color: #f8fafc; }
          .card { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid ${borderColor}; border-radius: 12px; overflow: hidden; }
          .badge { display: inline-block; padding: 4px 12px; background: ${mainColor}; color: white; border-radius: 20px; font-size: 12px; font-weight: bold; margin-bottom: 16px; }
          .header { padding: 32px; border-bottom: 1px solid ${borderColor}; background-color: ${secondaryColor}; color: white; }
          .content { padding: 32px; }
          .field { margin-bottom: 24px; }
          .label { font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; display: block; }
          .value { font-size: 16px; color: #1e293b; font-weight: 500; }
          .message-box { background: #f1f5f9; padding: 20px; border-radius: 8px; font-style: italic; color: #475569; border: 1px solid ${borderColor}; }
          .footer { padding: 24px; text-align: center; border-top: 1px solid ${borderColor}; background: #f8fafc; font-size: 12px; color: #94a3b8; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <div class="badge">NUEVO LEAD</div>
            <h1 style="margin: 0; font-size: 24px;">Contacto desde Landing Page</h1>
          </div>
          <div class="content">
            <div class="field">
              <span class="label">Nombre del Interesado</span>
              <span class="value">${name}</span>
            </div>
            <div class="field">
              <span class="label">Empresa</span>
              <span class="value">${company || 'No especificada'}</span>
            </div>
            <div class="field">
              <span class="label">Correo Electrónico</span>
              <span class="value"><a href="mailto:${email}" style="color: ${mainColor}; text-decoration: none;">${email}</a></span>
            </div>
            <div class="field">
              <span class="label">Mensaje / Requerimiento</span>
              <div class="message-box">${message}</div>
            </div>
          </div>
          <div class="footer">
            Este es un correo automático generado por SidonLanding.<br>
            Toma acción respondiendo antes de 24 horas para maximizar conversión.
          </div>
        </div>
      </body>
    </html>
  `;
};
