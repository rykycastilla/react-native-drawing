import CanvasDisplay from '@components/CanvasDisplay'
import { ReactElement, useCallback, useEffect } from 'react'
import { Tool } from '@tools/models'
import { TouchDetectedEvent, TouchEndEvent } from '@touch/services'
import { useDrawingDeps, useInteractionDeps } from './hooks'

interface DisplayProps {
  resolution: number
  tool: Tool
  onLoad( loaded:boolean ): void
}

const Display = ( props:DisplayProps ): ReactElement => {

  // Preparing canvas dependencies
  const { resolution, tool, onLoad } = props
  const { loadDisplay, drawingService } = useDrawingDeps( resolution )
  const { setLayout, coordinatesService, touchService, screenRef } = useInteractionDeps( resolution )

  // Painting with interaction

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
