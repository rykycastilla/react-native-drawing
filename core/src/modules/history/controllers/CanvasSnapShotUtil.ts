import { HTMLCanvasElement } from '@utils/HTMLCanvasElement'
import { SnapShotUtil } from '../services'

export class CanvasSnapShotUtil implements SnapShotUtil {

  public readonly colorChanels = 4

  constructor(
    public readonly imageWidth: number,
    public readonly imageHeight: number,
  ) {}

  public async compactURL( base64:string ): Promise<string> {
    const { imageWidth, imageHeight } = this
    // Creating canvas
    const canvas: HTMLCanvasElement = await CanvasSnapShotUtil.createCanvas(
      base64, imageWidth, imageHeight,
    )
    // Extracting compact canvas data
    const pictureFile: Blob = await CanvasSnapShotUtil.createFile( canvas )
    return URL.createObjectURL( pictureFile )
  }

  public async compare( urlA:string, urlB:string ): Promise<boolean> {
    const { imageWidth, imageHeight } = this
    // Creating Canvas
    const canvasA: HTMLCanvasElement = await CanvasSnapShotUtil.createCanvas(
      urlA, imageWidth, imageHeight,
    )
    const canvasB: HTMLCanvasElement = await CanvasSnapShotUtil.createCanvas(
      urlB, imageWidth, imageHeight,
    )
    // Extracting base64 data
    const base64A: string = canvasA.toDataURL()
    const base64B: string = canvasB.toDataURL()
    // Comparing
    return base64A === base64B
  }

  get referenceSize(): number {
    const size: number = this.imageWidth * this.imageHeight * this.colorChanels  // Size in bytes
    return size / 1024 / 1024
  }

  private static async createCanvas( url:string, width:number, height:number ): Promise<HTMLCanvasElement> {
    const image: HTMLImageElement = await CanvasSnapShotUtil.createImage( url )
    const canvas = HTMLCanvasElement( width, height )
    const context: CanvasRenderingContext2D = canvas.getContext( '2d' )!
    context.drawImage( image, 0, 0 )
    return canvas
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

  private static createFile( canvas:HTMLCanvasElement ): Promise<Blob> {
    return new Promise<Blob>( ( resolve ) => {
      canvas.toBlob( ( file ) => resolve( file! ) )
    } )
  }

}
