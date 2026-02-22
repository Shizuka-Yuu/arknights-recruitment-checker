export interface Character {
  rarity: string
  icon: string
  name: string
  class: string
  position: string
  tags: string
  special: string
}

export interface TagCategory {
  type: string[]
  position: string[]
  tags: string[]
  confirmed: string[]
}

export interface SearchResult {
  characters: Character[]
  guaranteedCombos?: string[][]
  candidateCombos?: string[][] // 星3を含む星4~5候補
  allCombos?: ComboResult[] // キャラクター数昇順のフラットな配列
  guaranteedResults?: ComboResult[] // 確定結果の詳細
}

export interface ComboResult {
  combo: string[]
  characters: Character[]
  isGuaranteed: boolean
}

export interface RecruitmentState {
  selectedTags: string[]
  searchResults: Character[]
  guaranteedResults: string[][]
}
