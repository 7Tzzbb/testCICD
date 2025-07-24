"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect, type ReactNode } from "react"
import { type Language, translations, type Translations } from "./translations"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: keyof Translations) => string
  dir: "ltr" | "rtl"
}

const defaultLanguage: Language = "zh"

const LanguageContext = createContext<LanguageContextType>({
  language: defaultLanguage,
  setLanguage: () => {},
  t: () => "",
  dir: "ltr",
})

export const useLanguage = () => useContext(LanguageContext)

interface LanguageProviderProps {
  children: ReactNode
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(defaultLanguage)
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr")
  const [mounted, setMounted] = useState(false)

  // 从本地存储加载语言设置
  useEffect(() => {
    setMounted(true)
    try {
      const savedLanguage = localStorage.getItem("language") as Language
      if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
        setLanguageState(savedLanguage)
      }
    } catch (error) {
      console.error("Failed to access localStorage:", error)
    }
  }, [])

  // 更新文档方向
  useEffect(() => {
    if (!mounted) return
    
    // 阿拉伯语是从右到左的语言
    const newDir = language === "ar" ? "rtl" : "ltr"
    // const newDir = "ltr"
    setDir(newDir)
    document.documentElement.dir = newDir
    document.documentElement.lang = language
  }, [language, mounted])

  // 设置语言并保存到本地存储
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    if (mounted) {
      try {
        localStorage.setItem("language", newLanguage)
      } catch (error) {
        console.error("Failed to save to localStorage:", error)
      }
    }
  }

  // 翻译函数
  const t = (key: keyof Translations): string => {
    return translations[language][key] || translations[defaultLanguage][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>{children}</LanguageContext.Provider>
}
