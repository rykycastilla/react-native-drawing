import { DEFAULT_LAYOUT } from '../constants'
import { DisplayLayout } from '../models'
import { useState } from 'react'

interface UseDisplayLayoutResult {
  layout: DisplayLayout
  setLayout( layout:DisplayLayout ): void
}

export function useDisplayLayout(): UseDisplayLayoutResult {
  const [ layout, setLayout ] = useState( DEFAULT_LAYOUT )
  return { layout, setLayout }
}
