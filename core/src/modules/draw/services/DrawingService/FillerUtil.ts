import { DrawUtil } from './DrawUtil'
import { Filler } from '@tools/models'
import type { DrawingService } from '../DrawingService'

export abstract class FillerUtil extends DrawUtil {

  protected initFiller( filler:Filler ) {
    if( filler.onstarteachtask === null ) {
      filler.onstarteachtask = ( args ) => {
        const { x, y, color } = args
        FillerUtil.dispatchFilling( this as unknown as DrawingService, true, x, y, color )
        FillerUtil.dispatchHistoryMove( this as unknown as DrawingService, false, false )
      }
    }
    if( filler.onfinish === null ) {
      filler.onfinish = ( args ) => {
        const { x, y, color } = args
        FillerUtil.dispatchFilling( this as unknown as DrawingService, false, x, y, color )
        this.historyService.saveSnapShot( true )  // Updating history state again (even if the state is the same)
        // The previous action is required because the filler tasks disable the history state and it needs to be re-enabled
      }
    }
  }

  public static onfilling: FillingHandler | null = null

  private static dispatchFilling( target:DrawingService, isStarting:boolean, x:number, y:number, color:string ) {
    if( this.onfilling === null ) { return }
    this.onfilling( target, isStarting, x, y, color )
  }

}

interface FillingHandler {
  ( target:DrawingService, isStarting:boolean, x:number, y: number, color:string ): void
}
