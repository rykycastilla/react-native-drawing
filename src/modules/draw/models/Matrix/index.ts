import { Display } from '../Display'
import { MatrixBuilder } from './MatrixBuilder'

export class Matrix extends MatrixBuilder {
  constructor( top:number, left:number, size:number, resolution:number, grid:number, display:Display ) {
    super( top, left, size, resolution, grid, display )
    this.buildData()
  }
}
