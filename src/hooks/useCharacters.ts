import { useState, useEffect } from 'react'
import type { Character } from '../types'

export const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        const response = await fetch('https://arknight-data-backend.shizuka-y.workers.dev/')
        const data = await response.json()
        setCharacters(data)
      } catch (error) {
        console.error('キャラクターデータの読み込みに失敗しました:', error)
      } finally {
        setLoading(false)
      }
    }

    loadCharacters()
  }, [])

  return { characters, loading }
}
