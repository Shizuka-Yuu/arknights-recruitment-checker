import React, { useState } from 'react'
import { useApp } from '../hooks/useApp'
import { getUIText, type Language } from '../constants/dictionary'
import { InfoModal } from './InfoModal'

export const Header: React.FC = () => {
  const { language, setLanguage, theme, setTheme } = useApp()
  const ui = getUIText(language)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)

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
    <header className="relative mb-6" style={{ zIndex: 10 }}>
      {/* 上部ナビゲーションボタン */}
      <div className="flex justify-between items-center mb-4 relative" style={{ zIndex: 20 }}>
        {/* 左側：インフォボタン */}
        <div className="flex items-center space-x-2">
          <button
            className="h-9 w-9 flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
            style={{ backgroundColor: 'transparent' }}
            onClick={() => setIsInfoModalOpen(true)}
            title={language === 'ja' ? '使い方・仕様について' : 'About usage & specifications'}
          >
            <img 
              src={`${import.meta.env.BASE_URL || '/'}images/ui/info_btn.png`} 
              alt="Info" 
              className="h-7 w-7 object-contain"
            />
          </button>
        </div>

        {/* 右側：言語・テーマボタン */}
        <div className="flex items-center space-x-2">
          {/* 言語切り替え */}
          <div className="flex rounded-lg p-1 cursor-pointer items-center space-x-1" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>🌐</span>
            <button
              onClick={() => handleLanguageChange('ja')}
              className="px-3 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer"
              style={{
                backgroundColor: language === 'ja' ? 'var(--bg-secondary)' : 'transparent',
                color: language === 'ja' ? 'var(--text-primary)' : 'var(--text-secondary)',
                boxShadow: language === 'ja' ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' : 'none'
              }}
              title={language === 'ja' ? '日本語に切り替え' : 'Switch to Japanese'}
            >
              日本語
            </button>
            <button
              onClick={() => handleLanguageChange('en')}
              className="px-3 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer"
              style={{
                backgroundColor: language === 'en' ? 'var(--bg-secondary)' : 'transparent',
                color: language === 'en' ? 'var(--text-primary)' : 'var(--text-secondary)',
                boxShadow: language === 'en' ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' : 'none'
              }}
              title={language === 'en' ? 'Switch to English' : '英語に切り替え'}
            >
              English
            </button>
          </div>
          
          {/* テーマ切り替え */}
          <button
            onClick={handleThemeChange}
            className="px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 cursor-pointer hover:opacity-80"
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-primary)'
            }}
            title={language === 'ja' ? (theme === 'light' ? 'ダークテーマに切り替え' : 'ライトテーマに切り替え') : (theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme')}
          >
            <span>{getThemeIcon()}</span>
            <span>{getThemeLabel()}</span>
          </button>
        </div>
      </div>

      {/* タイトルエリア */}
      <div className="relative text-center">
        {/* 背景画像レイヤー */}
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{
            zIndex: 1
          }}
        >
          <img 
            src={`${import.meta.env.BASE_URL || '/'}images/ui/header_logo.png`}
            alt="Header Logo"
            className="object-contain"
            style={{
              filter: theme === 'light' ? 'invert(1)' : 'none',
              opacity: 0.8,
              maxWidth: '55%',
              maxHeight: '110px'
            }}
          />
        </div>
        
        {/* テキストレイヤー */}
        <div className="relative z-10">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            {ui.title}
          </h1>
          <p className="text-sm sm:text-lg" style={{ color: 'var(--text-secondary)' }}>
            {ui.subtitle}
          </p>
        </div>
      </div>
      
      {/* Info Modal */}
      <InfoModal isOpen={isInfoModalOpen} onClose={() => setIsInfoModalOpen(false)} />
    </header>
  )
}
