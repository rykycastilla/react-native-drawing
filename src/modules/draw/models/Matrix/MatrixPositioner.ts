import { PixelMap } from './PixelMap'

export class MatrixPositioner<T extends string> extends PixelMap<T> {

  public readonly pixelSize: number

  constructor(
    public readonly top: number,
    public readonly left: number,
    public readonly size: number,
    public readonly resolution: number,
    public readonly grid: number,
  ) {
    super()
    this.pixelSize = Math.round( resolution / grid )
  }

  private calcAxisCell( axis:number ): number {
    return Math.ceil( axis / this.pixelSize )
  }

  private calcAxisPosition( cell:number ): number {
    return ( cell - 1 ) * this.pixelSize
  }

  public calcCell( x:number, y:number ): CalcCellResult {
    const column: number = this.calcAxisCell( x ),
      row = this.calcAxisCell( y )
    return { column, row }
  }

  public calcPosition( column:number, row:number ): CalcPositionResult {
    const x: number = this.calcAxisPosition( column ),
      y = this.calcAxisPosition( row )
    return { x, y }
  }

}

interface CalcCellResult {
  column: number
  row: number
}

interface CalcPositionResult {
  x: number
  y: number
}
