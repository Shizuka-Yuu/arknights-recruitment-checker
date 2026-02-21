import React from 'react'
import { useApp } from '../contexts/AppContext'
import { getUIText, getTagName } from '../constants/dictionary'

interface TagSelectorProps {
  selectedTags: string[]
  onTagToggle: (tag: string) => void
  onClearAll: () => void
}

const TAG_CATEGORIES = {
  type: ['先鋒', '前衛', '重装', '狙撃', '術師', '医療', '補助', '特殊'],
  position: ['近距離', '遠距離'],
  tags: [
    '火力', '防御', 'COST回復', '範囲攻撃', '生存', '治療', '支援', '弱化',
    '減速', '強制移動', '牽制', '爆発力', '召喚', '高速再配置', '元素', '初期', 'ロボット'
  ],
  confirmed: ['上級エリート', 'エリート']
}

export const TagSelector: React.FC<TagSelectorProps> = ({
  selectedTags,
  onTagToggle,
  onClearAll
}) => {
  const { language, theme } = useApp()
  const ui = getUIText(language)
  const maxTags = 5
  const isMaxReached = selectedTags.length >= maxTags

  const getTagColor = (tag: string) => {
    const isSelected = selectedTags.includes(tag)
    const isDisabled = isMaxReached && !isSelected
    
    if (isSelected) {
      return 'bg-blue-500 text-white hover:bg-blue-600 border-blue-500'
    }
    if (isDisabled) {
      return 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
    }
    return 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
  }

  const handleTagClick = (tag: string) => {
    if (isMaxReached && !selectedTags.includes(tag)) {
      return // 最大数に達している場合は何もしない
    }
    onTagToggle(tag)
  }

  const getSelectionStatus = () => {
    if (selectedTags.length === 0) {
      return { text: language === 'ja' ? 'タグを選択してください' : 'Please select tags', color: 'text-gray-500' }
    }
    if (selectedTags.length <= 4) {
      return { text: ui.selectionStatus.normal(selectedTags.length, maxTags), color: 'text-blue-600' }
    }
    return { text: ui.selectionStatus.guaranteed, color: 'text-green-600' }
  }

  const selectionStatus = getSelectionStatus()

  return (
    <div className="space-y-4 p-4 rounded-lg shadow" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>{ui.tagSelection}</h2>
        <button
          onClick={onClearAll}
          className="px-4 py-2 text-sm rounded hover:opacity-90 transition-opacity"
          style={{ backgroundColor: '#ef4444', color: 'white' }}
        >
          {ui.clearAll}
        </button>
      </div>

      {/* 選択ステータス */}
      <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium" style={{ 
            color: selectionStatus.color === 'text-blue-600' 
              ? (theme === 'dark' ? '#60a5fa' : '#2563eb')  // ダークモードでは明るい青
              : (theme === 'dark' ? '#4ade80' : '#16a34a') // ダークモードでは明るい緑
          }}>
            {selectionStatus.text}
          </span>
          {selectedTags.length > 0 && (
            <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
              {selectedTags.length}/{maxTags}
            </span>
          )}
        </div>
        {isMaxReached && (
          <div className="mt-2 text-xs p-2 rounded" style={{ backgroundColor: '#fef3c7', color: '#92400e' }}>
            {ui.selectionStatus.maxReached}
          </div>
        )}
      </div>

      <div className="space-y-3">
        {/* スマホでは縦並び、PCでは横並び */}
        <div className="space-y-3">
          {/* タイプ */}
          <div className="flex items-start gap-3">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 min-w-[40px] pt-2">{ui.tagCategories.type}</h3>
            <div className="flex flex-wrap gap-2">
              {TAG_CATEGORIES.type.map(tag => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  disabled={isMaxReached && !selectedTags.includes(tag)}
                  className={`px-3 py-2 text-sm rounded-full border transition-colors ${getTagColor(tag)}`}
                >
                  {getTagName(tag, language)}
                </button>
              ))}
            </div>
          </div>

          {/* 位置 */}
          <div className="flex items-start gap-3">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 min-w-[40px] pt-2">{ui.tagCategories.position}</h3>
            <div className="flex flex-wrap gap-2">
              {TAG_CATEGORIES.position.map(tag => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  disabled={isMaxReached && !selectedTags.includes(tag)}
                  className={`px-3 py-2 text-sm rounded-full border transition-colors ${getTagColor(tag)}`}
                >
                  {getTagName(tag, language)}
                </button>
              ))}
            </div>
          </div>

          {/* タグ */}
          <div className="flex items-start gap-3">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 min-w-[40px] pt-2">{ui.tagCategories.tags}</h3>
            <div className="flex flex-wrap gap-2">
              {TAG_CATEGORIES.tags.map(tag => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  disabled={isMaxReached && !selectedTags.includes(tag)}
                  className={`px-3 py-2 text-sm rounded-full border transition-colors ${getTagColor(tag)}`}
                >
                  {getTagName(tag, language)}
                </button>
              ))}
            </div>
          </div>

          {/* 確定 */}
          <div className="flex items-start gap-3">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 min-w-[40px] pt-2">{ui.tagCategories.confirmed}</h3>
            <div className="flex flex-wrap gap-2">
              {TAG_CATEGORIES.confirmed.map(tag => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  disabled={isMaxReached && !selectedTags.includes(tag)}
                  className={`px-3 py-2 text-sm rounded-full border transition-colors ${getTagColor(tag)}`}
                >
                  {getTagName(tag, language)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 選択中のタグ表示 */}
      {selectedTags.length > 0 && (
        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {language === 'ja' ? '選択中のタグ' : 'Selected Tags'}
            </p>
            <button
              onClick={onClearAll}
              className="text-xs text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            >
              {ui.clear}
            </button>
          </div>
          <div className="flex flex-wrap gap-1">
            {selectedTags.map(tag => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded flex items-center gap-1"
              >
                {getTagName(tag, language)}
                <button
                  onClick={() => onTagToggle(tag)}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
