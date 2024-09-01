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
        const x: number = i - 1,
          y = j - 1
        const pixel = new Pixel<T>( x, y, this.display )
        this.place( i, j, pixel )
      }
    }
  }

}
