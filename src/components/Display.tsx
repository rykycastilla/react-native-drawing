import CanvasDisplay, { useDisplayLayout } from './CanvasDisplay'
import { CoordinatesService, DrawingService } from '../modules/draw/services'
import { Matrix } from '../modules/draw/models'
import { ReactElement, useCallback, useEffect } from 'react'
import { Tool } from '../modules/tools/models'
import { TouchDetectedEvent, TouchEndEvent } from '../modules/touch/services'
import { useCoordinatesService, useDisplay, useDrawingService, useMatrix } from '../modules/draw/hooks'
import { useTouchPosition } from '../modules/touch/hooks'

interface DisplayProps {
  resolution: number
  tool: Tool
  onLoad( loaded:boolean ): void
}

const Display = ( props:DisplayProps ): ReactElement => {

  const { resolution, tool, onLoad } = props
  const { display, loadDisplay } = useDisplay()
  const matrix: Matrix = useMatrix( resolution, display )
  const drawingService: DrawingService = useDrawingService( matrix )
  const { layout, setLayout } = useDisplayLayout()
  const coordinatesService: CoordinatesService = useCoordinatesService( layout, resolution )
  const { touch, positionHandlers } = useTouchPosition()

  const onTouchDetected = useCallback( ( event:TouchDetectedEvent ) => {
    const { x, y } = coordinatesService.toInternal( event.x, event.y )
    drawingService.use( event.targetId, x, y, tool )
  }, [ coordinatesService, drawingService, tool ] )

  const onTouchEnd = useCallback( ( event:TouchEndEvent ) => {
    drawingService.stopStroke( event.targetId )
  }, [ drawingService ] )

  useEffect( () => {
    touch.onTouchDetected( onTouchDetected )
    touch.onTouchEnd( onTouchEnd )
  }, [ touch, onTouchDetected, onTouchEnd ] )

  return (
    <CanvasDisplay
      positionHandlers={ positionHandlers }
      onLayout={ setLayout }
      onLoad={ onLoad }
      onContextCreate={ loadDisplay } />
  )

}

export default Display
