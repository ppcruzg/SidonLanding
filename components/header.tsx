"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { LanguageToggle } from "./language-toggle"

export function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isModulesDropdownOpen, setIsModulesDropdownOpen] = useState(false)
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null)
  const { t } = useLanguage()

  const navLinks = [
    { href: "#soluciones", label: t("nav.solutions") },
    { href: "#roi", label: t("nav.roi") },
    { href: "#contacto", label: t("nav.contact") },
  ]

  const modulesSubmenu = [
    { href: "#soluciones", label: t("nav.modules.all") },
    { href: "/sense-iot", label: t("nav.modules.sense") },
    { href: "/smart-audits", label: t("nav.modules.audits") },
    { href: "/smart-citas", label: t("nav.modules.citas") },
    { href: "https://servicios.sidon.mx/", label: t("nav.modules.mantenimiento"), external: true },
    { href: "#duma-value", label: t("nav.modules.duma") },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleMouseEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout)
      setDropdownTimeout(null)
    }
    setIsModulesDropdownOpen(true)
  }

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsModulesDropdownOpen(false)
    }, 200)
    setDropdownTimeout(timeout)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-slate-950/35 backdrop-blur-xl"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/sidonBI.png"
              alt="SIDON"
              width={120}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          <div className="hidden lg:flex items-center justify-end flex-1">
            <div className="relative overflow-visible rounded-[18px] border border-white/15 bg-white/8 pl-3 pr-3 py-2 shadow-[0_18px_55px_rgba(15,23,42,0.22)] backdrop-blur-2xl">
              <div className="pointer-events-none absolute inset-0 rounded-[18px] bg-[linear-gradient(180deg,rgba(255,255,255,0.2),rgba(255,255,255,0.04)_42%,rgba(255,255,255,0.02))]" />
              <div className="relative flex items-center gap-2">
                <nav className="flex items-center gap-1 pr-2">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href || (link.href === "/" && pathname === "/")
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${isActive
                          ? "rounded-[12px] bg-white text-slate-900 shadow-sm"
                          : "rounded-[10px] text-white/78 hover:bg-white/8 hover:text-white"
                          }`}
                      >
                        {link.label}
                      </Link>
                    )
                  })}

                  <div
                    className="relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button className="flex items-center gap-1 rounded-[10px] px-4 py-2 text-sm font-medium text-white/78 transition-colors hover:bg-white/8 hover:text-white">
                      {t("nav.modules")}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isModulesDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isModulesDropdownOpen && (
                      <div className="absolute right-0 top-full mt-3 w-72 overflow-hidden rounded-[18px] border border-white/15 bg-slate-950/78 shadow-[0_24px_60px_rgba(2,6,23,0.45)] backdrop-blur-2xl">
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.03)_45%,rgba(255,255,255,0.02))]" />
                        <div className="relative p-2">
                          {modulesSubmenu.map((item) => {
                            const isActive = pathname === item.href
                            return item.external ? (
                              <a
                                key={item.href}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block rounded-[12px] px-4 py-3 text-sm font-medium text-white/72 transition-colors hover:bg-white/10 hover:text-white"
                                onClick={() => setIsModulesDropdownOpen(false)}
                              >
                                {item.label}
                              </a>
                            ) : (
                              <Link
                                key={item.href}
                                href={item.href}
                                className={`block rounded-[12px] px-4 py-3 text-sm font-medium transition-colors ${isActive
                                  ? "bg-white text-slate-900"
                                  : "text-white/72 hover:bg-white/10 hover:text-white"
                                  }`}
                                onClick={() => setIsModulesDropdownOpen(false)}
                              >
                                {item.label}
                              </Link>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </nav>

                <div className="h-8 w-px bg-white/12" />

                <div className="flex items-center gap-2 pl-1">
                  <LanguageToggle />
                  <a href="#contacto">
                    <Button className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_10px_30px_rgba(16,185,129,0.28)]">
                      {t("nav.requestDemo")}
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <LanguageToggle />
            <button
              type="button"
              className="p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-base font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="space-y-2">
              <div className="py-2 text-base font-medium text-foreground">
                {t("nav.modules")}
              </div>
              <div className="pl-4 space-y-2">
                {modulesSubmenu.map((item) => (
                  item.external ? (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )
                ))}
              </div>
            </div>

            <a href="#contacto" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-4">
                {t("nav.requestDemo")}
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
