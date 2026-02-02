"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, Mail } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function CTA() {
  const { t } = useLanguage()

  return (
    <section className="py-16 lg:py-24 bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-foreground/5 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-6">
            {t("cta.title")}
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 leading-relaxed">
            {t("cta.description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a href="#contacto">
              <Button
                size="lg"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 gap-2 h-12 px-8 w-full sm:w-auto"
              >
                {t("cta.demo")}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
            <a href="#contacto">
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 gap-2 h-12 px-8 bg-transparent w-full sm:w-auto"
              >
                <Phone className="w-4 h-4" />
                {t("cta.call")}
              </Button>
            </a>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-primary-foreground/80">
            <a href="tel:8003260728" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
              <Phone className="w-4 h-4" />
              <span>800-326-0728</span>
            </a>
            <a href="mailto:info@sidon.mx" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
              <Mail className="w-4 h-4" />
              <span>info@sidon.mx</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
