import { DisplayLayout } from '../models'
import { ReactElement, TouchEvent } from 'react'
import { useCallback, useEffect, useRef } from 'react'
import { useLayoutManager } from '../hooks'
import './styles.css'

interface PositionHandlers {
  onTouchStart( event:TouchEvent ): void
  onTouchMove( event:TouchEvent ): void
  onTouchEnd( event:TouchEvent ): void
}

type LayoutSetter = ( layout:DisplayLayout ) => void

interface CanvasDisplayProps {
  className?: string
  positionHandlers?: PositionHandlers
  onLayout?: LayoutSetter
  onLoad( loaded:boolean ): void
  onContextCreate( context:CanvasRenderingContext2D ): void
}

const CanvasDisplay = ( props:CanvasDisplayProps ): ReactElement => {

  const { positionHandlers, onLoad, onContextCreate } = props
  const { className = '', onLayout = () => {} } = props
  const displayRef = useRef<HTMLCanvasElement|null>( null )
  useLayoutManager( { displayRef, setLayout: onLayout } )

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
      { ...positionHandlers }>
    </canvas>
  )

}

export default CanvasDisplay
