import { DrawingScene } from '../../models'
import { EmptyDisplay } from './EmptyDisplay'
import { FpsManager, FrameReportFunction } from '../../services'
import { Shape } from '../shapes'
import { StrokesCreator } from './StrokesCreator'

/**
 * It has thet implementation of a canvas display abstraction that cached every action and render it
 * automatically when the next frame occurs
*/
export class SceneDisplay extends StrokesCreator implements DrawingScene {

  private readonly fpsManager = new FpsManager( 500, () => performance.now() )
  override shapeList: Shape[] = []
  override readonly context: CanvasRenderingContext2D
  private nextFrameResolverList: ( () => void )[] = []

  constructor(
    protected readonly canvas: HTMLCanvasElement,
  ) {
    super()
    this.context = canvas.getContext( '2d' )!
    this.scene()
  }

  private resolveNextFrame() {
    for( const resolve of this.nextFrameResolverList ) {
      resolve()
    }
    this.nextFrameResolverList = []
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
    this.resolveNextFrame()
    this.fpsManager.notifyFrame()
    requestAnimationFrame( () => this.scene() )
  }

  public waitNextFrame(): Promise<void> {
    let resolveNextFrame!: () => void
    const nextFrameExecuted = new Promise<void>( ( resolve ) => resolveNextFrame = resolve )
    this.nextFrameResolverList.push( resolveNextFrame )
    return nextFrameExecuted
  }

  get width(): number {
    return this.canvas.width
  }

  get height(): number {
    return this.canvas.height
  }

  get onframereport(): FrameReportFunction | null {
    return this.fpsManager.onreport
  }

  set onframereport( onframereport:FrameReportFunction|null ) {
    this.fpsManager.onreport = onframereport
  }

  public static createEmpty(): EmptyDisplay {
    return new EmptyDisplay()
  }

}
