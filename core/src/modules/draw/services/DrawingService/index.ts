import { CreateEmptyImageFunction } from './DrawUtil'
import { DrawingScene } from '../../models'
import { Filler, ITool } from '@tools/models'
import { FillerUtil } from './FillerUtil'
import { History, IHistoryService } from '@history/services'
import { HistoryControl } from './HistoryControl'

export class DrawingService extends FillerUtil implements IHistoryService {

  /**
   * @param history  The history passed to this object shouldn't use its onmove method
   * in another place, because it is readed and modified by this object
  */
  constructor( scene:DrawingScene, history:History,
    protected readonly createEmptyImage: CreateEmptyImageFunction,
  ) {
    super( scene, history )
    this.scene.onframereport = ( fps:number ) => {
      DrawingService.dispatchFrameReport( this, fps )
    }
  }

  public stopStroke( x:number, y:number, strokeId:symbol, tool:ITool ) {
    tool.endShapeStroke( x, y, strokeId, this.scene )
    if( !( tool instanceof Filler ) ) { this.historyService.saveSnapShot() }
  }

  public use( x:number, y:number, strokeId:symbol, tool:ITool ) {
    // Using filler saver
    // Filler has an special saving strategy, because it runs many scenes periodically
    // and the saver shouldn't be executed to up the touch
    if( tool instanceof Filler ) { this.initFiller( tool ) }
    // Executing tool
    tool.addStrokePoint( x, y, strokeId, this.scene )
  }

  public static onframereport: FrameReportFunction | null = null

  private static dispatchFrameReport( target:DrawingService, fps:number ) {
    if( this.onframereport === null ) { return }
    this.onframereport( target, fps )
  }

  public static get onhistorymove() {
    return HistoryControl.onhistorymove
  }

  public static set onhistorymove( onhistorymove ) {
    HistoryControl.onhistorymove = onhistorymove
  }

  public static get onfilling() {
    return FillerUtil.onfilling
  }

  public static set onfilling( onfilling ) {
    FillerUtil.onfilling = onfilling
  }

}

interface FrameReportFunction {
  ( target:DrawingService, fps:number ): void
}
