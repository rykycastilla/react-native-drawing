import { BinaryDisplay } from './BinaryDisplay'
import { ContextCapturer } from '../ContextCapturer'

/**
 * This object can get and set base64 information of a canvas with 'scene strategy'
*/
export abstract class Base64Display extends BinaryDisplay {

  protected abstract context: CanvasRenderingContext2D
  private readonly contextCapturer: ContextCapturer

  constructor() {
    super()
    this.contextCapturer = new ContextCapturer(
      () => this.context,
      ( context:CanvasRenderingContext2D ) => this.context = context )
  }

  protected releaseContext() {
    this.contextCapturer.releaseContext()
  }

  get image(): string {
    return this.canvas.toDataURL()
  }

  /**
   * Set a new base64 image to the display, stopping all the renderable processes.
   * @returns - A promise that indicates the next frame occurs.
   * The display only can render data after next frame from the base64 set action
  */
  public async setImage( base64:string ) {
    // Erasing previous display content
    const { width, height } = this.canvas
    this.context.clearRect( 0, 0, width, height )
    // Rendering new content
    const image: HTMLImageElement = await Base64Display.createImage( base64 )
    this.context.drawImage( image, 0, 0 )
    await this.contextCapturer.caputreContext()
  }

  protected get contextIsCaptured(): boolean {
    return this.contextCapturer.contextIsCaptured
  }

  /**
   * Creates an image element with the base64 source
   * @returns - A promise with the loaded image
  */
  private static createImage( base64:string ): Promise<HTMLImageElement> {
    return new Promise<HTMLImageElement>( ( resolve ) => {
      const image = new Image()
      // Loading source
      image.onload = () => resolve( image )
      image.src = base64
    } )
  }

}
