import { Eraser, Pencil } from '../models'
import { ToolIndex } from '../services'
import { useEraser } from './eraser'
import { useMemo } from 'react'
import { usePencil } from './pencil'

export function useToolIndex( defaultPencilColor:string, defaultToolSize:number ): ToolIndex {
  const pencil: Pencil = usePencil( defaultPencilColor, defaultToolSize )
  const eraser: Eraser = useEraser( defaultToolSize )
  return useMemo( () => {
    return new ToolIndex( pencil, eraser )
  }, [ pencil, eraser ] )
}
