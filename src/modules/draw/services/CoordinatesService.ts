import { Matrix } from '../models'

export class CoordinatesService {

  constructor(
    private readonly matrix: Matrix,
  ) {}

  private fixInMatrixPosition( touchAxis:number, matrixAxis:number ): number {
    const inMatrixAxis: number = touchAxis - matrixAxis
    return ( inMatrixAxis < 0 ) ? 0 : inMatrixAxis
  }

  private toMatrixScale( num:number ): number {
    const { size, resolution } = this.matrix
    return Math.round( num / size * resolution )
  }

  public findCell( x:number, y:number ): Cell {
    const { top, left } = this.matrix
    const fromMatrixX: number = this.fixInMatrixPosition( x, left ),
      fromMatrixY = this.fixInMatrixPosition( y, top ),
      inMatrixX = this.toMatrixScale( fromMatrixX ),
      inMatrixY = this.toMatrixScale( fromMatrixY )
    return this.matrix.calcCell( inMatrixX, inMatrixY )
  }

}

interface Cell {
  column: number
  row: number
}
