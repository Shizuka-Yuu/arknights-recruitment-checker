import React, { useState } from 'react'
import { useApp } from '../hooks/useApp'
import { getCharacterName, getUIText, getTagName } from '../constants/dictionary'
import type { Character } from '../types'

interface GuaranteedResultsProps {
  combos: string[][]
  characters: Character[]
}

const tryImagePaths = (iconName: string): string[] => {
  // 開発環境ではBASE_URLを無視してルートパスを使用
  const isDev = import.meta.env.DEV;
  const basePath = isDev ? '' : (import.meta.env.BASE_URL || '');
  const cleanName = iconName
    .replace(/^img_/, "")
    .replace(/^icon_/, "")
    .replace(/\.png$/, "");
  
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
      <div 
        className="bg-gray-300 rounded flex items-center justify-center text-xs text-gray-600"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        ?
      </div>
    )
  }
  
  return (
    <img
      src={currentPath}
      alt={character.name}
      className="object-cover flex-shrink-0"
      style={{ 
        width: '85px', 
        height: '85px',
        minWidth: '85px',
        maxWidth: '85px',
        minHeight: '85px',
        maxHeight: '85px'
      }}
      onError={handleError}
      key={currentPath} // パスが変更されたら再マウント
    />
  )
}

export const GuaranteedResults: React.FC<GuaranteedResultsProps> = ({ combos, characters }) => {
  const { language } = useApp()
  const ui = getUIText(language)
  
  // 組み合わせごとの該当オペレーターを取得
  const getComboCharacters = (combo: string[]): Character[] => {
    return characters.filter(character => {
      const characterTags = [
        character.class,
        character.position,
        ...character.tags.split(',').map(tag => tag.trim())
      ]
      
      // specialフィールドからエリート情報を追加
      if (character.special.includes('上級エリート')) {
        characterTags.push('上級エリート')
      }
      if (character.special.includes('エリート')) {
        characterTags.push('エリート')
      }
      
      return combo.every(tag => characterTags.includes(tag))
    })
  }

  if (combos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        <div className="mb-4">
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
          {language === 'ja' ? '確定組み合わせがありません' : 'No guaranteed combinations found'}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {language === 'ja' 
            ? '選択したタグの組み合わせでは★4以上確定またはロボット確定の条件を満たしません'
            : 'The selected tag combination does not meet the conditions for ★4+ guaranteed or robot guaranteed recruitment'
          }
        </p>
      </div>
    )
  }

  // 組み合わせをタグ数でグループ化
  const groupedCombos = combos.reduce((acc, combo) => {
    const tagCount = combo.length
    if (!acc[tagCount]) {
      acc[tagCount] = []
    }
    acc[tagCount].push(combo)
    return acc
  }, {} as Record<number, string[][]>)

  const getCharacterRarityColor = (rarity: string) => {
    switch (rarity) {
      case '6':
        return 'border-orange-500 bg-orange-100 dark:bg-orange-900/40 shadow-orange-300 dark:shadow-orange-700/30' // オレンジ
      case '5':
        return 'border-yellow-500 bg-yellow-100 dark:bg-yellow-900/40 shadow-yellow-300 dark:shadow-yellow-700/30' // 黄色
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

  const getComboColor = (tagCount: number) => {
    switch (tagCount) {
      case 2:
        return 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'
      case 3:
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
      case 4:
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
      case 5:
        return 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800'
      default:
        return 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
    }
  }

  const getTagColor = (tagCount: number) => {
    switch (tagCount) {
      case 2:
        return 'bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200'
      case 3:
        return 'bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200'
      case 4:
        return 'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200'
      case 5:
        return 'bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200'
      default:
        return 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
          {ui.results.guaranteedCombos} ({combos.length}件)
        </h3>
        <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {language === 'ja' ? '★4以上確定またはロボット確定' : '★4+ guaranteed or robot guaranteed'}
        </div>
      </div>

      {Object.entries(groupedCombos)
        .sort(([a], [b]) => parseInt(a) - parseInt(b))
        .map(([tagCount, groupCombos]) => (
          <div key={tagCount} className="space-y-3">
            <div className="flex items-center gap-2">
              <h4 className="text-md font-medium" style={{ color: 'var(--text-primary)' }}>
                {tagCount}{language === 'ja' ? 'タグ組み合わせ' : ' Tag Combinations'}
              </h4>
              <span className="px-2 py-1 text-xs rounded" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
                {ui.results.comboCount(groupCombos.length)}
              </span>
            </div>
            <div className="grid gap-2">
              {groupCombos.map((combo, index) => {
                const comboCharacters = getComboCharacters(combo)
                return (
                  <div
                    key={`${tagCount}-${index}`}
                    className={`p-3 border rounded-lg transition-all hover:shadow-md ${getComboColor(parseInt(tagCount))}`}
                  >
                    <div className="flex flex-wrap gap-2 mb-3">
                      {combo.map(tag => (
                        <span
                          key={tag}
                          className={`px-2 py-1 text-sm rounded ${getTagColor(parseInt(tagCount))}`}
                        >
                          {getTagName(tag, language)}
                        </span>
                      ))}
                    </div>
                    
                    {/* 該当オペレーター表示 */}
                    <div className="flex flex-wrap gap-2 mb-2 justify-start">
                      {comboCharacters.map(character => (
                        <div
                          key={character.name}
                          className={`relative flex flex-col items-center border-2 transition-transform hover:scale-105 overflow-hidden w-20 ${getCharacterRarityColor(character.rarity)}`}
                        >
                          <div className="w-[75px] h-[75px] flex items-center justify-center overflow-hidden flex-shrink-0">
                            <a 
                              href={`https://arknights.wikiru.jp/?${getCharacterName(character.icon.replace('.png', ''), 'ja')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full h-full flex items-center justify-center cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation()
                                console.log('Guaranteed icon clicked:', getCharacterName(character.icon.replace('.png', ''), 'ja'))
                              }}
                            >
                              <CharacterImage character={character} size={75} />
                            </a>
                          </div>
                          <div className="w-full bg-black bg-opacity-75 text-white text-[10px] font-medium text-center py-1 leading-tight px-1" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '90px' }}>
                            {getCharacterName(character.icon.replace('.png', ''), language)}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                        {tagCount}{language === 'ja' ? 'タグで確定' : ' tags guaranteed'} ({comboCharacters.length} {language === 'ja' ? 'オペ' : 'operators'})
                        {comboCharacters.some(char => char.tags.includes('ロボット')) && (
                          <span className="ml-2" style={{ color: 'var(--text-tertiary)' }}>
                            {language === 'ja' ? '・' : ' • '}
                            <span className="ml-1">
                              {language === 'ja' ? 'ロボット狙い: 3時間50分 / 星4以上狙い: 9時間' : 'Robot target: 3h50m / ★4+ target: 9h'}
                            </span>
                          </span>
                        )}
                      </p>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs" style={{ color: '#16a34a' }}>
                          {language === 'ja' ? '確定' : 'Guaranteed'}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))
      }
    </div>
  )
}
