import { Eraser } from '../models'
import { useMemo } from 'react'

export function useEraser( defaultToolSize:number ): Eraser {
  return useMemo( () => {
    return new Eraser( defaultToolSize )
  // eslint-disable-next-line
  }, [] )
}
