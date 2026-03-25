"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Mail, Phone, ShieldCheck, TimerReset } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function CTA() {
  const { t } = useLanguage()

  const contactHighlights = [
    "Demo enfocada en tu operacion",
    "Respuesta comercial directa",
    "Acompanamiento desde implementacion",
  ]

  const trustSignals = [
    { icon: TimerReset, title: "Respuesta rapida", value: "24h" },
    { icon: ShieldCheck, title: "Implementacion guiada", value: "1 a 1" },
  ]

  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#0f172a_0%,#052e2b_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.16),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.06),transparent_26%)]" />
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.14) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.10),rgba(255,255,255,0.05))] p-6 shadow-[0_30px_80px_rgba(2,6,23,0.35)] backdrop-blur-2xl lg:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
                Executive next step
              </div>

              <h2 className="mt-6 text-3xl font-bold tracking-tight text-white lg:text-5xl">
                {t("cta.title")}
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/72">
                {t("cta.description")}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {contactHighlights.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm font-medium text-white/78"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a href="#contacto">
                  <Button
                    size="lg"
                    className="h-14 gap-2 rounded-full bg-white px-8 text-slate-950 shadow-[0_14px_30px_rgba(255,255,255,0.18)] hover:bg-white/92"
                  >
                    {t("cta.demo")}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </a>
                <a href="tel:8003260728">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 gap-2 rounded-full border-white/20 bg-white/4 px-8 text-white hover:bg-white/10"
                  >
                    <Phone className="h-4 w-4" />
                    {t("cta.call")}
                  </Button>
                </a>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[28px] border border-white/10 bg-slate-950/28 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/42">Canales directos</p>
                <div className="mt-4 grid gap-3">
                  <a
                    href="tel:8003260728"
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/6 px-4 py-4 text-white/88 transition-colors hover:bg-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-white/10 p-2">
                        <Phone className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-white/45">Telefono</p>
                        <p className="mt-1 font-semibold">800-326-0728</p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-white/45" />
                  </a>

                  <a
                    href="mailto:ventas@ecosat.com.mx"
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/6 px-4 py-4 text-white/88 transition-colors hover:bg-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-white/10 p-2">
                        <Mail className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-white/45">Email</p>
                        <p className="mt-1 font-semibold">ventas@ecosat.com.mx</p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-white/45" />
                  </a>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {trustSignals.map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.title}
                      className="rounded-[24px] border border-white/10 bg-white/6 p-5"
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-emerald-400/12 p-2 text-emerald-300">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-[0.18em] text-white/42">{item.title}</p>
                          <p className="mt-1 text-2xl font-bold text-white">{item.value}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
