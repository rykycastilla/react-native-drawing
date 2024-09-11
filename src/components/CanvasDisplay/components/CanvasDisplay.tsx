import { DisplayLayout } from '../models'
import { ForwardedRef, forwardRef, ReactElement, TouchEvent } from 'react'
import { useCallback, useEffect, useRef } from 'react'
import { useLayoutManager } from '../hooks'
import './styles.css'

interface PositionHandlers {
  onTouchStart( event:TouchEvent ): void
  onTouchMove( event:TouchEvent ): void
  onTouchEnd( event:TouchEvent ): void
}

interface CanvasDisplayProps {
  className?: string
  positionHandlers?: PositionHandlers
  onLoad( loaded:boolean ): void
  onContextCreate( context:CanvasRenderingContext2D ): void
}

const CanvasDisplay = forwardRef( ( props:CanvasDisplayProps, ref:ForwardedRef<DisplayLayout> ): ReactElement => {

  const { className = '', positionHandlers, onLoad, onContextCreate } = props
  const displayRef = useRef<HTMLCanvasElement|null>( null )
  const { onResize } = useLayoutManager( { ref, displayRef } )

  useEffect( () => {
    onLoad( false )
  }, [ onLoad ] )

  const _onContextCreate = useCallback( ( context:CanvasRenderingContext2D ) => {
    onContextCreate( context )
    onLoad( true )
  }, [] )  // eslint-disable-line

  useEffect( () => {
    const $display: HTMLCanvasElement | null = displayRef.current
    if( $display === null ) { return }
    const context: CanvasRenderingContext2D = $display.getContext( '2d' )!
    _onContextCreate( context )
  }, [ displayRef, _onContextCreate ] )

  return (
    <canvas
      ref={ displayRef }
      className={ `canvas-display ${ className }` }
      { ...positionHandlers }
      onResize={ onResize }>
    </canvas>
  )

} )

export default CanvasDisplay
