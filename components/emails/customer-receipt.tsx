import * as React from 'react';

interface CustomerReceiptEmailProps {
  name: string;
}

export const CustomerReceiptEmail = ({ name }: CustomerReceiptEmailProps) => {
  const mainColor = "#10b981"; // Emerald 500
  const secondaryColor = "#064e3b"; // Emerald 900
  const textColor = "#1f2937"; // Gray 800
  const lightTextColor = "#6b7280"; // Gray 500

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Gracias por contactar a Sidón</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: ${textColor}; margin: 0; padding: 0; background-color: #f9fafb; }
          .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
          .header { background: linear-gradient(135deg, ${secondaryColor} 0%, #022c22 100%); padding: 30px; text-align: center; }
          .logo { height: 32px; width: auto; margin-bottom: 0; }
          .content { padding: 40px; }
          .welcome-text { color: ${mainColor}; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em; font-size: 14px; margin-bottom: 10px; display: block; }
          h1 { margin: 0 0 20px; font-size: 28px; color: ${textColor}; font-weight: 800; }
          p { margin-bottom: 20px; color: ${lightTextColor}; font-size: 16px; }
          .highlight-box { background-color: #f0fdf4; border-left: 4px solid ${mainColor}; padding: 20px; border-radius: 8px; margin: 30px 0; }
          .highlight-box p { margin: 0; color: ${secondaryColor}; font-weight: 500; }
          .button { display: inline-block; padding: 14px 28px; background-color: ${mainColor}; color: #ffffff !important; text-decoration: none; border-radius: 12px; font-weight: bold; margin-top: 20px; box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.2); }
          .footer { background-color: #f3f4f6; padding: 40px; text-align: center; border-top: 1px solid #e5e7eb; }
          .footer-logo { height: 20px; width: auto; opacity: 0.6; margin-bottom: 20px; }
          .social-links { margin-bottom: 20px; }
          .social-links a { color: ${lightTextColor}; margin: 0 10px; text-decoration: none; font-size: 12px; }
          .copyright { font-size: 12px; color: #9ca3af; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="/sidonBI.png" alt="Sidón Logo" class="logo" style="height: 32px; width: auto;" height="32">
          </div>
          <div class="content">
            <span class="welcome-text">Confirmación de Recibido</span>
            <h1>Hola ${name},</h1>
            <p>Gracias por ponerte en contacto con el equipo de Sidón. Hemos recibido tu mensaje correctamente y nuestro área de ventas ya lo tiene en su radar.</p>
            
            <div class="highlight-box">
              <p>Un consultor experto analizará tu solicitud y se pondrá en contacto contigo en las próximas 24 horas hábiles.</p>
            </div>
            
            <p>Mientras tanto, te invitamos a explorar cómo nuestras soluciones de Inteligencia Operativa están transformando el sector retail.</p>
            
            <a href="https://sidon-landing.vercel.app" class="button">Visitar nuestro sitio</a>
          </div>
          <div class="footer">
            <img src="/EcosatN.png" alt="Ecosat Logo" class="footer-logo" style="height: 20px; width: auto;" height="20">
            <div class="social-links">
              <a href="#">LinkedIn</a>
              <a href="#">Twitter</a>
              <a href="#">Website</a>
            </div>
            <p class="copyright">© 2026 SIDÓN by ECOSAT. Todos los derechos reservados.<br>Ave. División del Norte 201, Chihuahua, Chih. México</p>
          </div>
        </div>
      </body>
    </html>
  `;
};
