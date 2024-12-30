import { filterColorAlpha } from '../controllers'
import { Pencil } from '../models'
import { useMemo } from 'react'

export function usePencil( defaultPencilColor:string, defaultToolSize:number ): Pencil {
  return useMemo( () => {
    return new Pencil( defaultPencilColor, defaultToolSize, filterColorAlpha )
  // eslint-disable-next-line
  }, [] )
}
