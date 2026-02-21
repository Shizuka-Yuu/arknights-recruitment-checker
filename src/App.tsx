import { useState } from 'react'
import { AppProvider, useApp } from './contexts/AppContext'
import { useCharacters } from './hooks/useCharacters'
import { useRecruitmentCalculator } from './hooks/useRecruitmentCalculator'
import { getUIText } from './constants/dictionary'
import { Header } from './components/Header'
import { TagSelector } from './components/TagSelector'
import { CharacterGrid } from './components/CharacterGrid'
import { GuaranteedResults } from './components/GuaranteedResults'
import { CandidateResults } from './components/CandidateResults'
import './App.css'

function AppContent() {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
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
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <div className="container mx-auto px-4 py-6">
        {/* ヘッダー */}
        <Header />
        
        {/* タグ選択エリア */}
        <div className="mb-6">
          <TagSelector
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
            onClearAll={handleClearAll}
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
            ) : selectedTags.length <= 4 ? (
              <div>
                <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                  {ui.results.searchResults(searchResult.characters.length)}
                </h3>
                <CharacterGrid characters={searchResult.characters} />
              </div>
            ) : (
              <>
                <GuaranteedResults 
                  combos={searchResult.guaranteedCombos || []} 
                  characters={characters}
                />
                <CandidateResults 
                  combos={searchResult.candidateCombos || []} 
                  characters={characters}
                />
              </>
            )}
          </div>
        </div>
      </div>
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
