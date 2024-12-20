import { DrawingService } from '@draw/services'
import { useDisplay, useDrawingService } from '@draw/hooks'

interface UseDrawingDepsResult {
  loadDisplay( context:CanvasRenderingContext2D ): void
  drawingService: DrawingService
}

export function useDrawingDeps(): UseDrawingDepsResult {
  const { display, loadDisplay } = useDisplay()
  const drawingService: DrawingService = useDrawingService( display )
  return { loadDisplay, drawingService }
}
