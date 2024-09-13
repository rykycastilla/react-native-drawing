import { DrawingService } from '@draw/services'
import { Matrix } from '@draw/models'
import { useDisplay, useDrawingService, useMatrix } from '@draw/hooks'

interface UseDrawingDepsResult {
  loadDisplay( context:CanvasRenderingContext2D ): void
  drawingService: DrawingService
}

export function useDrawingDeps( resolution:number ): UseDrawingDepsResult {
  const { display, loadDisplay } = useDisplay()
  const matrix: Matrix = useMatrix( resolution, display )
  const drawingService: DrawingService = useDrawingService( matrix )
  return { loadDisplay, drawingService }
}
