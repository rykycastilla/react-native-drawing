import { DrawingService } from '../services'
import { IWebDraw } from '@shared/utils/types/IWebDraw'

// @ts-expect-error - JSDoc Type
import { HistoryOutOfBoundsError } from '@shared/modules/history/errors'  // eslint-disable-line

export class DrawController implements IWebDraw {

  public onhistorymove: ( ( canUndo:boolean, canRedo:boolean ) => void ) | null = null

  constructor(
    private readonly drawingServiceRef: DrawingServiceRef,
  ) { this.setHistoryMoveListener() }

  public async clear( color?:string ) {
    await this.drawingService.clear( color )
  }

  public async getImage(): Promise<string> {
    return this.drawingService.image
  }

  public async setImage( image:string ) {
    await this.drawingService.setImage( image )
  }

  private setHistoryMoveListener() {
    DrawingService.onhistorymove = ( target:DrawingService, canUndo:boolean, canRedo:boolean ) => {
      if( target !== this.drawingService ) { return }
      if( this.onhistorymove === null ) { return }
      this.onhistorymove( canUndo, canRedo )
    }
  }

  /**
   * @throws { HistoryOutOfBoundsError }
  */
  public async undo() {
    await this.drawingService.undo()
  }

  /**
   * @throws { HistoryOutOfBoundsError }
  */
  public async redo() {
    await this.drawingService.redo()
  }

  private get drawingService(): DrawingService {
    return this.drawingServiceRef.current
  }

}

interface DrawingServiceRef {
  current: DrawingService
}
