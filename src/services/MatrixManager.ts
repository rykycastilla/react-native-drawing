export class MatrixManager {

  private readonly store = new Map<MatrixIndex,ActionCallback>()

  public suscribePixelAction( column:number, row:number, callback:ActionCallback ) {
    const index: MatrixIndex = `${ column };${ row }`
    this.store.set( index, callback )
  }

  public callPixel( column:number, row:number ) {
    const index: MatrixIndex = `${ column };${ row }`
    const callback: ActionCallback | undefined = this.store.get( index )
    if( callback !== undefined ) { callback() }
  }

  private static calcAxisPosition( axisValue:number, pixelSize:number ): number {
    return Math.ceil( axisValue / pixelSize )
  }

  public static calcPosition( x:number, y:number, pixelSize:number ): { column:number, row:number } {
    const column: number = MatrixManager.calcAxisPosition( x, pixelSize ),
      row: number = MatrixManager.calcAxisPosition( y, pixelSize )
    return { column, row }
  }

}

type MatrixIndex = `${ number };${ number }`
type ActionCallback = () => void
