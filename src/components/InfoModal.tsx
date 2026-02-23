import React from 'react'
import { useApp } from '../hooks/useApp'

interface InfoModalProps {
  isOpen: boolean
  onClose: () => void
}

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  const { language } = useApp()

  const handleBackdropClick = React.useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }, [onClose])

  const handleEscapeKey = React.useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }, [onClose])

  // モーダル開閉時のbody overflow管理
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  // ESCキー処理
  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey)
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, handleEscapeKey])

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
      style={{ backdropFilter: 'blur(4px)' }}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        style={{ 
          backgroundColor: 'var(--bg-primary)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-color)'
        }}
      >
        {/* ヘッダー */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
            {language === 'ja' ? '使い方・仕様' : 'Usage & Specifications'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors cursor-pointer"
            title={language === 'ja' ? '閉じる' : 'Close'}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* コンテンツ */}
        <div className="p-6 space-y-6 text-left">
          {language === 'ja' ? (
            <>
              {/* 日本語コンテンツ */}
              <div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>⚠️ タグ消失のシステム保護</h3>
                <div className="space-y-2 text-sm text-left" style={{ color: 'var(--text-secondary)' }}>
                  <div>
                    <strong>上級エリートを含む9時間設定</strong>：「上級エリート」のみが保護されます
                  </div>
                  <div>
                    <strong>上級エリートを含む組み合わせ</strong>：9時間設定で星6が確定します
                  </div>
                  <div>
                    <strong>※注意</strong>：併用したタグが消失し、対象の星6オペレーターを一点狙いできない（星6内でのランダム抽選になる）可能性は僅かに残ります
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>🚀 使い方</h3>
                <div className="space-y-3 text-sm text-left" style={{ color: 'var(--text-secondary)' }}>
                  <div>
                    <strong>基本操作</strong>
                    <ul className="list-disc list-inside ml-4 mt-1">
                      <li><strong>タグを選択</strong>：オペレーターの特性に合わせてタグを選択します（最大5個）</li>
                      <li><strong>検索結果確認</strong>：選択したタグに一致するオペレーターが表示されます</li>
                      <li><strong>確定組み合わせ</strong>：1〜5タグ選択時は確定組み合わせと対象オペレーターを表示</li>
                      <li><strong>全組み合わせ分析</strong>：可能なすべてのタグ組み合わせと結果を確認</li>
                      <li><strong>Wikiアクセス</strong>：オペレーターのアイコンをクリックで詳細情報へ移動</li>
                      <li><strong>リセット機能</strong>：タグリセットボタンで選択をクリア</li>
                    </ul>
                  </div>
                  <div>
                    <strong>確定条件</strong>
                    <ul className="list-disc list-inside ml-4 mt-1">
                      <li><strong>1タグ</strong>：★4以上確定の組み合わせ</li>
                      <li><strong>2〜5タグ</strong>：★4以上確定またはロボット確定の組み合わせ</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>🎯 特徴</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-left" style={{ color: 'var(--text-secondary)' }}>
                  <li><strong>リアルタイム検索</strong>：タグ選択で即座にオペレーターを絞り込み</li>
                  <li><strong>確定組み合わせ表示</strong>：1〜5タグ選択で★4以上確定またはロボット確定の組み合わせを表示</li>
                  <li><strong>全組み合わせ分析</strong>：選択したタグから可能なすべての組み合わせを網羅的に表示</li>
                  <li><strong>候補ラベル表示</strong>：確定対象外のオペレーターに「候補」ラベルを表示</li>
                  <li><strong>ロボット説明</strong>：ロボット確定の場合に特別な説明を表示</li>
                  <li><strong>テーマ切り替え</strong>：ライトモードとダークモードをサポート</li>
                  <li><strong>Wiki連携</strong>：オペレーター名/アイコンクリックでアークナイツ攻略 Wikiへ移動</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>📋 仕様</h3>
                <div className="space-y-3 text-sm text-left" style={{ color: 'var(--text-secondary)' }}>
                  <div>
                    <strong>対応タグ</strong>
                    <ul className="list-disc list-inside ml-4 mt-1">
                      <li>職業タグ：先鋒、前衛、重装、狙撃、術師、医療、補助、特殊</li>
                      <li>位置タグ：近距離、遠距離</li>
                      <li>特性タグ：範囲攻撃、単体術師、支援、治療、強化など</li>
                      <li>確定タグ：エリート、上級エリート、ロボット</li>
                    </ul>
                  </div>
                  <div>
                    <strong>確定条件</strong>
                    <ul className="list-disc list-inside ml-4 mt-1">
                      <li>1タグ：★4以上確定のタグまたはロボット確定のタグ</li>
                      <li>2タグ：★4以上確定またはロボット確定の組み合わせ</li>
                      <li>3タグ：★4以上確定またはロボット確定の組み合わせ</li>
                      <li>4タグ：★4以上確定またはロボット確定の組み合わせ</li>
                      <li>5タグ：★4以上確定またはロボット確定の組み合わせ</li>
                    </ul>
                  </div>
                  <div>
                    <strong>データソース</strong>
                    <p className="mt-1">
                      <a 
                        href="https://arknights.wikiru.jp/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline"
                        style={{ color: 'var(--accent-color)' }}
                      >
                        アークナイツ攻略 Wiki
                      </a>
                      の公開求人データを使用しています
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* 英語コンテンツ */}
              <div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>⚠️ System Protection for Tag Loss</h3>
                <div className="space-y-2 text-sm text-left" style={{ color: 'var(--text-secondary)' }}>
                  <div>
                    <strong>9-hour setting with Senior Elite</strong>: Only "Senior Elite" tag is protected
                  </div>
                  <div>
                    <strong>Combinations with Senior Elite</strong>: 9-hour setting guarantees ★6
                  </div>
                  <div>
                    <strong>※Note</strong>: There's a small possibility that combined tags may disappear, making it impossible to target a specific ★6 operator (becomes random selection among ★6)
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>🚀 How to Use</h3>
                <div className="space-y-3 text-sm text-left" style={{ color: 'var(--text-secondary)' }}>
                  <div>
                    <strong>Basic Operations</strong>
                    <ul className="list-disc list-inside ml-4 mt-1">
                      <li><strong>Select Tags</strong>: Choose tags based on operator characteristics (max 5 tags)</li>
                      <li><strong>Check Results</strong>: View operators matching selected tags</li>
                      <li><strong>Guaranteed Combinations</strong>: Display guaranteed combinations with 1-5 tags</li>
                      <li><strong>Complete Analysis</strong>: Check all possible tag combinations and results</li>
                      <li><strong>Wiki Access</strong>: Click operator icons for detailed information</li>
                      <li><strong>Reset Function</strong>: Clear selections with reset button</li>
                    </ul>
                  </div>
                  <div>
                    <strong>Guarantee Conditions</strong>
                    <ul className="list-disc list-inside ml-4 mt-1">
                      <li><strong>1 Tag</strong>: ★4+ guaranteed combinations</li>
                      <li><strong>2-5 Tags</strong>: ★4+ guaranteed or robot guaranteed combinations</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>🎯 Features</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-left" style={{ color: 'var(--text-secondary)' }}>
                  <li><strong>Real-time Search</strong>: Instantly filter operators by selecting tags</li>
                  <li><strong>Guaranteed Combinations</strong>: Display guaranteed combinations with 1-5 tags</li>
                  <li><strong>Complete Analysis</strong>: Check all possible tag combinations and results</li>
                  <li><strong>Candidate Labels</strong>: Display "Candidate" labels for non-guaranteed operators</li>
                  <li><strong>Robot Explanations</strong>: Show special explanations for robot guaranteed cases</li>
                  <li><strong>Multi-language Support</strong>: Japanese and English UI support</li>
                  <li><strong>Theme Switching</strong>: Light mode and dark mode support</li>
                  <li><strong>Wiki Integration</strong>: Click operator names/icons to navigate to Arknights Wiki</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>📋 Specifications</h3>
                <div className="space-y-3 text-sm text-left" style={{ color: 'var(--text-secondary)' }}>
                  <div>
                    <strong>Supported Tags</strong>
                    <ul className="list-disc list-inside ml-4 mt-1">
                      <li>Class Tags: Vanguard, Guard, Defender, Sniper, Caster, Medic, Support, Specialist</li>
                      <li>Position Tags: Melee, Ranged</li>
                      <li>Trait Tags: Area Attack, Single Target Caster, Support, Healing, Enhancement, etc.</li>
                      <li>Guaranteed Tags: Elite, Senior Elite, Robot</li>
                    </ul>
                  </div>
                  <div>
                    <strong>Guarantee Conditions</strong>
                    <ul className="list-disc list-inside ml-4 mt-1">
                      <li>1 Tag: ★4+ guaranteed tag or robot guaranteed tag</li>
                      <li>2 Tags: ★4+ guaranteed or robot guaranteed combinations</li>
                      <li>3 Tags: ★4+ guaranteed or robot guaranteed combinations</li>
                      <li>4 Tags: ★4+ guaranteed or robot guaranteed combinations</li>
                      <li>5 Tags: ★4+ guaranteed or robot guaranteed combinations</li>
                    </ul>
                  </div>
                  <div>
                    <strong>Data Source</strong>
                    <p className="mt-1">
                      Uses public recruitment data from 
                      <a 
                        href="https://arknights.wikiru.jp/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline"
                        style={{ color: 'var(--accent-color)' }}
                      >
                        Arknights Strategy Wiki
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* フッター */}
        <div className="flex justify-end p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md cursor-pointer transition-colors"
            style={{ backgroundColor: 'var(--bg-secondary)' }}
          >
            {language === 'ja' ? '閉じる' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  )
}
