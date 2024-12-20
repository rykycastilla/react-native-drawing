import { DrawingBoard } from '../models/DrawingBoard'
import { DrawingService } from '../services'
import { useMemo } from 'react'

export function useDrawingService( board:DrawingBoard ): DrawingService {
  return useMemo( () => {
    return new DrawingService( board )
  }, [ board ] )
}
