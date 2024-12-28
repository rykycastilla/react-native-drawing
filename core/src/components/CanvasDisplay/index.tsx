import { ReactElement, useEffect, useRef } from 'react'
import { useResolution } from './hooks'
import './styles.css'

interface CanvasDisplayProps {
  className?: string
  width: number
  height: number
  onLoad( loaded:boolean ): void
  onCanvasCreate( canvas:HTMLCanvasElement ): void
}

const CanvasDisplay = ( props:CanvasDisplayProps ): ReactElement => {

  const { className = '', width, height, onLoad, onCanvasCreate } = props
  const displayRef = useRef<HTMLCanvasElement|null>( null )
  useResolution( { width, height, displayRef } )

  useEffect( () => {
    onLoad( false )
  }, [ onLoad ] )

  useEffect( () => {
    const $display: HTMLCanvasElement | null = displayRef.current
    if( $display === null ) { return }
    onCanvasCreate( $display )
    onLoad( true )
  }, [ displayRef, onCanvasCreate ] )  // eslint-disable-line

  return (
    <canvas
      ref={ displayRef }
      className={ `canvas-display ${ className }` }>
    </canvas>
  )

}

export default CanvasDisplay
