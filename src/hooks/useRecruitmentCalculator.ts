import { useMemo } from 'react'
import type { Character, SearchResult } from '../types'

// キャラクタータグを前処理するヘルパー関数
const preprocessCharacterTags = (character: Character): string[] => {
  const tags = [
    character.class,
    character.position,
    ...character.tags.split(',').map(tag => tag.trim())
  ]
  
  // specialフィールドからエリート情報を追加
  if (character.special.includes('上級エリート')) {
    tags.push('上級エリート')
  }
  if (character.special.includes('エリート')) {
    tags.push('エリート')
  }
  
  return tags
}

// 通常検索と同じロジックを使用するヘルパー関数
const filterCharactersByTags = (
  characters: Character[], 
  selectedTags: string[]
): Character[] => {
  const typeTags = ['先鋒', '前衛', '重装', '狙撃', '術師', '医療', '補助', '特殊']
  const positionTags = ['近距離', '遠距離']
  const confirmedTags = ['上級エリート', 'エリート']
  
  const selectedTypeTags = selectedTags.filter(tag => typeTags.includes(tag))
  const selectedPositionTags = selectedTags.filter(tag => positionTags.includes(tag))
  const selectedOtherTags = selectedTags.filter(tag => 
    !typeTags.includes(tag) && !positionTags.includes(tag) && !confirmedTags.includes(tag)
  )
  const selectedConfirmedTags = selectedTags.filter(tag => confirmedTags.includes(tag))
  
  return characters.filter(character => {
    const characterTags = preprocessCharacterTags(character)
    
    // 各カテゴリのマッチング条件
    const typeMatch = selectedTypeTags.length === 0 || 
      selectedTypeTags.some(tag => characterTags.includes(tag))
    
    const positionMatch = selectedPositionTags.length === 0 || 
      selectedPositionTags.some(tag => characterTags.includes(tag))
    
    const otherMatch = selectedOtherTags.length === 0 || 
      selectedOtherTags.every(tag => characterTags.includes(tag))
    
    const confirmedMatch = selectedConfirmedTags.length === 0 || 
      selectedConfirmedTags.every(tag => characterTags.includes(tag))
    
    // 全てのカテゴリ条件を満たす必要がある（AND条件）
    return typeMatch && positionMatch && otherMatch && confirmedMatch
  })
}

// 組み合わせを生成するヘルパー関数
const getCombinations = (array: string[], size: number): string[][] => {
  const result: string[][] = []
  
  const combine = (start: number, combo: string[]) => {
    if (combo.length === size) {
      result.push([...combo])
      return
    }
    
    for (let i = start; i < array.length; i++) {
      combo.push(array[i])
      combine(i + 1, combo)
      combo.pop()
    }
  }
  
  combine(0, [])
  return result
}

// 組み合わせ結果の型定義
interface ComboResult {
  combo: string[]
  characters: Character[]
  isGuaranteed: boolean
}

