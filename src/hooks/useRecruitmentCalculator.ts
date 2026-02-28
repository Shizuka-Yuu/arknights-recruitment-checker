import { useMemo } from 'react'
import type { Character, SearchResult } from '../types'

// オペレータータグを前処理するヘルパー関数
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

// オペレーターをタグでフィルタリングするヘルパー関数
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
    
    // 1タグ選択時は単純な検索
    if (selectedTags.length === 1) {
      console.log('1タグ検索:', selectedTags[0])
      
      // 上級エリートタグが選択されている場合のみ星6オペを許可
      const eligibleCharacters = selectedTags.includes('上級エリート') 
        ? characters 
        : characters.filter(char => char.rarity !== '6')
      
      const filteredCharacters = filterCharactersByTags(eligibleCharacters, selectedTags)
      
      console.log('1タグ検索結果:', filteredCharacters.map(c => `${c.name} (${c.rarity}★)`))
      
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

    // 2~5タグ選択時は全組み合わせ検索（25通り）
    const allCombos: ComboResult[] = []
    const guaranteedCombos: ComboResult[] = []
    
    if (selectedTags.length >= 2) {
      // 1~3タグの全組み合わせを生成（最大25通り）
      const maxComboSize = Math.min(selectedTags.length, 3)
      
      for (let size = 1; size <= maxComboSize; size++) {
        const combos = getCombinations(selectedTags, size)
        
        for (const combo of combos) {
          // 上級エリートを含む組み合わせは星6を含む、それ以外は星6を除外
          const eligibleCharacters = combo.includes('上級エリート') 
            ? characters 
            : characters.filter(char => char.rarity !== '6')
          
          const matchingCharacters = filterCharactersByTags(eligibleCharacters, combo)
          
          console.log(`組み合わせ [${combo.join(', ')}] の検索結果: ${matchingCharacters.length}件`)
          if (matchingCharacters.length > 0) {
            console.log(`  該当オペ: ${matchingCharacters.map(c => `${c.name} (${c.rarity}★)`).join(', ')}`)
          }
          
          // 該当オペレーターがいる場合のみ追加
          if (matchingCharacters.length > 0) {
            // 最低レアリティを特定して確定判定
            const lowestRarity = Math.min(...matchingCharacters.map(char => parseInt(char.rarity)))
            const isGuaranteed = lowestRarity >= 4
            
            console.log(`  最低レアリティ: ${lowestRarity}★, 確定判定: ${isGuaranteed}`)
            
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

    // 確定結果を優先度順にソート
    guaranteedCombos.sort((a: ComboResult, b: ComboResult) => {
      // 上級エリートを含む組み合わせを最上位に
      const aHasSeniorElite = a.combo.includes('上級エリート')
      const bHasSeniorElite = b.combo.includes('上級エリート')
      
      if (aHasSeniorElite && !bHasSeniorElite) return -1
      if (!aHasSeniorElite && bHasSeniorElite) return 1
      
      // エリートを含む組み合わせを次に
      const aHasElite = a.combo.includes('エリート')
      const bHasElite = b.combo.includes('エリート')
      
      if (aHasElite && !bHasElite) return -1
      if (!aHasElite && bHasElite) return 1
      
      // それ以外はオペレーター数昇順
      return a.characters.length - b.characters.length
    })

    // 確定結果の組み合わせをセットで管理
    const guaranteedComboSets = new Set(
      guaranteedCombos.map((result: ComboResult) => JSON.stringify(result.combo.sort()))
    )

    // 通常検索結果から確定結果を除外（ただし重複のみ除外）
    const filteredCombos = allCombos.filter((result: ComboResult) => {
      const comboKey = JSON.stringify(result.combo.sort())
      // 確定結果と重複する場合のみ除外
      return !guaranteedComboSets.has(comboKey)
    })

    // 全ての組み合わせをオペレーター数昇順でソート（純粋なオペ数昇順）
    filteredCombos.sort((a: ComboResult, b: ComboResult) => a.characters.length - b.characters.length)

    return { 
      characters: [], // 直接的なオペレーター表示は使わない
      guaranteedCombos: guaranteedCombos.map((r: ComboResult) => r.combo),
      allCombos: filteredCombos, // 確定結果を除外した候補のみを返す
      guaranteedResults: guaranteedCombos
    }
  }, [characters, selectedTags])

  return searchResult
}
