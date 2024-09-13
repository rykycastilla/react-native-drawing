import CanvasDisplay, { useDisplayLayout } from './CanvasDisplay'
import { CoordinatesService, DrawingService } from '@draw/services'
import { Matrix } from '@draw/models'
import { ReactElement, useCallback, useEffect, useRef } from 'react'
import { Tool } from '@tools/models'
import { TouchDetectedEvent, TouchEndEvent } from '@touch/services'
import { useCoordinatesService, useDisplay, useDrawingService, useMatrix } from '@draw/hooks'
import { useTouchPosition } from '@touch/hooks'

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
  const screenRef = useRef<HTMLCanvasElement|null>( null )
  const { touchService } = useTouchPosition( { screenRef } )

  const onTouchDetected = useCallback( ( event:TouchDetectedEvent ) => {
    const { x, y } = coordinatesService.toInternal( event.x, event.y )
    drawingService.use( event.targetId, x, y, tool )
  }, [ coordinatesService, drawingService, tool ] )

  const onTouchEnd = useCallback( ( event:TouchEndEvent ) => {
    drawingService.stopStroke( event.targetId )
  }, [ drawingService ] )

  useEffect( () => {
    touchService.onTouchDetected( onTouchDetected )
    touchService.onTouchEnd( onTouchEnd )
  }, [ touchService, onTouchDetected, onTouchEnd ] )

  return (
    <CanvasDisplay
      ref={ screenRef }
      width={ resolution }
      height={ resolution }
      onLayout={ setLayout }
      onLoad={ onLoad }
      onContextCreate={ loadDisplay } />
  )

}

export default Display
