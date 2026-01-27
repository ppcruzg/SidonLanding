"use client"

import { Headphones, Award, Clock, Users, MessageSquare, Shield } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function Support() {
  const { t } = useLanguage()

  const supportFeatures = [
    {
      icon: Award,
      title: t("support.feature1.title"),
      description: t("support.feature1.description"),
    },
    {
      icon: Headphones,
      title: t("support.feature2.title"),
      description: t("support.feature2.description"),
    },
    {
      icon: Clock,
      title: t("support.feature3.title"),
      description: t("support.feature3.description"),
    },
    {
      icon: Users,
      title: t("support.feature4.title"),
      description: t("support.feature4.description"),
    },
    {
      icon: MessageSquare,
      title: t("support.feature5.title"),
      description: t("support.feature5.description"),
    },
    {
      icon: Shield,
      title: t("support.feature6.title"),
      description: t("support.feature6.description"),
    },
  ]

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              {t("support.badge")}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              {t("support.title1")}<span className="text-primary">{t("support.title2")}</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {t("support.description")}
            </p>

            {/* Highlight Box */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                  <Award className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{t("support.csq.title")}</h3>
                  <p className="text-sm text-muted-foreground">{t("support.csq.subtitle")}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {t("support.csq.description")}
              </p>
            </div>
          </div>

          {/* Right Content - Feature Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {supportFeatures.map((feature) => (
              <div
                key={feature.title}
                className="group p-5 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
