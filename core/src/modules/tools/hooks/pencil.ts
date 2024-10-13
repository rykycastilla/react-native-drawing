import { Pencil } from '../models'
import { useMemo } from 'react'

export function usePencil( defaultPencilColor:string, defaultToolSize:number ): Pencil {
  return useMemo( () => {
    return new Pencil( defaultPencilColor, defaultToolSize )
  // eslint-disable-next-line
  }, [] )
}
