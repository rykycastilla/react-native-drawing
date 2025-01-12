import { DrawingService } from '../services'
import { IDraw } from '@shared/utils/types/IDraw'

export class DrawController implements IDraw {

  constructor(
    private readonly drawingServiceRef: DrawingServiceRef,
  ) {}

  public async getImage(): Promise<string> {
    return this.drawingService.image
  }

  public async setImage( image:string ): Promise<void> {
    this.drawingService.setImage( image )
  }

  private get drawingService(): DrawingService {
    return this.drawingServiceRef.current
  }

}

interface DrawingServiceRef {
  current: DrawingService
}
