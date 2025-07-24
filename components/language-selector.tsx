"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/lib/i18n/language-context"
import type { Language } from "@/lib/i18n/translations"
import { motion, AnimatePresence } from "framer-motion"

interface LanguageOption {
  code: Language
  name: string
  nativeName: string
  flag: string
}

const languageOptions: LanguageOption[] = [
  { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳" },
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦" },
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷" },
]

export function LanguageSelector({onSuccess}) {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage)
    setIsOpen(false)
    onSuccess()
  }

  const currentLanguage = languageOptions.find((option) => option.code === language)

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Globe className="h-5 w-5" />
          <motion.span
            className="absolute bottom-0 right-0 text-[10px]"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          >
            {currentLanguage?.flag}
          </motion.span>
        </Button>
      </DropdownMenuTrigger>
      <AnimatePresence>
        {isOpen && (
          <DropdownMenuContent align="end" asChild forceMount>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {languageOptions.map((option) => (
                <DropdownMenuItem
                  key={option.code}
                  onClick={() => handleLanguageChange(option.code)}
                  className={language === option.code ? "bg-primary/10" : ""}
                  asChild
                >
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="flex items-center w-full cursor-pointer px-2 py-1.5"
                  >
                    <span className="mr-2">{option.flag}</span>
                    <span>{option.nativeName}</span>
                    {language === option.code && (
                      <motion.div
                        layoutId="activeLanguageIndicator"
                        className="ml-auto h-2 w-2 rounded-full bg-primary"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </motion.div>
                </DropdownMenuItem>
              ))}
            </motion.div>
          </DropdownMenuContent>
        )}
      </AnimatePresence>
    </DropdownMenu>
  )
}
