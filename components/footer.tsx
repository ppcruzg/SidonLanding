"use client"

import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Mail, Linkedin } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function Footer() {
  const { t } = useLanguage()

  const footerLinks = {
    soluciones: [
      { label: t("solutions.sense.title"), href: "/sense-iot" },
      { label: t("solutions.audits.title"), href: "/smart-audits" },
      { label: t("solutions.mantiz.title"), href: "https://servicios.sidon.mx/" },
      { label: t("solutions.citas.title"), href: "/smart-citas" },
    ],
    empresa: [
      { label: t("footer.aboutUs"), href: "#soluciones" },
      { label: t("footer.successCases"), href: "#roi" },
      { label: t("footer.blog"), href: "#duma-value" },
      { label: t("footer.careers"), href: "#contacto" },
    ],
    soporte: [
      { label: t("footer.helpCenter"), href: "#contacto" },
      { label: t("footer.documentation"), href: "/sense-iot" },
      { label: t("footer.api"), href: "mailto:ventas@ecosat.com.mx" },
      { label: t("footer.systemStatus"), href: "tel:8003260728" },
    ],
  }

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/sidonBI.png"
                alt="SIDON"
                width={120}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </Link>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              {t("footer.tagline")}
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                <span>Ave. Division del Norte 201, Chihuahua, Chih. Mexico</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 flex-shrink-0 text-primary" />
                <span>800-326-0728</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 flex-shrink-0 text-primary" />
                <span>ventas@ecosat.com.mx</span>
              </div>
            </div>
          </div>

          {/* Soluciones */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">{t("footer.solutions")}</h3>
            <ul className="space-y-3">
              {footerLinks.soluciones.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("http") ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">{t("footer.company")}</h3>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Soporte */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">{t("footer.support")}</h3>
            <ul className="space-y-3">
              {footerLinks.soporte.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("mailto:") || link.href.startsWith("tel:") ? (
                    <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* ECOSAT Brand */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">{t("footer.ecosat.title")}</h3>
            <div className="mb-4">
              <Image
                src="/EcosatN.png"
                alt="ECOSAT"
                width={140}
                height={40}
                className="h-8 w-auto"
              />
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {t("footer.ecosat.tagline")}
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="mailto:ventas@ecosat.com.mx" className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors" aria-label="Email">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {t("footer.copyright")}
          </p>
          <div className="flex items-center gap-6">
            <Link href="#contacto" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t("footer.privacy")}
            </Link>
            <Link href="#soluciones" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t("footer.terms")}
            </Link>
            <Link href="#roi" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t("footer.cookies")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
