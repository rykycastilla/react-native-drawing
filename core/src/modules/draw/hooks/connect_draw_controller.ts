import { DrawController } from '@draw/controllers'
import { DrawingService } from '@draw/services'
import { ITool } from '@tools/models'
import { MutableRefObject, useEffect, useMemo } from 'react'
import { RNBridge } from '@utils/RNBridge'

function useDrawControllerRef(
  drawingServiceRef:MutableRefObject<DrawingService|null>, currentTool:ITool,
): DrawController {

  const drawController: DrawController = useMemo( () => {
    return new DrawController( drawingServiceRef as { current:DrawingService } )
  }, [ drawingServiceRef ] )

  useEffect( () => {
    drawController.setTool( currentTool )
  }, [ drawController, currentTool ] )

  return drawController

}

interface UseConnectDrawControllerArgs {
  drawingServiceRef: MutableRefObject<DrawingService|null>
  currentTool: ITool
}

export function useConnectDrawController( args:UseConnectDrawControllerArgs ) {

  const { drawingServiceRef, currentTool } = args
  const drawController: DrawController | null = useDrawControllerRef(
    drawingServiceRef, currentTool,
  )

  useEffect( () => {
    if( drawController === null ) { return }
    if( drawController.onhistorymove === null ) {
      drawController.onhistorymove = ( canUndo:boolean, canRedo:boolean ) => {
        RNBridge.postMessage( 'draw-history-move', { canUndo, canRedo } )
      }
    }
    if( drawController.onfilling === null ) {
      drawController.onfilling = ( isStarting:boolean, x:number, y:number, color:string ) => {
        RNBridge.postMessage( 'filling', { isStarting, x, y, color } )
      }
    }
    if( drawController.onframereport === null ) {
      drawController.onframereport = ( fps:number ) => {
        RNBridge.postMessage( 'fps-report', { fps } )
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
    RNBridge.onMessage( 'draw-touch', ( args:unknown ) => {
      const { type, x, y, parsedId } = args as { type:TouchType, x:number, y:number, parsedId:number }
      drawController.touch( type, x, y, parsedId )
    } )
  }, [ drawController ] )

}

type TouchType = 'start' | 'move' | 'end'
