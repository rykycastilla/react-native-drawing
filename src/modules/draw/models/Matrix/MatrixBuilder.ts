import { Display } from '../Display'
import { Pixel } from '../Pixel'
import { PixelMap } from './PixelMap'

export class MatrixBuilder extends PixelMap {

  constructor(
    public readonly resolution: number,
    private readonly display: Display,
  ) {
    super()
  }

  protected buildData() {
    for( let x = 0; x < this.resolution; x++ ) {
      for( let y = 0; y < this.resolution; y++ ) {
        const pixel = new Pixel( x, y, this.display )
        this.place( x, y, pixel )
      }
    }
  }

}
