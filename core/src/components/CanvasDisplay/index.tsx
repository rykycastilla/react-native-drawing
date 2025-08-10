import { ReactElement, useEffect, useRef } from 'react'
import { useResolution } from './hooks'
import './styles.css'

interface CanvasDisplayProps {
  backgroundColor?: string
  className?: string
  resolution: number
  aspectRatio: number
  onLoad( loaded:boolean ): void
  onCanvasCreate( canvas:HTMLCanvasElement ): void
}

const CanvasDisplay = ( props:CanvasDisplayProps ): ReactElement => {

  const { backgroundColor, className = '', resolution, aspectRatio, onLoad, onCanvasCreate } = props
  const displayRef = useRef<HTMLCanvasElement|null>( null )
  useResolution( { resolution, aspectRatio, displayRef } )

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
      style={ { backgroundColor } }
      className={ `canvas-display ${ className }` }>
    </canvas>
  )

}

export default CanvasDisplay
