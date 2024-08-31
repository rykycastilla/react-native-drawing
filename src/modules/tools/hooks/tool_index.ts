import { Pencil } from '../models'
import { ToolIndex } from '../services'
import { useMemo } from 'react'
import { usePencil } from './pencil'

export function useToolIndex<T extends string>( defaultPencilColor:T, defaultToolSize:number ): ToolIndex<T> {
  const pencil: Pencil<T> = usePencil( defaultPencilColor, defaultToolSize )
  return useMemo( () => {
    return new ToolIndex( pencil )
  }, [ pencil ] )
}
