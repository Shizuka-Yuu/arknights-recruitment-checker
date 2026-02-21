import React, { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { Language } from '../constants/dictionary'

type Theme = 'light' | 'dark'

interface AppContextType {
  language: Language
  setLanguage: (language: Language) => void
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: Theme
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

interface AppProviderProps {
  children: ReactNode
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // 言語設定
  const [language, setLanguageState] = useState<Language>('ja')
  
  // テーマ設定
  const [theme, setThemeState] = useState<Theme>('light')

  // localStorageから設定を読み込み
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && ['ja', 'en'].includes(savedLanguage)) {
      setLanguageState(savedLanguage)
    }

    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
      setThemeState(savedTheme)
    }
  }, [])

  // 言語設定の保存
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem('language', newLanguage)
  }

  // テーマ設定の保存と適用
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  // HTML要素にテーマクラスを適用
  useEffect(() => {
    const root = document.documentElement
    const body = document.body
    
    // クラスベースのテーマ設定
    root.classList.remove('light', 'dark')
    body.classList.remove('light', 'dark')
    root.classList.add(theme)
    body.classList.add(theme)
    
    // data-theme属性の設定
    root.setAttribute('data-theme', theme)
    body.setAttribute('data-theme', theme)
  }, [theme])

  const value: AppContextType = {
    language,
    setLanguage,
    theme,
    setTheme,
    resolvedTheme: theme
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}
