import { DrawingService } from '../services'
import { IWebDraw } from '@shared/utils/types/IWebDraw'

// @ts-expect-error - JSDoc Type
import { HistoryOutOfBoundsError } from '@shared/modules/history/errors'  // eslint-disable-line

export class DrawController implements IWebDraw {

  constructor(
    private readonly drawingServiceRef: DrawingServiceRef,
  ) {}

  public async clear( color?:string ) {
    await this.drawingService.clear( color )
  }

  public async getImage(): Promise<string> {
    return this.drawingService.image
  }

  public async setImage( image:string ) {
    await this.drawingService.setImage( image )
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
