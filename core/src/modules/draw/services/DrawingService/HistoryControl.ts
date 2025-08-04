import { DrawingScene } from '../../models'
import { History, HistoryService } from '@history/services'
import type { DrawingService } from '../DrawingService'

// @ts-expect-error - JSDoc Type
import { HistoryOutOfBoundsError } from '@shared/modules/history/errors'  // eslint-disable-line

export abstract class HistoryControl {

  protected readonly historyService: HistoryService

  /**
   * @param history  The history passed to this object shouldn't use its onmove method
   * in another place, because it is readed and modified by this object
  */
  constructor(
    protected readonly scene: DrawingScene,
    history:History,
  ) {
    this.scene = scene
    this.historyService = new HistoryService( history, () => this.scene )
    this.historyService.onmove = ( canUndo:boolean, canRedo:boolean ) => {
      HistoryControl.dispatchHistoryMove( this as unknown as DrawingService, canUndo, canRedo )
    }
  }

  /**
   * @throws { HistoryOutOfBoundsError }
  */
  public async undo() {
    await this.historyService.undo()
  }

  /**
   * @throws { HistoryOutOfBoundsError }
  */
  public async redo() {
    await this.historyService.redo()
  }

  public async resetHistory() {
    await this.historyService.resetHistory()
  }

  public setHistory( history:History ) {
    this.historyService.setHistory( history )
  }

  public static onhistorymove: HistoryMoveHandler | null = null

  protected static dispatchHistoryMove( target:DrawingService, canUndo:boolean, canRedo:boolean ) {
    if( HistoryControl.onhistorymove === null ) { return }
    HistoryControl.onhistorymove( target, canUndo, canRedo )
  }

}

interface HistoryMoveHandler {
  ( target:DrawingService, canUndo:boolean, canRedo:boolean ): Promise<void> | void
}
