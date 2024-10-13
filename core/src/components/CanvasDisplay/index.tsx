import { ReactElement, useCallback, useEffect, useRef } from 'react'
import { useResolution } from './hooks'
import './styles.css'

interface CanvasDisplayProps {
  className?: string
  width: number
  height: number
  onLoad( loaded:boolean ): void
  onContextCreate( context:CanvasRenderingContext2D ): void
}

const CanvasDisplay = ( props:CanvasDisplayProps ): ReactElement => {

  const { className = '', width, height, onLoad, onContextCreate } = props
  const displayRef = useRef<HTMLCanvasElement|null>( null )
  useResolution( { width, height, displayRef } )

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
      className={ `canvas-display ${ className }` }>
    </canvas>
  )

}

export default CanvasDisplay
