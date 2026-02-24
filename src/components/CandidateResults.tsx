import React from 'react'
import { useApp } from '../hooks/useApp'
import { getCharacterName, getTagName } from '../constants/dictionary'
import type { Character } from '../types'

interface CandidateResultsProps {
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
  return [...new Set(paths)]
}

const CharacterImage: React.FC<{ character: Character; size: number }> = ({ character, size }) => {
  const [imageError, setImageError] = React.useState(false)
  
  if (imageError) {
    return (
      <div 
        className="flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
        style={{ width: size, height: size, fontSize: size / 3 }}
      >
        ?
      </div>
    )
  }

  return (
    <img
      src={tryImagePaths(character.icon)[0]}
      onError={(e) => {
        const target = e.target as HTMLImageElement
        const paths = tryImagePaths(character.icon)
        const currentIndex = paths.findIndex(path => path === target.src)
        
        if (currentIndex < paths.length - 1) {
          target.src = paths[currentIndex + 1]
        } else {
          setImageError(true)
        }
      }}
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
    />
  )
}

const getCharacterRarityColor = (rarity: string): string => {
  switch (rarity) {
    case '6':
      return 'bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200 border-orange-300 dark:border-orange-700'
    case '5':
      return 'bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 border-yellow-300 dark:border-yellow-700'
    case '4':
      return 'bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 border-purple-300 dark:border-purple-700'
    case '3':
      return 'bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-700'
    case '2':
      return 'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 border-green-300 dark:border-green-700'
    case '1':
      return 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600'
    default:
      return 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600'
  }
}

const getComboColor = (tagCount: number): string => {
  switch (tagCount) {
    case 2:
      return 'bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800'
    case 3:
      return 'bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800'
    case 4:
      return 'bg-teal-50 dark:bg-teal-950 border-teal-200 dark:border-teal-800'
    case 5:
      return 'bg-cyan-50 dark:bg-cyan-950 border-cyan-200 dark:border-cyan-800'
    default:
      return 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800'
  }
}

const getTagColor = (tagCount: number): string => {
  switch (tagCount) {
    case 2:
      return 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200'
    case 3:
      return 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200'
    case 4:
      return 'bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200'
    case 5:
      return 'bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200'
    default:
      return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
  }
}

export const CandidateResults: React.FC<CandidateResultsProps> = ({ combos, characters }) => {
  const { language } = useApp()

  if (combos.length === 0) return null

  // タグ数でグループ化
  const groupedCombos = combos.reduce((acc, combo) => {
    const tagCount = combo.length.toString()
    if (!acc[tagCount]) acc[tagCount] = []
    acc[tagCount].push(combo)
    return acc
  }, {} as Record<string, string[][]>)

  // 有効な組み合わせの総数を計算
  const validCombosCount = Object.entries(groupedCombos).reduce((total, [, groupCombos]) => {
    const validCombos = groupCombos.filter((combo) => {
      const comboCharacters = characters.filter(character =>
        combo.every(tag => {
          const characterTags = [
            character.class,
            character.position,
            ...character.tags.split(',').map(t => t.trim())
          ]
          if (character.special.includes('上級エリート')) {
            characterTags.push('上級エリート')
          }
          if (character.special.includes('エリート')) {
            characterTags.push('エリート')
          }
          return characterTags.includes(tag)
        })
      ).filter(char => parseInt(char.rarity) >= 3 && parseInt(char.rarity) <= 5 && char.rarity !== '1')
      return comboCharacters.length > 0
    })
    return total + validCombos.length
  }, 0)

  return (
    <div className="space-y-6" style={{ paddingTop: '1.5rem' }}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
          {language === 'ja' ? '★3を含む★4~5候補' : '★3+ with ★4~5 Candidates'}
          <span className="ml-2 text-sm font-normal" style={{ color: 'var(--text-secondary)' }}>
            ({validCombosCount}{language === 'ja' ? '件' : 'items'})
          </span>
        </h3>
        <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {language === 'ja' ? '参考情報' : 'Reference Info'}
        </div>
      </div>

      {Object.entries(groupedCombos)
        .sort(([a], [b]) => parseInt(a) - parseInt(b))
        .map(([tagCount, groupCombos]) => {
          const validCombos = groupCombos.filter((combo) => {
            const comboCharacters = characters.filter(character =>
              combo.every(tag => {
                const characterTags = [
                  character.class,
                  character.position,
                  ...character.tags.split(',').map(t => t.trim())
                ]
                if (character.special.includes('上級エリート')) {
                  characterTags.push('上級エリート')
                }
                if (character.special.includes('エリート')) {
                  characterTags.push('エリート')
                }
                return characterTags.includes(tag)
              })
            ).filter(char => parseInt(char.rarity) >= 3 && parseInt(char.rarity) <= 5 && char.rarity !== '1')
            return comboCharacters.length > 0
          })

          if (validCombos.length === 0) return null

          return (
            <div key={tagCount} className="space-y-3">
              <div className="flex items-center gap-2">
                <h4 className="text-md font-medium" style={{ color: 'var(--text-primary)' }}>
                  {tagCount}{language === 'ja' ? 'タグ候補' : ' Tag Candidates'}
                </h4>
                <span className="text-xs px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded">
                  {validCombos.length} {language === 'ja' ? '組み合わせ' : 'combinations'}
                </span>
              </div>

              <div className="grid gap-3">
                {validCombos.map((combo, index) => {
                  const comboCharacters = characters.filter(character =>
                    combo.every(tag => {
                      const characterTags = [
                        character.class,
                        character.position,
                        ...character.tags.split(',').map(t => t.trim())
                      ]
                      if (character.special.includes('上級エリート')) {
                        characterTags.push('上級エリート')
                      }
                      if (character.special.includes('エリート')) {
                        characterTags.push('エリート')
                      }
                      return characterTags.includes(tag)
                    })
                  ).filter(char => parseInt(char.rarity) >= 3 && parseInt(char.rarity) <= 5 && char.rarity !== '1')

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
                      
                      {/* 該当キャラクター表示 */}
                      <div className="flex flex-wrap gap-2 mb-2">
                        {comboCharacters.map(character => (
                          <div
                            key={character.name}
                            className={`relative flex flex-col items-center border-2 transition-transform hover:scale-105 overflow-hidden ${getCharacterRarityColor(character.rarity)}`}
                          >
                            <div className="w-[75px] h-[75px] flex items-center justify-center overflow-hidden flex-shrink-0">
                              <a 
                                href={`https://arknights.wikiru.jp/?${getCharacterName(character.icon.replace('.png', ''), 'ja')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full h-full flex items-center justify-center cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation()
                                }}
                              >
                                <CharacterImage character={character} size={75} />
                              </a>
                            </div>
                            <div className="w-full bg-black bg-opacity-75 text-white text-xs font-medium text-center py-1 leading-tight truncate px-1">
                              {getCharacterName(character.icon.replace('.png', ''), language)}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                          {tagCount}{language === 'ja' ? 'タグで候補' : ' tags candidate'} ({comboCharacters.length} {language === 'ja' ? 'キャラ' : 'characters'})
                        </p>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                          <span className="text-xs" style={{ color: '#6366f1' }}>
                            {language === 'ja' ? '候補' : 'Candidate'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        }).filter(Boolean)}
    </div>
  )
}
