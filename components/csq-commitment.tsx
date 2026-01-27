"use client"

import { Settings, GraduationCap, TrendingUp, Sparkles, CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function CSQCommitment() {
  const { t } = useLanguage()

  const commitmentPoints = [
    {
      icon: Settings,
      title: t("csq.point1.title"),
      description: t("csq.point1.description"),
    },
    {
      icon: GraduationCap,
      title: t("csq.point2.title"),
      description: t("csq.point2.description"),
    },
    {
      icon: TrendingUp,
      title: t("csq.point3.title"),
      description: t("csq.point3.description"),
    },
  ]

  return (
    <section className="py-20 lg:py-28 bg-muted/30 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            {t("csq.badge")}
          </span>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-6 text-balance">
            {t("csq.title1")}
            <span className="text-primary">{t("csq.title2")}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("csq.subtitle")}
          </p>
        </div>

        {/* Main Quote Card */}
        <div className="mb-12 max-w-4xl mx-auto">
          <div className="relative bg-card rounded-2xl border border-border p-8 lg:p-10 shadow-lg">
            <div className="absolute -top-4 left-8 w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <blockquote className="text-xl lg:text-2xl font-medium text-foreground text-center italic">
              {`"${t("csq.quote")}"`}
            </blockquote>
          </div>
        </div>

        {/* Commitment Points Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {commitmentPoints.map((point, index) => (
            <div
              key={point.title}
              className="group relative bg-card rounded-2xl border border-border p-8 hover:border-primary/50 hover:shadow-xl transition-all duration-500"
            >
              {/* Number indicator */}
              <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">{index + 1}</span>
              </div>

              {/* Icon container */}
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <point.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-3">
                {point.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {point.description}
              </p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-8 right-8 h-1 bg-primary/20 rounded-full group-hover:bg-primary/60 transition-colors duration-300" />
            </div>
          ))}
        </div>

        {/* Bottom highlight */}
        <div className="mt-12 text-center">
          <p className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-background/80 backdrop-blur-sm px-6 py-3 rounded-full border border-border">
            <Sparkles className="w-4 h-4 text-primary" />
            {t("csq.footer")}
          </p>
        </div>
      </div>
    </section>
  )
}
