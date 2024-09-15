import { DisplayLayout } from '../models'
import { ForwardedRef, ReactElement } from 'react'
import { forwardRef, useCallback, useEffect, useRef } from 'react'
import { useDisplayRef, useLayoutManager, useResolution } from '../hooks'
import '../styles.css'

type LayoutSetter = ( layout:DisplayLayout ) => void

interface CanvasDisplayProps {
  className?: string
  width: number
  height: number
  onLayout?: LayoutSetter
  onLoad( loaded:boolean ): void
  onContextCreate( context:CanvasRenderingContext2D ): void
}

const CanvasDisplay = forwardRef( ( props:CanvasDisplayProps, ref:ForwardedRef<HTMLCanvasElement|null> ): ReactElement => {

  const { width, height, onLoad, onContextCreate } = props
  const { className = '', onLayout = () => {} } = props
  const displayRef = useRef<HTMLCanvasElement|null>( null )
  useResolution( { width, height, displayRef } )
  useDisplayRef( { ref, displayRef } )
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
      className={ `canvas-display ${ className }` }>
    </canvas>
  )

} )

export default CanvasDisplay
