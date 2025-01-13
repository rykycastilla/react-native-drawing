import { BinImage } from '../../models'

export abstract class BinaryDisplay {

  protected abstract readonly canvas: HTMLCanvasElement
  protected abstract readonly context: CanvasRenderingContext2D
  private cachedImage: BinImage | null = null

  /**
   * @returns { boolean } - If the image was rendered (changes detected)
  */
  protected renderImage(): boolean {
    if( this.cachedImage === null ) { return false }
    const { width, height, pixelList } = this.cachedImage
    const imageData = new ImageData( pixelList, width, height )
    this.context.putImageData( imageData, 0, 0 )
    this.cachedImage = null  // Setting to null again to detect changes
    return true
  }

  public getBinaryData(): BinImage {
    const { width, height } = this.canvas
    const { data:pixelList } = this.context.getImageData( 0, 0, width, height )
    return { width, height, pixelList, colorChanels:4, maxChanel:255 }
  }

  public setBinaryData( image:BinImage ) {
    this.cachedImage = image
  }

}
