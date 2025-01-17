import { createEmptyImage } from '../controllers'
import { DrawingScene } from '../models/DrawingScene'
import { DrawingService } from '../services'
import { History } from '@history/services'
import { useEffect, useMemo } from 'react'
import { useHistory } from '@history/hooks'

export function useDrawingService( scene:DrawingScene ): DrawingService {

  const { width, height } = scene
  const history: History = useHistory( width, height )

  const drawingService: DrawingService = useMemo( () => {
    return new DrawingService( scene, history, createEmptyImage )
  }, [ scene ] )  // eslint-disable-line

  useEffect( () => {
    drawingService.setHistory( history )
  }, [ drawingService, history ] )

  return drawingService

}
