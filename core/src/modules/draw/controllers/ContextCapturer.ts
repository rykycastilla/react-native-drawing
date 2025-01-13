import { HTMLCanvasElement } from './HTMLCanvasElement'
import { Resolver } from '@utils/Resolver'

/**
  * It can 'capture' the main rendering context after every set,
  * avoiding new frames until the 'next scene' (frame) has ocurred.
  * The release only should be done after the next captured frame (allowing new scenes again).
  * This is because a base64 content has the highest priority and must stop every rendering action
*/
export class ContextCapturer {

  private realContext: CanvasRenderingContext2D | null = null
  private readonly fakeContext: CanvasRenderingContext2D
  private released: Resolver<void> | null = null

  constructor(
    private readonly getContext: ContextGetter,
    private readonly setContext: ContextSetter,
  ) {
    // Creating fakeContext
    const fakeCanvas = HTMLCanvasElement( 0, 0 )
    this.fakeContext = fakeCanvas.getContext( '2d' )!
  }

  /**
   * Capturing real context, avoiding it would be used to render unwanted frames
   * @retruns - A release promise
  */
  public caputreContext(): Promise<void> {
    if( this.released instanceof Resolver ) {  // No released yet from the previous capturing (doesn't need another capture)
      return this.released.promise
    }
    // Saving real context
    if( this.realContext === null ) { this.realContext = this.getContext() }
    // Replacing current context using fake
    this.setContext( this.fakeContext )
    // Promising release
    this.released = new Resolver<void>()
    return this.released.promise
  }

  /**
   * Release the real context allowing its use by the display.
   * This method only should be used after every display frame ending (with the context caputred)
  */
  public releaseContext() {
    if( this.realContext === null ) { return }
    this.setContext( this.realContext )
    this.released?.resolve()
    this.released = null
  }

  get contextIsCaptured(): boolean {
    if( this.realContext === null ) { return false }
    return this.getContext() === this.fakeContext
  }

}

interface ContextGetter {
  (): CanvasRenderingContext2D
}

interface ContextSetter {
  ( context:CanvasRenderingContext2D ): void
}
