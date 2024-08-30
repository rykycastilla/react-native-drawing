import { Display } from '../../../display/models/Display'
import { MatrixBuilder } from './MatrixBuilder'

export class Matrix<T extends string> extends MatrixBuilder<T> {
  constructor( top:number, left:number, size:number, resolution:number, grid:number, display:Display ) {
    super( top, left, size, resolution, grid, display )
    this.buildData()
  }
}
