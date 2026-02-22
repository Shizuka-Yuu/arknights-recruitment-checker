import React, { useState } from 'react'
import { useApp } from '../contexts/AppContext'
import { getCharacterName, getTagName } from '../constants/dictionary'
import type { ComboResult, Character } from '../types'

interface AllCombinationResultsProps {
  allCombos: ComboResult[]
  guaranteedResults: ComboResult[]
}

const tryImagePaths = (iconName: string): string[] => {
  const basePath = import.meta.env.BASE_URL || '/'
  const cleanName = iconName.replace(/^img_/, '').replace(/^icon_/, '').replace(/\.png$/, '')
  
  const paths = [
    `${basePath}images/${iconName}`, // 元のファイル名（プレフィックスあり）
    `${basePath}images/${cleanName}.png`, // プレフィックスなし
    `${basePath}images/${cleanName}_icon.png`, // _iconサフィックス付き
    `${basePath}images/img_${cleanName}.png`, // img_プレフィックス付き
    `${basePath}images/icon_${cleanName}.png`, // icon_プレフィックス付き
  ]
  
  // 重複を除去
  return [...new Set(paths)]
}

const CharacterImage: React.FC<{ character: Character; size?: number }> = ({ character, size = 60 }) => {
  const [currentPathIndex, setCurrentPathIndex] = useState(0)
  const [isError, setIsError] = useState(false)
  
  const imagePaths = tryImagePaths(character.icon)
  const currentPath = imagePaths[currentPathIndex]
  
  const handleError = () => {
    if (currentPathIndex < imagePaths.length - 1) {
      setCurrentPathIndex(currentPathIndex + 1)
    } else {
      setIsError(true)
    }
  }
  
  if (isError) {
    return (
      <div className={`w-[${size}px] h-[${size}px] bg-gray-300 rounded flex items-center justify-center text-xs text-gray-600`}>
        ?
      </div>
    )
  }
  
  const imgSize = size - 10 // 少し小さく表示
  
  return (
    <img
      src={currentPath}
      alt={character.name}
      className="w-full h-full object-contain"
      style={{ maxWidth: `${imgSize}px`, maxHeight: `${imgSize}px` }}
      onError={handleError}
      key={currentPath} // パスが変更されたら再マウント
    />
  )
}

