import React from 'react'
import { useApp } from '../contexts/AppContext'
import { getUIText, type Language } from '../constants/dictionary'

export const Header: React.FC = () => {
  const { language, setLanguage, theme, setTheme } = useApp()
  const ui = getUIText(language)

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage)
  }

  const handleThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const getThemeIcon = () => {
    return theme === 'light' ? '☀️' : '🌙'
  }

  const getThemeLabel = () => {
    return language === 'ja' 
      ? (theme === 'light' ? 'ライト' : 'ダーク')
      : (theme === 'light' ? 'Light' : 'Dark')
  }

  return (
    <header className="text-center mb-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          {/* 言語切り替え */}
          <div className="flex rounded-lg p-1" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
            <button
              onClick={() => handleLanguageChange('ja')}
              className="px-3 py-1 rounded-md text-sm font-medium transition-colors"
              style={{
                backgroundColor: language === 'ja' ? 'var(--bg-secondary)' : 'transparent',
                color: language === 'ja' ? 'var(--text-primary)' : 'var(--text-secondary)',
                boxShadow: language === 'ja' ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' : 'none'
              }}
            >
              日本語
            </button>
            <button
              onClick={() => handleLanguageChange('en')}
              className="px-3 py-1 rounded-md text-sm font-medium transition-colors"
              style={{
                backgroundColor: language === 'en' ? 'var(--bg-secondary)' : 'transparent',
                color: language === 'en' ? 'var(--text-primary)' : 'var(--text-secondary)',
                boxShadow: language === 'en' ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' : 'none'
              }}
            >
              English
            </button>
          </div>
          
          {/* テーマ切り替え */}
          <button
            onClick={handleThemeChange}
            className="px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1"
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-primary)'
            }}
          >
            <span>{getThemeIcon()}</span>
            <span>{getThemeLabel()}</span>
          </button>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
        {ui.title}
      </h1>
      <p style={{ color: 'var(--text-secondary)' }}>
        {ui.subtitle}
      </p>
    </header>
  )
}
