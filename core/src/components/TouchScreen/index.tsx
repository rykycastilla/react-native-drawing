import { DrawingService } from '@draw/services'
import { MutableRefObject, ReactElement } from 'react'
import { Tool } from '@tools/models'
import { DrawTouchEvent } from '@touch/services'
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

  const onTouchDetected = useCallback( ( event:DrawTouchEvent ) => {
    const drawingService: DrawingService | null = drawingServiceRef.current
    if( drawingService === null ) { return }
    const { x, y } = coordinatesService.toInternal( event.x, event.y )
    drawingService.use( x, y, event.targetId, tool )
  }, [ coordinatesService, drawingServiceRef, tool ] )

  const onTouchEnd = useCallback( ( event:DrawTouchEvent ) => {
    const drawingService: DrawingService | null = drawingServiceRef.current
    if( drawingService === null ) { return }
    const { x, y } = coordinatesService.toInternal( event.x, event.y )
    drawingService.stopStroke( x, y, event.targetId, tool )
  }, [ coordinatesService, drawingServiceRef, tool ] )

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
