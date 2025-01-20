import { DrawingScene } from '../models'
import { Filler, ITool } from '@tools/models'
import { History, HistoryService, IHistoryService } from '@history/services'

// @ts-expect-error - JSDoc Type
import { HistoryOutOfBoundsError } from '@shared/modules/history/errors'  // eslint-disable-line

export class DrawingService implements IHistoryService {

  private readonly historyService: HistoryService

  /**
   * @param history  The history passed to this object shouldn't use its onmove method
   * in another place, because it is readed and modified by this object
  */
  constructor(
    private readonly scene: DrawingScene,
    history:History,
    private readonly createEmptyImage: CreateEmptyImageFunction,
  ) {
    this.historyService = new HistoryService( history, () => this.scene )
    this.historyService.onmove = ( canUndo:boolean, canRedo:boolean ) => {
      DrawingService.dispatchHistoryMove( this, canUndo, canRedo )
    }
    this.historyService.saveSnapShot()
  }

  public async clear( color?:string ) {
    const { width, height } = this.scene
    const image: string = this.createEmptyImage( width, height, color )
    await this.scene.setImage( image )
    this.historyService.saveSnapShot()
  }

  public stopStroke( x:number, y:number, strokeId:symbol, tool:ITool ) {
    tool.endShapeStroke( x, y, strokeId, this.scene )
    if( !( tool instanceof Filler ) ) { this.historyService.saveSnapShot() }
  }

  private initFiller( filler:Filler ) {
    if( filler.onfinish === null ) {
      filler.onfinish = () => this.historyService.saveSnapShot()
    }
    if( filler.onstarteachtask === null ) {
      filler.onstarteachtask = () => DrawingService.dispatchHistoryMove( this, false, false )
    }
  }

  public use( x:number, y:number, strokeId:symbol, tool:ITool ) {
    // Using filler saver
    // Filler has an special saving strategy, because it runs many scenes periodically
    // and the saver shouldn't be executed to up the touch
    if( tool instanceof Filler ) { this.initFiller( tool ) }
    // Executing tool
    tool.addStrokePoint( x, y, strokeId, this.scene )
  }

  public async undo() {
    await this.historyService.undo()
  }

  public async redo() {
    await this.historyService.redo()
  }

  get image(): string {
    return this.scene.image
  }

  public async setImage( image:string ) {
    await this.scene.setImage( image )
    this.historyService.saveSnapShot()
  }

  public setHistory( history:History ) {
    this.historyService.setHistory( history )
  }

  public static onhistorymove: HistoryMoveHandler | null = null

  private static dispatchHistoryMove( target:DrawingService, canUndo:boolean, canRedo:boolean ) {
    if( DrawingService.onhistorymove === null ) { return }
    DrawingService.onhistorymove( target, canUndo, canRedo )
  }

}

interface CreateEmptyImageFunction {
  ( width:number, height:number, color?:string ): string
}

interface HistoryMoveHandler {
  ( target:DrawingService, canUndo:boolean, canRedo:boolean ): Promise<void> | void
}
