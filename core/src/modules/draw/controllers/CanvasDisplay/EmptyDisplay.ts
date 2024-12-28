import { ClearPath } from './ClearPath'
import { DrawingBoard } from '../../models'
import { DrawingStroke } from './DrawingStroke'

export class EmptyDisplay implements DrawingBoard {

  private readonly canvas: HTMLCanvasElement = document.createElement( 'canvas' )
  private readonly context: CanvasRenderingContext2D = this.canvas.getContext( '2d' )!

  public createClearPath(): ClearPath {
    return new ClearPath( 0, 0, { width:0 }, this.context )
  }

  public createStroke(): DrawingStroke {
    return new DrawingStroke( 0, 0, { color:'', width:0 }, this.context )
  }

}
