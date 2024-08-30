import { Pencil } from '../models'
import { useMemo } from 'react'

export function usePencil<T extends string>( defaultPencilColor:T ): Pencil<T> {
  return useMemo( () => {
    return new Pencil( defaultPencilColor )
  // eslint-disable-next-line
  }, [] )
}
