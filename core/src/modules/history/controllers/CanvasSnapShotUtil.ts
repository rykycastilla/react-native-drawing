import { HTMLCanvasElement } from '@utils/HTMLCanvasElement'
import { SnapShotUtil } from '../services'

export class CanvasSnapShotUtil implements SnapShotUtil {

  public readonly colorChanels = 4

  constructor(
    public readonly imageWidth: number,
    public readonly imageHeight: number,
  ) {}

  public async compactURL( base64:string ): Promise<string> {
    const image: HTMLImageElement = await CanvasSnapShotUtil.createImage( base64 )
    const canvas = HTMLCanvasElement( this.imageWidth, this.imageHeight )
    const context: CanvasRenderingContext2D = canvas.getContext( '2d' )!
    context.drawImage( image, 0, 0 )
    return canvas.toDataURL()
  }

  get referenceSize(): number {
    const size: number = this.imageWidth * this.imageHeight * this.colorChanels  // Size in bytes
    return size / 1024 / 1024
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
