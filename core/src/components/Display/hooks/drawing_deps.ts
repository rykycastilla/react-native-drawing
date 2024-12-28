import { DrawingBoard } from '@draw/models'
import { DrawingService } from '@draw/services'
import { useDrawingBoard, useDrawingService } from '@draw/hooks'
import { useCallback, useState } from 'react'

interface UseDrawingDepsResult {
  loadDisplay( $canvas:HTMLCanvasElement ): void
  drawingService: DrawingService
}

export function useDrawingDeps(): UseDrawingDepsResult {

  const [ canvas, setCanvas ] = useState<HTMLCanvasElement|null>( null )
  const drawingBoard: DrawingBoard = useDrawingBoard( canvas )
  const drawingService: DrawingService = useDrawingService( drawingBoard )

  const loadDisplay = useCallback( ( canvas:HTMLCanvasElement ) => {
    setCanvas( canvas )
  }, [] )

  return { loadDisplay, drawingService }
}
