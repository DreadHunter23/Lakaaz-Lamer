import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { Lang } from '../data/content'

type Ctx = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: <T extends { en: string; fr: string }>(value: T) => string
}

const LanguageContext = createContext<Ctx | null>(null)

function readLang(): Lang {
  try {
    const stored = localStorage.getItem('llm-lang')
    if (stored === 'fr' || stored === 'en') return stored
  } catch {
    /* ignore */
  }
  return 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readLang)
  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang: (next) => {
        setLangState(next)
        try {
          localStorage.setItem('llm-lang', next)
        } catch {
          /* ignore */
        }
      },
      t: (copy) => copy[lang],
    }),
    [lang],
  )
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider')
  return ctx
}
