export class ResizableTool {

  #size: number

  constructor( size:number ) {
    this.#size = size
  }

  public use( column:number, row:number, callback:CellCallback ) {
    const quadrantSize: number = Math.floor( this.size / 2 ),
      firstColumn = column - quadrantSize,
      firstRow = row - quadrantSize
    for( let i = firstColumn; i <= ( firstColumn + this.size - 1 ); i++ ) {
      for( let j = firstRow; j <= ( firstRow + this.size - 1 ); j++ ) {
        callback( i, j )
      }
    }
  }

  public setSize( size:number ) {
    this.size = size
  }

  get size(): number {
    return this.#size
  }

  private set size( newSize:number ) {
    this.#size = newSize
  }

}

interface CellCallback {
  ( column:number, row:number ): void
}

export interface IResizableTool {
  readonly size: number
  setSize( size:number ): void
}
