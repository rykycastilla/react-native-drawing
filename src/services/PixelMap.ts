import { Pixel } from './Pixel'

export class PixelMap {

  private readonly pixelIndex = new Map<PixelKey,Pixel>()

  public buildKey( column:number, row:number ): PixelKey {
    return `${ column };${ row }`
  }

  public place( column:number, row:number, pixel:Pixel ) {
    const key: PixelKey = this.buildKey( column, row )
    this.pixelIndex.set( key, pixel )
  }

  public find( column:number, row:number ): Pixel | undefined {
    const key: PixelKey = this.buildKey( column, row )
    return this.pixelIndex.get( key )
  }

}

type PixelKey = `${ number };${ number }`
