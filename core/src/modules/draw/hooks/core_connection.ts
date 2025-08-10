import { CoreController } from '@draw/controllers'
import { DrawingService } from '@draw/services'
import { ITool } from '@tools/models'
import { MutableRefObject, useEffect, useMemo } from 'react'
import { RNBridge } from '@utils/RNBridge'

function useCoreControllerRef(
  drawingServiceRef:MutableRefObject<DrawingService|null>, currentTool:ITool,
): CoreController {

  const coreController: CoreController = useMemo( () => {
    return new CoreController( drawingServiceRef as { current:DrawingService } )
  }, [ drawingServiceRef ] )

  useEffect( () => {
    coreController.setTool( currentTool )
  }, [ coreController, currentTool ] )

  return coreController

}

interface UseConnectDrawControllerArgs {
  drawingServiceRef: MutableRefObject<DrawingService|null>
  currentTool: ITool
}

export function useCoreConnection( args:UseConnectDrawControllerArgs ) {

  const { drawingServiceRef, currentTool } = args
  const coreController: CoreController | null = useCoreControllerRef(
    drawingServiceRef, currentTool,
  )

  useEffect( () => {
    if( coreController === null ) { return }
    if( coreController.onhistorymove === null ) {
      coreController.onhistorymove = ( canUndo:boolean, canRedo:boolean ) => {
        RNBridge.postMessage( 'draw-history-move', { canUndo, canRedo } )
      }
    }
    if( coreController.onfilling === null ) {
      coreController.onfilling = async( isStarting:boolean, x:number, y:number, color:string ) => {
        await RNBridge.postMessage( 'filling', { isStarting, x, y, color } )
      }
    }
    if( coreController.onframereport === null ) {
      coreController.onframereport = ( fps:number ) => {
        RNBridge.postMessage( 'fps-report', { fps } )
      }
    }
    RNBridge.onMessage( 'draw-clear', async( color:unknown ) => {
      await coreController.clear( color as string | undefined )
    } )
    RNBridge.onMessage( 'draw-get-image', async() => {
      return coreController.getImage()
    } )
    RNBridge.onMessage( 'draw-set-image', async( image:unknown ) => {
      await coreController.setImage( image as string )
    } )
    RNBridge.onMessage( 'draw-history-undo', async() => {
      await coreController.undo()
    } )
    RNBridge.onMessage( 'draw-history-redo', async() => {
      await coreController.redo()
    } )
    RNBridge.onMessage( 'draw-history-reset', async() => {
      await coreController.resetHistory()
    } )
    RNBridge.onMessage( 'draw-touch', ( args:unknown ) => {
      const { type, x, y, parsedId } = args as { type:TouchType, x:number, y:number, parsedId:number }
      coreController.touch( type, x, y, parsedId )
    } )
  }, [ coreController ] )

}

type TouchType = 'start' | 'move' | 'end'