export const useRecruitmentCalculator = (
  characters: Character[],
  selectedTags: string[]
) => {
  const searchResult = useMemo<SearchResult>(() => {
    if (selectedTags.length === 0) {
      return { characters: [] }
    }

    console.log('検索開始 - 選択タグ:', selectedTags)
    
    // 上級エリートタグが選択されていない場合、星6キャラを除外
    const eligibleCharacters = selectedTags.includes('上級エリート') 
      ? characters 
      : characters.filter(char => char.rarity !== '6')
    
    console.log('検索対象キャラクター数:', eligibleCharacters.length)

    // 1タグ選択時は単純な検索、2〜5タグ時は組み合わせ検索
    if (selectedTags.length === 1) {
      console.log('1タグ検索:', selectedTags[0])
      
      // 上級エリートタグが選択されていない場合、星6キャラを除外
      const eligibleCharacters = selectedTags.includes('上級エリート') 
        ? characters 
        : characters.filter(char => char.rarity !== '6')
      
      const filteredCharacters = filterCharactersByTags(eligibleCharacters, selectedTags)
      
      console.log('1タグ検索結果:', filteredCharacters.map(c => `${c.name} (${c.rarity}★)`))

      // レアリティ降順でソート
      const sortedCharacters = filteredCharacters.sort((a, b) => {
        const rarityOrder = { '6': 3, '5': 2, '4': 1, '3': 0 }
        return (rarityOrder[b.rarity as keyof typeof rarityOrder] || 0) - 
               (rarityOrder[a.rarity as keyof typeof rarityOrder] || 0)
      })

      return { 
        characters: sortedCharacters,
        guaranteedCombos: [],
        allCombos: [],
        guaranteedResults: []
      }
    }

    // 2〜5タグ選択時は組み合わせ検索
    let allCombos: ComboResult[] = []
    let guaranteedCombos: ComboResult[] = []
    
    if (selectedTags.length >= 2 && selectedTags.length <= 5) {
      
      // 選択されたタグ数だけではなく、1タグから現在のタグ数までの全組み合わせを生成
      for (let size = 1; size <= selectedTags.length; size++) {
        const combos = getCombinations(selectedTags, size)
        
        for (const combo of combos) {
          const matchingCharacters = filterCharactersByTags(eligibleCharacters, combo)
          
          // 該当キャラクターがいる場合のみ追加
          if (matchingCharacters.length > 0) {
            // 星4以上確定またはロボット確定の条件をチェック
            const isGuaranteed = matchingCharacters.every(char => {
              const isHighRarity = parseInt(char.rarity) >= 4
              const isRobot = char.tags.includes('ロボット')
              return isHighRarity || isRobot
            })
            
            const comboResult: ComboResult = {
              combo,
              characters: matchingCharacters.sort((a, b) => {
                const rarityOrder = { '6': 3, '5': 2, '4': 1, '3': 0 }
                return (rarityOrder[b.rarity as keyof typeof rarityOrder] || 0) - 
                       (rarityOrder[a.rarity as keyof typeof rarityOrder] || 0)
              }),
              isGuaranteed
            }
            
            allCombos.push(comboResult)
            
            if (isGuaranteed) {
              guaranteedCombos.push(comboResult)
            }
          }
        }
      }
    }
    
    console.log('全組み合わせ結果:', allCombos.length)
    console.log('確定組み合わせ結果:', guaranteedCombos.length)

    // 確定結果もキャラクター数昇順でソート
    guaranteedCombos.sort((a: ComboResult, b: ComboResult) => a.characters.length - b.characters.length)

    // 確定結果の組み合わせをセットで管理
    const guaranteedComboSets = new Set(
      guaranteedCombos.map((result: ComboResult) => JSON.stringify(result.combo.sort()))
    )

    // 通常検索結果から確定結果を除外
    const filteredCombos = allCombos.filter((result: ComboResult) => {
      const comboKey = JSON.stringify(result.combo.sort())
      return !result.isGuaranteed && !guaranteedComboSets.has(comboKey)
    })

    // 全ての組み合わせをキャラクター数昇順でソート（純粋なキャラ数昇順）
    filteredCombos.sort((a: ComboResult, b: ComboResult) => a.characters.length - b.characters.length)

    return { 
      characters: [], // 直接的なキャラクター表示は使わない
      guaranteedCombos: guaranteedCombos.map((r: ComboResult) => r.combo),
      allCombos: filteredCombos, // グループ化せず、ソート済みのフラットな配列を返す
      guaranteedResults: guaranteedCombos
    }
  }, [characters, selectedTags])

  // 5タグ選択時の星3を含む星4~5候補を計算（従来通り維持）
  const candidateCombos = useMemo(() => {
    if (selectedTags.length === 5) {
      const allCombos: string[][] = []
      
      // 2〜5タグの全組み合わせを生成
      for (let size = 2; size <= 5; size++) {
        const combos = getCombinations(selectedTags, size)
        allCombos.push(...combos)
      }

      // 星3〜星5の候補の組み合わせをフィルタリング（星6は除外）
      const candidateCombos = allCombos.filter(combo => {
        const matchingCharacters = filterCharactersByTags(characters, combo)
        
        // 星3〜星5のキャラクターがいるかチェック（星6は除外）
        const hasCandidates = matchingCharacters.some(char => 
          parseInt(char.rarity) >= 3 && parseInt(char.rarity) <= 5 && char.rarity !== '1'
        )
        
        return hasCandidates
      })

      // ★4以上確定の組み合わせを除外
      const guaranteed = searchResult.guaranteedCombos || []
      const filteredCandidateCombos = candidateCombos.filter(combo =>
        !guaranteed.some(guaranteed => 
          guaranteed.length === combo.length &&
          guaranteed.every(tag => combo.includes(tag))
        )
      )

      // 重複除去：より少ないタグ数の組み合わせに包含される場合は除外
      const uniqueCandidateCombos = filteredCandidateCombos.filter((combo, index, self) => {
        const smallerCombos = self.filter((c, i) => 
          i < index && c.length < combo.length
        )
        
        const isRedundant = smallerCombos.some(smallerCombo =>
          smallerCombo.every(tag => combo.includes(tag))
        )
        
        return !isRedundant
      })

      return uniqueCandidateCombos
    }

    return []
  }, [characters, selectedTags, searchResult.guaranteedCombos])

  // 候補情報を含めた検索結果を返す
  const enhancedSearchResult = useMemo(() => ({
    ...searchResult,
    candidateCombos
  }), [searchResult, candidateCombos])

  return enhancedSearchResult
}
