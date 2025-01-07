import { BinImage } from '../../models'
import { ClearPath } from './ClearPath'
import { DrawingBoard } from '../../models'
import { DrawingStroke } from './DrawingStroke'

export class EmptyDisplay implements DrawingBoard {

  private readonly canvas: HTMLCanvasElement = document.createElement( 'canvas' )
  private readonly context: CanvasRenderingContext2D = this.canvas.getContext( '2d' )!

  public createDot() {}

  public createClearPath(): ClearPath {
    return new ClearPath( 0, 0, { width:0 }, this.context )
  }

  public createStroke(): DrawingStroke {
    return new DrawingStroke( 0, 0, { color:'', width:0 }, this.context )
  }

  public getBinaryData(): BinImage {
    const pixelList = new Uint8ClampedArray()
    return { width:0, height:0, pixelList, colorChanels:0, maxChanel:0 }
  }

  get width(): number {
    return 0
  }

  get height(): number {
    return 0
  }

  public setBinaryData() {}

}
