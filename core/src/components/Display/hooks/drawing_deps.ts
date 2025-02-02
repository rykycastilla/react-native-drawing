import { DrawingScene } from '@draw/models'
import { DrawingService } from '@draw/services'
import { useDrawingScene, useDrawingService } from '@draw/hooks'
import { useCallback, useState } from 'react'

interface UseDrawingDepsResult {
  loadDisplay( $canvas:HTMLCanvasElement ): void
  drawingService: DrawingService
}

export function useDrawingDeps( width:number, height:number ): UseDrawingDepsResult {

  const [ canvas, setCanvas ] = useState<HTMLCanvasElement|null>( null )
  const DrawingScene: DrawingScene = useDrawingScene( canvas )
  const drawingService: DrawingService = useDrawingService( DrawingScene, width, height )

  const loadDisplay = useCallback( ( canvas:HTMLCanvasElement ) => {
    setCanvas( canvas )
  }, [] )

  return { loadDisplay, drawingService }
}
