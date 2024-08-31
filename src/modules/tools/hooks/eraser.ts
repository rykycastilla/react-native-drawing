import { Eraser } from '../models'
import { useMemo } from 'react'

export function useEraser<T extends string>( defaultToolSize:number ): Eraser<T> {
  return useMemo( () => {
    return new Eraser( defaultToolSize )
  // eslint-disable-next-line
  }, [] )
}
