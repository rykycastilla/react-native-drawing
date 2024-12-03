import { Display } from '../models/Display'
import { DrawingService } from '../services'
import { Matrix } from '../models'
import { useMemo } from 'react'

export function useDrawingService( matrix:Matrix, display:Display ): DrawingService {
  return useMemo( () => {
    return new DrawingService( matrix, display )
  }, [ matrix, display ] )
}
