export class ResizableTool {

  #size: number

  constructor( size:number ) {
    this.#size = size
  }

  public use<T>( column:number, row:number, state:T, matrix:Matrix<T>, callback:RenderCallback<T> ) {
    const quadrantSize: number = Math.floor( this.size / 2 ),
      firstColumn = column - quadrantSize,
      firstRow = row - quadrantSize
    for( let i = firstColumn; i <= ( firstColumn + this.size - 1 ); i++ ) {
      for( let j = firstRow; j <= ( firstRow + this.size - 1 ); j++ ) {
        const pixel: Pixel<T> | undefined = matrix.find( i, j )
        if( pixel === undefined ) { continue }
        pixel.setStateWithoutRendering( state )
      }
    }
    callback( firstColumn, firstRow, this.size, state )
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

interface Pixel<T> {
  setStateWithoutRendering( state:T ): void
}

interface Matrix<T> {
  find( column:number, row:number ): Pixel<T> | undefined
}

interface RenderCallback<T> {
  ( startColumn:number, startRow:number, size:number, state:T ): void
}

export interface IResizableTool {
  readonly size: number
  setSize( size:number ): void
}
