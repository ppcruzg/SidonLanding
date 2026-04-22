import React from "react"
import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { LanguageProvider } from "@/lib/language-context"
import { RecaptchaProvider } from "@/components/recaptcha-provider"
import { withBase } from "@/lib/paths"
import './globals.css'

const _inter = Inter({ subsets: ["latin"] });
const _spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'SIDON Business Intelligence | Inteligencia Operativa para Retail',
  description: 'Plataforma de Business Intelligence para retail. IoT, AI CCTV, gestion de mantenimiento y control de acceso. Incrementa productividad y reduce costos operativos.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: withBase('/icon-light-32x32.png'),
        media: '(prefers-color-scheme: light)',
      },
      {
        url: withBase('/icon-dark-32x32.png'),
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: withBase('/icon.svg'),
        type: 'image/svg+xml',
      },
    ],
    apple: withBase('/apple-icon.png'),
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans antialiased`}>
        <LanguageProvider>
          <RecaptchaProvider>
            {children}
          </RecaptchaProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
