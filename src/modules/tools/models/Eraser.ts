import { IResizableTool, ResizableTool } from './ResizableTool'
import { Matrix, Pixel } from '../../draw/models'
import { Tool } from './Tool'

export class Eraser<T extends string> implements Tool<T>, IResizableTool {

  private readonly resizableBoard: ResizableTool

  constructor( size:number ) {
    this.resizableBoard = new ResizableTool( size )
  }

  public use( column:number, row:number, matrix:Matrix<T> ) {
    this.resizableBoard.use( column, row, ( column:number, row:number ) => {
      const pixel: Pixel<T> | undefined = matrix.find( column, row )
      if( pixel === undefined ) { return }
      pixel.clear()
    } )
  }

  public clone(): Eraser<T> {
    return new Eraser( this.size )
  }

  public setSize( size:number ) {
    this.resizableBoard.setSize( size )
  }

  get size(): number {
    return this.resizableBoard.size
  }

}
