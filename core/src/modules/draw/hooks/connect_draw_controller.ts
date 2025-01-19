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
    if( drawController.onhistorymove === null ) {
      drawController.onhistorymove = ( canUndo:boolean, canRedo:boolean ) => {
        RNBridge.postMessage( 'draw-history-move', { canUndo, canRedo } )
      }
    }
    RNBridge.onMessage( 'draw-clear', async( color:unknown ) => {
      await drawController.clear( color as string | undefined )
    } )
    RNBridge.onMessage( 'draw-get-image', async() => {
      return drawController.getImage()
    } )
    RNBridge.onMessage( 'draw-set-image', async( image:unknown ) => {
      await drawController.setImage( image as string )
    } )
    RNBridge.onMessage( 'draw-history-undo', async() => {
      await drawController.undo()
    } )
    RNBridge.onMessage( 'draw-history-redo', async() => {
      await drawController.redo()
    } )
  }, [ drawController ] )

}
