import { DrawingService } from '@draw/services'
import { MutableRefObject, ReactElement } from 'react'
import { Tool } from '@tools/models'
import { TouchDetectedEvent, TouchEndEvent } from '@touch/services'
import { useCallback, useEffect, useRef } from 'react'
import { useInteractionDeps } from './hooks'
import './styles.css'

interface TouchScreenProps {
  resolution: number
  tool: Tool
  drawingServiceRef: MutableRefObject<DrawingService|null>
}

const TouchScreen = ( props:TouchScreenProps ): ReactElement => {

  const { resolution, tool, drawingServiceRef } = props
  const screenRef = useRef<HTMLDivElement|null>( null )
  const { coordinatesService, touchService } = useInteractionDeps( { resolution, screenRef } )

  const onTouchDetected = useCallback( ( event:TouchDetectedEvent ) => {
    const drawingService: DrawingService | null = drawingServiceRef.current
    if( drawingService === null ) { return }
    const { x, y } = coordinatesService.toInternal( event.x, event.y )
    drawingService.use( event.targetId, x, y, tool )
  }, [ coordinatesService, drawingServiceRef, tool ] )

  const onTouchEnd = useCallback( ( event:TouchEndEvent ) => {
    const drawingService: DrawingService | null = drawingServiceRef.current
    if( drawingService === null ) { return }
    drawingService.stopStroke( event.targetId )
  }, [ drawingServiceRef ] )

  useEffect( () => {
    touchService.onTouchDetected( onTouchDetected )
    touchService.onTouchEnd( onTouchEnd )
  }, [ touchService, onTouchDetected, onTouchEnd ] )

  return (
    <div
      ref={ screenRef }
      className="touch-screen">
    </div>
  )

}

export default TouchScreen
