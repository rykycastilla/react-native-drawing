import { createEmptyImage } from '../controllers'
import { DrawingScene } from '../models/DrawingScene'
import { DrawingService } from '../services'
import { useMemo } from 'react'

export function useDrawingService( scene:DrawingScene ): DrawingService {
  return useMemo( () => {
    return new DrawingService( scene, createEmptyImage )
  }, [ scene ] )
}
