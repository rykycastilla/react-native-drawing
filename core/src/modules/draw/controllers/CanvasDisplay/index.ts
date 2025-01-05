import { DrawingBoard } from '../../models'
import { EmptyDisplay } from './EmptyDisplay'
import { StrokesCreator } from './StrokesCreator'

// cnavasdisplay: renderizador y creador de nulo
// el creador de trazos
// creador de puntos
// el reemplazador de imagene sbinarias

export class CanvasDisplay extends StrokesCreator implements DrawingBoard {

  override readonly context: CanvasRenderingContext2D

  constructor(
    protected readonly canvas: HTMLCanvasElement,
  ) {
    super()
    this.context = canvas.getContext( '2d' )!
    this.scene()
  }

  private render() {
    const binaryRendered: boolean = this.renderImage()
    if( binaryRendered ) {
      this.cleanStrokes()
      return
    }
    this.renderStrokes()
    this.renderShapes()
  }

  private scene() {
    this.render()
    requestAnimationFrame( () => this.scene() )
  }

  public static createEmpty(): EmptyDisplay {
    return new EmptyDisplay()
  }

}
