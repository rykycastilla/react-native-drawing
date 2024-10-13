import { Pixel } from '../Pixel'

export class PixelMap {

  private readonly pixelMatrix: Pixel[][] = []

  public place( column:number, row:number, pixel:Pixel ) {
    if( this.pixelMatrix[ column ] === undefined ) { this.pixelMatrix[ column ] = [] }
    this.pixelMatrix[ column ]![ row ] = pixel
  }

  public find( column:number, row:number ): Pixel | undefined {
    const pixelList: Pixel[] | undefined = this.pixelMatrix[ column ]
    if( pixelList === undefined ) { return undefined }
    return pixelList[ row ]
  }

}
