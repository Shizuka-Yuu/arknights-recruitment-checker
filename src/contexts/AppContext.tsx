import React, { createContext, useState, useEffect } from 'react'
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

export { AppContext }

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
    const timer = setTimeout(() => {
      const savedLanguage = localStorage.getItem('language') as Language
      if (savedLanguage && ['ja', 'en'].includes(savedLanguage)) {
        setLanguageState(savedLanguage)
      }

      const savedTheme = localStorage.getItem('theme') as Theme
      if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
        setThemeState(savedTheme)
      }
    }, 0)
    
    return () => clearTimeout(timer)
  }, [])

  // 言語設定の保存
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem('language', newLanguage)
  }

  // テーマ設定の保存と適用（パフォーマンス最適化）
  const setTheme = (newTheme: Theme) => {
    if (theme === newTheme) return // 同じテーマなら処理をスキップ
    
    setThemeState(newTheme)
    
    // localStorageへの書き込みを非同期にしてメインスレッドをブロックしない
    setTimeout(() => {
      localStorage.setItem('theme', newTheme)
    }, 0)
  }

  // HTML要素にテーマクラスを適用（パフォーマンス最適化）
  useEffect(() => {
    // requestAnimationFrameで次のフレームまで処理を遅延
    requestAnimationFrame(() => {
      const root = document.documentElement
      
      // 最小限のDOM操作に
      root.className = root.className.replace(/\b(light|dark)\b/g, '') + ' ' + theme
      root.setAttribute('data-theme', theme)
      
      // bodyへの設定は削除（冗長なため）
    })
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
