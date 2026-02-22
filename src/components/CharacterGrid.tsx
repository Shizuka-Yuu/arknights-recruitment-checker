import React, { useState } from 'react'
import { useApp } from '../contexts/AppContext'
import { getCharacterName } from '../constants/dictionary'
import type { Character } from '../types'

interface CharacterGridProps {
  characters: Character[]
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

export const CharacterGrid: React.FC<CharacterGridProps> = ({ characters }) => {
  const { language } = useApp()
  
  const getRarityColor = (rarity: string) => {
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

  if (characters.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        {language === 'ja' ? '該当するキャラクターがいません' : 'No matching characters found'}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-10 gap-2">
      {characters.map(character => (
        <div
          key={character.name}
          className={`relative flex flex-col items-center border-2 transition-transform hover:scale-105 overflow-hidden ${getRarityColor(character.rarity)}`}
        >
          <div className="w-[85px] h-[85px] flex items-center justify-center overflow-hidden flex-shrink-0">
            <a
              href={`https://arknights.fandom.com/wiki/${getCharacterName(character.icon.replace('.png', ''), 'ja')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-full flex items-center justify-center cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                console.log('Icon clicked:', getCharacterName(character.icon.replace('.png', ''), 'ja'))
              }}
              title={language === 'ja' 
                ? `${getCharacterName(character.icon.replace('.png', ''), 'ja')}のWikiを開く` 
                : `Open ${getCharacterName(character.icon.replace('.png', ''), 'en')} Wiki`
              }
            >
              <CharacterImage character={character} />
            </a>
          </div>
          <div className="w-full bg-black bg-opacity-75 text-white text-xs font-medium text-center py-1">
            {getCharacterName(character.icon.replace('.png', ''), language)}
          </div>
        </div>
      ))}
    </div>
  )
}

const CharacterImage: React.FC<{ character: Character }> = ({ character }) => {
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
      <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-2xl">
        ?
      </div>
    )
  }
  
  return (
    <img
      src={currentPath}
      alt={character.name}
      onError={handleError}
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
