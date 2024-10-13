import { Display } from '../Display'
import { MatrixBuilder } from './MatrixBuilder'

export class Matrix extends MatrixBuilder {
  constructor( resolution:number, display:Display ) {
    super( resolution, display )
    this.buildData()
  }
}
