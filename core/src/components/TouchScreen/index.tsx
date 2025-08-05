import { DrawingService } from '@draw/services'
import { forwardRef, ForwardedRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react'
import { ITool } from '@tools/models'
import { MutableRefObject, ReactElement } from 'react'
import { DrawTouchEvent } from '@touch/services'
import { useInteractionDeps } from './hooks'
import './styles.css'

interface TouchScreenProps {
  resolution: number
  tool: ITool
  viewportControlAllowed: boolean
  drawingServiceRef: MutableRefObject<DrawingService|null>
}

const TouchScreen = forwardRef( ( props:TouchScreenProps, ref:ForwardedRef<HTMLDivElement|null> ): ReactElement => {

  const { resolution, tool, viewportControlAllowed, drawingServiceRef } = props

  const screenRef = useRef<HTMLDivElement|null>( null )
  useImperativeHandle( ref, () => screenRef.current!, [ screenRef ] )

  const useInteractionDepsArgs = { resolution, viewportControlAllowed, screenRef }
  const { coordinatesService, touchService } = useInteractionDeps( useInteractionDepsArgs )

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

} )

export default TouchScreen
