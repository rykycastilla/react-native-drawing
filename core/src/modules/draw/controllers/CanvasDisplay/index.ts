import { DrawingBoard } from '../../models'
import { EmptyDisplay } from './EmptyDisplay'
import { Shape } from '../shapes'
import { StrokesCreator } from './StrokesCreator'

export class CanvasDisplay extends StrokesCreator implements DrawingBoard {

  override shapeList: Shape[] = []
  override readonly context: CanvasRenderingContext2D

  constructor(
    protected readonly canvas: HTMLCanvasElement,
  ) {
    super()
    this.context = canvas.getContext( '2d' )!
    this.scene()
  }

  private async render() {
    // Rendering only base64
    const baseRendered: boolean = await this.renderBase()
    if( baseRendered ) {
      this.cleanStrokes()
      return
    }
    // Rendering only binary changes
    const binaryRendered: boolean = this.renderImage()
    if( binaryRendered ) {
      this.cleanStrokes()
      return
    }
    // Rendering normal flow
    this.renderStrokes()
    this.renderShapes()
  }

  private async scene() {
    await this.render()
    requestAnimationFrame( () => this.scene() )
  }

  get width(): number {
    return this.canvas.width
  }

  get height(): number {
    return this.canvas.height
  }

  public static createEmpty(): EmptyDisplay {
    return new EmptyDisplay()
  }

}
