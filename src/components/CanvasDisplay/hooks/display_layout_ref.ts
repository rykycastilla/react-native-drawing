import { DEFAULT_LAYOUT } from '../constants'
import { DisplayLayout } from '../models'
import { MutableRefObject, useRef } from 'react'

export function useDisplayLayoutRef(): MutableRefObject<DisplayLayout> {
  return useRef( DEFAULT_LAYOUT )
}
