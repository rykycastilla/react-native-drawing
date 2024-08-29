import { Display } from '../Display'
import { MatrixPositioner } from './MatrixPositioner'
import { Pixel } from '../Pixel'

export class MatrixBuilder<T extends string> extends MatrixPositioner<T> {

  constructor(
    top:number, left:number, size:number, resolution:number, grid:number,
    private readonly display: Display,
  ) {
    super( top, left, size, resolution, grid )
  }

  protected buildData() {
    for( let i = 1; i <= this.grid; i++ ) {
      for( let j = 1; j <= this.grid; j++ ) {
        const { x, y } = this.calcPosition( i, j )
        const pixel = new Pixel<T>( x, y, this.pixelSize, this.display )
        this.place( i, j, pixel )
      }
    }
  }

}
