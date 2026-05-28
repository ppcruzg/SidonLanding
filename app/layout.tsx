import React from "react"
import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { LanguageProvider } from "@/lib/language-context"
import { RecaptchaProvider } from "@/components/recaptcha-provider"
import { withBase } from "@/lib/paths"
import Script from 'next/script'
import './globals.css'

const _inter = Inter({ subsets: ["latin"] });
const _spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'SIDON Business Intelligence | Inteligencia Operativa para Retail',
  description: 'Plataforma de Business Intelligence para retail. IoT, AI CCTV, gestion de mantenimiento y control de acceso. Incrementa productividad y reduce costos operativos.',
  generator: 'v0.app',
  icons: {
    icon: withBase('/icon.png'),
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
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
        <LanguageProvider>
          <RecaptchaProvider>
            {children}
          </RecaptchaProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
