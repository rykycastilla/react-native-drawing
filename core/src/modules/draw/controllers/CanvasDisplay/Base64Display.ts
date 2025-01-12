import { BinaryDisplay } from './BinaryDisplay'

export abstract class Base64Display extends BinaryDisplay {

  private cachedBase: string | null = null

  /**
   * @returns { boolean } - If the image was rendered (changes detected)
  */
  protected async renderBase(): Promise<boolean> {
    if( this.cachedBase === null ) { return false }
    // Erasing previous display content
    const { width, height } = this.canvas
    this.context.clearRect( 0, 0, width, height )
    // Rendering new content
    const image: HTMLImageElement = await Base64Display.createImage( this.cachedBase )
    this.context.drawImage( image, 0, 0 )
    this.cachedBase = null
    return true
  }

  get image(): string {
    return this.canvas.toDataURL()
  }

  public setImage( image:string ) {
    this.cachedBase = image
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
