import { IResizableTool, ResizableTool } from './ResizableTool'
import { Matrix, Pixel } from '../../draw/models'
import { Tool } from './Tool'

export class Eraser implements Tool, IResizableTool {

  private readonly resizableBoard: ResizableTool

  constructor( size:number ) {
    this.resizableBoard = new ResizableTool( size )
  }

  public use( column:number, row:number, matrix:Matrix ) {
    this.resizableBoard.use( column, row, ( column:number, row:number ) => {
      const pixel: Pixel | undefined = matrix.find( column, row )
      if( pixel === undefined ) { return }
      pixel.clear()
    } )
  }

  public clone(): Eraser {
    return new Eraser( this.size )
  }

  public setSize( size:number ) {
    this.resizableBoard.setSize( size )
  }

  get size(): number {
    return this.resizableBoard.size
  }

}
