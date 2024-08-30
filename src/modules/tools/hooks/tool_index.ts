import { Pencil } from '../models'
import { ToolIndex } from '../services'
import { useMemo } from 'react'
import { usePencil } from './pencil'

export function useToolIndex<T extends string>( defaultPencilColor:T ): ToolIndex<T> {
  const pencil: Pencil<T> = usePencil( defaultPencilColor )
  return useMemo( () => {
    return new ToolIndex( pencil )
  }, [ pencil ] )
}
