"use client"

import { Cpu, Camera, Wrench, QrCode, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"

export function Solutions() {
  const { t } = useLanguage()

  const solutions = [
    {
      icon: Cpu,
      title: t("solutions.sense.title"),
      subtitle: t("solutions.sense.subtitle"),
      description: t("solutions.sense.description"),
      features: [t("solutions.sense.feature1"), t("solutions.sense.feature2"), t("solutions.sense.feature3")],
      color: "bg-chart-1",
    },
    {
      icon: Camera,
      title: t("solutions.audits.title"),
      subtitle: t("solutions.audits.subtitle"),
      description: t("solutions.audits.description"),
      features: [t("solutions.audits.feature1"), t("solutions.audits.feature2"), t("solutions.audits.feature3")],
      color: "bg-chart-2",
    },
    {
      icon: Wrench,
      title: t("solutions.mantiz.title"),
      subtitle: t("solutions.mantiz.subtitle"),
      description: t("solutions.mantiz.description"),
      features: [t("solutions.mantiz.feature1"), t("solutions.mantiz.feature2"), t("solutions.mantiz.feature3")],
      color: "bg-chart-3",
    },
    {
      icon: QrCode,
      title: t("solutions.citas.title"),
      subtitle: t("solutions.citas.subtitle"),
      description: t("solutions.citas.description"),
      features: [t("solutions.citas.feature1"), t("solutions.citas.feature2"), t("solutions.citas.feature3")],
      color: "bg-chart-4",
    },
  ]

  return (
    <section id="modulos" className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {t("solutions.badge")}
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {t("solutions.title1")}<span className="text-primary">{t("solutions.title2")}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("solutions.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((solution) => (
            <div
              key={solution.title}
              className="group relative flex flex-col p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-xl ${solution.color} flex items-center justify-center mb-5`}>
                <solution.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              
              <span className="text-xs font-medium text-primary uppercase tracking-wider mb-1">
                {solution.subtitle}
              </span>
              
              <h3 className="text-xl font-bold text-foreground mb-3">
                {solution.title}
              </h3>
              
              <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                {solution.description}
              </p>
              
              <ul className="space-y-2 mb-6">
                {solution.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Button variant="ghost" className="w-full justify-between group-hover:text-primary transition-colors">
                {t("solutions.learnMore")}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
