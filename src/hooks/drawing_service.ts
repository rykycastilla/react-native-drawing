import { DrawingService } from '../services'
import { Matrix } from '../model'
import { useMemo } from 'react'

export function useDrawingService<T extends string>( matrix:Matrix<T> ): DrawingService<T> {
  return useMemo( () => {
    return new DrawingService( matrix )
  }, [ matrix ] )
}
