"use client"

import { useLanguage, type Language } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es")
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="gap-2 text-muted-foreground hover:text-foreground"
      aria-label={language === "es" ? "Switch to English" : "Cambiar a Español"}
    >
      <Globe className="w-4 h-4" />
      <span className="font-medium">{language === "es" ? "EN" : "ES"}</span>
    </Button>
  )
}