export const AllCombinationResults: React.FC<AllCombinationResultsProps> = ({ 
  allCombos, 
  guaranteedResults 
}) => {
  const { language } = useApp()

  const getCharacterRarityColor = (rarity: string) => {
    switch (rarity) {
      case '6':
        return 'border-orange-500 bg-orange-100 dark:bg-orange-900/40 shadow-orange-300 dark:shadow-orange-700/30'
      case '5':
        return 'border-yellow-500 bg-yellow-100 dark:bg-yellow-900/40 shadow-yellow-300 dark:shadow-yellow-700/30'
      case '4':
        return 'border-purple-400 bg-purple-100 dark:bg-purple-900/40 shadow-purple-300 dark:shadow-purple-700/30'
      case '3':
        return 'border-blue-400 bg-blue-100 dark:bg-blue-900/40 shadow-blue-300 dark:shadow-blue-700/30'
      case '2':
        return 'border-green-400 bg-green-100 dark:bg-green-900/40 shadow-green-300 dark:shadow-green-700/30'
      case '1':
        return 'border-gray-400 bg-gray-100 dark:bg-gray-800/40 shadow-gray-300 dark:shadow-gray-600/30'
      default:
        return 'border-gray-400 bg-gray-100 dark:bg-gray-800/40'
    }
  }

  const getComboColor = (characters: Character[]) => {
    // 候補キャラの最も低いレアリティを取得
    const lowestRarity = characters.reduce((min, char) => {
      const rarity = parseInt(char.rarity)
      return rarity < min ? rarity : min
    }, 6)
    
    switch (lowestRarity) {
      case 6:
        return 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'
      case 5:
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
      case 4:
        return 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800'
      case 3:
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
      case 2:
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
      case 1:
        return 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-700'
      default:
        return 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
    }
  }

  const getTagColor = (characters: Character[]) => {
    // 候補キャラの最も低いレアリティを取得
    const lowestRarity = characters.reduce((min, char) => {
      const rarity = parseInt(char.rarity)
      return rarity < min ? rarity : min
    }, 6)
    
    switch (lowestRarity) {
      case 6:
        return 'bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200'
      case 5:
        return 'bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200'
      case 4:
        return 'bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200'
      case 3:
        return 'bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200'
      case 2:
        return 'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200'
      case 1:
        return 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
      default:
        return 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
    }
  }

  if (!allCombos || allCombos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        {language === 'ja' ? '該当する組み合わせがありません' : 'No combinations found'}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 確定結果があれば上部に表示 */}
      {guaranteedResults && guaranteedResults.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <h3 className="text-lg font-semibold" style={{ color: '#16a34a' }}>
              {language === 'ja' ? '確定結果' : 'Guaranteed Results'} ({guaranteedResults.length}件)
            </h3>
            <span className="text-sm" style={{ color: '#15803d' }}>
              {language === 'ja' ? '★4以上確定またはロボット確定' : '★4+ guaranteed or robot guaranteed'}
            </span>
          </div>
          
          <div className="grid gap-3">
            {guaranteedResults.map((result, index) => (
              <div
                key={`guaranteed-${index}`}
                className={`p-3 border rounded-lg transition-all hover:shadow-md ${getComboColor(result.characters)}`}
              >
                <div className="flex flex-wrap gap-2 mb-3">
                  {result.combo.map(tag => (
                    <span
                      key={tag}
                      className={`px-2 py-1 text-sm rounded ${getTagColor(result.characters)}`}
                    >
                      {getTagName(tag, language)}
                    </span>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-2 mb-2">
                  {result.characters.map(character => (
                    <div
                      key={character.name}
                      className={`relative flex flex-col items-center border-2 overflow-hidden ${getCharacterRarityColor(character.rarity)}`}
                    >
                      <div className="w-[75px] h-[75px] flex items-center justify-center overflow-hidden">
                        <a 
                          href={`https://arknights.wikiru.jp/?${encodeURIComponent(getCharacterName(character.icon.replace('.png', ''), 'ja'))}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full h-full flex items-center justify-center"
                        >
                          <CharacterImage character={character} size={75} />
                        </a>
                      </div>
                      <div className="w-full bg-black bg-opacity-75 text-white text-xs font-medium text-center py-1">
                        {getCharacterName(character.icon.replace('.png', ''), language)}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <p className="text-xs" style={{ color: 'var(--text-primary)' }}>
                    {result.combo.length}{language === 'ja' ? 'タグで確定' : ' tags guaranteed'} ({result.characters.length} {language === 'ja' ? 'キャラ' : 'characters'})
                    {result.characters.some(char => char.tags.includes('ロボット')) && (
                      <span className="ml-2" style={{ color: 'var(--text-secondary)' }}>
                        {language === 'ja' ? '・' : ' • '}
                        <span className="ml-1">
                          {language === 'ja' ? 'ロボット狙い: 3時間50分 / 星4以上狙い: 9時間' : 'Robot target: 3h50m / ★4+ target: 9h'}
                        </span>
                      </span>
                    )}
                  </p>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#16a34a' }}></div>
                    <span className="text-xs" style={{ color: '#16a34a' }}>
                      {language === 'ja' ? '確定' : 'Guaranteed'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 通常の組み合わせ結果 - キャラクター数昇順で表示 */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h4 className="text-md font-medium" style={{ color: 'var(--text-primary)' }}>
            {language === 'ja' ? '全組み合わせ' : 'All Combinations'}
          </h4>
          <span className="px-2 py-1 text-xs rounded" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
            {allCombos.length} {language === 'ja' ? '個の組み合わせ' : 'combinations'}
          </span>
        </div>
        <div className="grid gap-2">
          {allCombos.map((result, index) => (
            <div
              key={`combo-${index}`}
              className={`p-3 border rounded-lg transition-all hover:shadow-md ${getComboColor(result.characters)}`}
            >
              <div className="flex flex-wrap gap-2 mb-3">
                {result.combo.map(tag => (
                  <span
                    key={tag}
                    className={`px-2 py-1 text-sm rounded ${getTagColor(result.characters)}`}
                  >
                    {getTagName(tag, language)}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-2 mb-2">
                {result.characters.map(character => (
                  <div
                    key={character.name}
                    className={`relative flex flex-col items-center border-2 overflow-hidden ${getCharacterRarityColor(character.rarity)}`}
                  >
                    <div className="w-[75px] h-[75px] flex items-center justify-center overflow-hidden">
                      <a 
                        href={`https://arknights.wikiru.jp/?${encodeURIComponent(getCharacterName(character.icon.replace('.png', ''), 'ja'))}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full h-full flex items-center justify-center"
                      >
                        <CharacterImage character={character} size={75} />
                      </a>
                    </div>
                    <div className="w-full bg-black bg-opacity-75 text-white text-xs font-medium text-center py-1">
                      {getCharacterName(character.icon.replace('.png', ''), language)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-xs" style={{ color: 'var(--text-primary)' }}>
                  {result.combo.length}{language === 'ja' ? 'タグ' : ' tags'} ({result.characters.length} {language === 'ja' ? 'キャラ' : 'characters'})
                  {result.characters.some(char => char.tags.includes('ロボット')) && (
                    <span className="ml-2" style={{ color: 'var(--text-secondary)' }}>
                      {language === 'ja' ? '・' : ' • '}
                      <span className="ml-1">
                        {language === 'ja' ? 'ロボット狙い: 3時間50分設定が必要' : 'Robot target: 3h50m setting required'}
                      </span>
                    </span>
                  )}
                </p>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#6366f1' }}></div>
                  <span className="text-xs" style={{ color: '#6366f1' }}>
                    {language === 'ja' ? '候補' : 'Candidate'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
