import { DrawingService } from '../services'
import { Matrix } from '../models'
import { useMemo } from 'react'

export function useDrawingService( matrix:Matrix ): DrawingService {
  return useMemo( () => {
    return new DrawingService( matrix )
  }, [ matrix ] )
}
