import { DrawingScene } from '../../models'
import { EmptyDisplay } from './EmptyDisplay'
import { Shape } from '../shapes'
import { StrokesCreator } from './StrokesCreator'

/**
 * It has thet implementation of a canvas display abstraction that cached every action and render it
 * automatically when the next frame occurs
*/
export class SceneDisplay extends StrokesCreator implements DrawingScene {

  override shapeList: Shape[] = []
  override readonly context: CanvasRenderingContext2D

  constructor(
    protected readonly canvas: HTMLCanvasElement,
  ) {
    super()
    this.context = canvas.getContext( '2d' )!
    this.scene()
  }

  private render() {
    if( this.contextIsCaptured ) {
      this.cleanStrokes()  // Excluding previous strokes (simulating a 'new context')
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
    // Allowing rendering again after context capturing
    if( this.contextIsCaptured ) {
      this.releaseContext()
    }
  }

  private scene() {
    this.render()
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
