import { HeadlessCanvasFactory, CanvasContext } from '@utils/HeadlessCanvasFactory'
import { MutableRefObject, useEffect } from 'react'

type ICanvas = HTMLCanvasElement | OffscreenCanvas

function copyCanvas( from:ICanvas, to:ICanvas, drawWidth?:number, drawHeight?:number ) {
  const { width, height } = to
  const toContext: CanvasContext = to.getContext( '2d' ) as CanvasContext
  toContext.clearRect( 0, 0, width, height )
  // Copying
  if( ( drawWidth !== undefined ) && ( drawHeight !== undefined ) ) {
    toContext.drawImage( from, 0, 0, drawWidth, drawHeight )
  }
  else {
    toContext.drawImage( from, 0, 0 )
  }
}

function updateResolution( $display:HTMLCanvasElement, resolution:number, aspectRatio:number ) {
  // Calculating resolutions
  const { width:previousWidth, height:previousHeight } = $display
  const previousAspectRatio: number = previousWidth / previousHeight
  const width: number = resolution
  const height: number = resolution / aspectRatio
  // Saving previous state
  const displayClone = HeadlessCanvasFactory.createInstance( previousWidth, previousHeight )
  copyCanvas( $display, displayClone )
  // Reescaling
  $display.width = width
  $display.height = height
  // Setting previous state again
  copyCanvas( displayClone, $display, width, width / previousAspectRatio )
}

interface UseResolutionArgs {
  resolution: number
  aspectRatio: number
  displayRef: MutableRefObject<HTMLCanvasElement|null>
}

export function useResolution( args:UseResolutionArgs ) {
  const { resolution, aspectRatio, displayRef } = args
  useEffect( () => {
    const $display: HTMLCanvasElement | null = displayRef.current
    if( $display === null ) { return }
    // Setting display props
    updateResolution( $display, resolution, aspectRatio )
  }, [ resolution, aspectRatio, displayRef ] )
}
