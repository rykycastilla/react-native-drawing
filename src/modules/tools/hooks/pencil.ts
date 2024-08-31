import { Pencil } from '../models'
import { useMemo } from 'react'

export function usePencil<T extends string>( defaultPencilColor:T, defaultToolSize:number ): Pencil<T> {
  return useMemo( () => {
    return new Pencil( defaultPencilColor, defaultToolSize )
  // eslint-disable-next-line
  }, [] )
}
