import { Eraser, Filler, Pencil } from '../models'
import { ToolIndex } from '../services'
import { useEraser } from './eraser'
import { useFiller } from './filler'
import { useMemo } from 'react'
import { usePencil } from './pencil'

export function useToolIndex( defaultToolColor:string, defaultToolSize:number ): ToolIndex {
  const pencil: Pencil = usePencil( defaultToolColor, defaultToolSize )
  const eraser: Eraser = useEraser( defaultToolSize )
  const filler: Filler = useFiller( defaultToolColor )
  return useMemo( () => {
    return new ToolIndex( pencil, eraser, filler )
  }, [ pencil, eraser, filler ] )
}
