import { Eraser, Filler, None, Pencil } from '../models'
import { ToolIndex } from '../services'
import { useEraser } from './eraser'
import { useFiller } from './filler'
import { useMemo } from 'react'
import { useNone } from './none'
import { usePencil } from './pencil'

export function useToolIndex( defaultToolColor:string, defaultToolSize:number ): ToolIndex {
  const none: None = useNone()
  const pencil: Pencil = usePencil( defaultToolColor, defaultToolSize )
  const eraser: Eraser = useEraser( defaultToolSize )
  const filler: Filler = useFiller( defaultToolColor )
  return useMemo( () => {
    return new ToolIndex( none, pencil, eraser, filler )
  }, [ none, pencil, eraser, filler ] )
}
