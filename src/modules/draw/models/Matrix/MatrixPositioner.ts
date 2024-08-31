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

  public calcCell( x:number, y:number ): CalcCellResult {
    const column: number = this.calcAxisCell( x ),
      row = this.calcAxisCell( y )
    return { column, row }
  }

}

interface CalcCellResult {
  column: number
  row: number
}
