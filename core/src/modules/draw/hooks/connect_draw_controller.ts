import { DrawController } from '@draw/controllers'
import { DrawingService } from '@draw/services'
import { MutableRefObject, useEffect, useMemo } from 'react'
import { RNBridge } from '@utils/RNBridge'

interface UseDrawControllerRefArgs {
  drawingServiceRef: MutableRefObject<DrawingService|null>
}

function useDrawControllerRef( args:UseDrawControllerRefArgs ): DrawController {
  const { drawingServiceRef } = args
  return useMemo( () => {
    return new DrawController( drawingServiceRef as { current:DrawingService } )
  }, [ drawingServiceRef ] )
}

interface UseConnectDrawControllerArgs {
  drawingServiceRef: MutableRefObject<DrawingService|null>
}

export function useConnectDrawController( args:UseConnectDrawControllerArgs ) {

  const { drawingServiceRef } = args
  const drawController: DrawController | null = useDrawControllerRef( { drawingServiceRef } )

  useEffect( () => {
    if( drawController === null ) { return }
    RNBridge.onMessage( 'draw-clear', async( color:unknown ) => {
      return drawController.clear( color as string | undefined )
    } )
    RNBridge.onMessage( 'draw-get-image', async() => {
      return drawController.getImage()
    } )
    RNBridge.onMessage( 'draw-set-image', async( image:unknown ) => {
      drawController.setImage( image as string )
    } )
  }, [ drawController ] )

}
