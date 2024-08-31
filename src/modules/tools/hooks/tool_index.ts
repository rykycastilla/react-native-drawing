import { Eraser, Pencil } from '../models'
import { ToolIndex } from '../services'
import { useEraser } from './eraser'
import { useMemo } from 'react'
import { usePencil } from './pencil'

export function useToolIndex<T extends string>( defaultPencilColor:T, defaultToolSize:number ): ToolIndex<T> {
  const pencil: Pencil<T> = usePencil( defaultPencilColor, defaultToolSize )
  const eraser: Eraser<T> = useEraser( defaultToolSize )
  return useMemo( () => {
    return new ToolIndex( pencil, eraser )
  }, [ pencil, eraser ] )
}
