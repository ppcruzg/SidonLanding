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
    { href: "#modulos", label: t("nav.modules.all") },
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
        ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/sidonBI.png"
              alt="SIDÓN"
              width={120}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href === "/" && pathname === "/")
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-all duration-300 relative group ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {link.label}
                  {/* Subtle active underline */}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />
                  )}
                  {!isActive && (
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-full" />
                  )}
                </Link>
              )
            })}

            {/* Módulos Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {t("nav.modules")}
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isModulesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isModulesDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-background/95 backdrop-blur-md border border-border rounded-lg shadow-lg overflow-hidden">
                  {modulesSubmenu.map((item) => {
                    const isActive = pathname === item.href
                    return item.external ? (
                      <a
                        key={item.href}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-3 text-sm font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-accent"
                        onClick={() => setIsModulesDropdownOpen(false)}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`block px-4 py-3 text-sm font-medium transition-colors ${isActive
                          ? "text-primary bg-primary/5 border-l-2 border-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                          }`}
                        onClick={() => setIsModulesDropdownOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* CTA Button & Language Toggle */}
          <div className="hidden lg:flex items-center gap-2">
            <LanguageToggle />
            <a href="#contacto">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                {t("nav.requestDemo")}
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
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

      {/* Mobile Menu */}
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

            {/* Módulos Section in Mobile */}
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
