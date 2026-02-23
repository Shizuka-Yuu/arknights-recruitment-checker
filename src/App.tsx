import { useState } from 'react'
import { AppProvider } from './contexts/AppContext'
import { useApp } from './hooks/useApp'
import { useCharacters } from './hooks/useCharacters'
import { useRecruitmentCalculator } from './hooks/useRecruitmentCalculator'
import { getUIText } from './constants/dictionary'
import { Header } from './components/Header'
import { TagSelector } from './components/TagSelector'
import { CharacterGrid } from './components/CharacterGrid'
import { AllCombinationResults } from './components/AllCombinationResults'
import { ScrollToTop } from './components/ScrollToTop'
import './App.css'

function AppContent() {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [hideLowRarity, setHideLowRarity] = useState(false)
  const [overlayMessage, setOverlayMessage] = useState<string | null>(null)
  const { language } = useApp()
  const ui = getUIText(language)
  const { characters, loading } = useCharacters()
  const searchResult = useRecruitmentCalculator(characters, selectedTags)

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const handleClearAll = () => {
    setSelectedTags([])
  }

  const handleLowRarityToggle = (hide: boolean) => {
    setHideLowRarity(hide)
    // オーバーレイメッセージを表示
    const message = language === 'ja' 
      ? (hide ? '★1~2キャラクターが検索結果から非表示になりました' : '★1~2キャラクターが検索結果に表示されます')
      : (hide ? '★1~2 characters are now hidden from search results' : '★1~2 characters are now shown in search results')
    
    setOverlayMessage(message)
    
    // 2秒後にオーバーレイを非表示
    setTimeout(() => {
      setOverlayMessage(null)
    }, 2000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">読み込み中...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }} className="theme-transition">
      <div className="container mx-auto px-4 py-6 theme-transition">
        {/* ヘッダー */}
        <Header />
        
        {/* タグ選択エリア */}
        <div className="mb-6">
          <TagSelector
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
            onClearAll={handleClearAll}
            guaranteedCount={(searchResult.guaranteedResults || []).length}
            totalCombosCount={(searchResult.allCombos || []).length + (searchResult.guaranteedResults || []).length}
            hideLowRarity={hideLowRarity}
            onHideLowRarityChange={handleLowRarityToggle}
          />
        </div>
        
        {/* 結果表示 */}
        <div>
          <div style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }} className="rounded-lg shadow p-6">
            {selectedTags.length === 0 ? (
              <div>
                <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                  {ui.results.allCharacters(characters.length)}
                </h3>
                <CharacterGrid characters={characters} />
              </div>
            ) : searchResult.characters && searchResult.characters.length > 0 ? (
              <div>
                <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                  {ui.results.searchResults(searchResult.characters.length)}
                </h3>
                <CharacterGrid characters={searchResult.characters} />
              </div>
            ) : (
              <AllCombinationResults 
                allCombos={searchResult.allCombos || []}
                guaranteedResults={searchResult.guaranteedResults || []}
                hideLowRarity={hideLowRarity}
              />
            )}
          </div>
        </div>
      </div>
      <ScrollToTop />
      
      {/* オーバーレイ表示 */}
      {overlayMessage && (
        <div 
          className="fixed top-8 left-1/2 px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-up overlay-message"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)'
          }}
        >
          <div className="text-sm font-medium">
            {overlayMessage}
          </div>
        </div>
      )}
    </div>
  )
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}

export default App
