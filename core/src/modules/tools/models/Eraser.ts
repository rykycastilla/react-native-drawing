import { Display } from '@draw/models'
import { IResizableTool, ResizableTool } from './ResizableTool'
import { Matrix } from '@draw/models'
import { Tool } from './Tool'

export class Eraser implements Tool, IResizableTool {

  private readonly resizableBoard: ResizableTool

  constructor( size:number ) {
    this.resizableBoard = new ResizableTool( size )
  }

  public use( column:number, row:number, matrix:Matrix, display:Display ) {
    this.resizableBoard.use(
      column, row, null, matrix,
      ( x:number, y:number, size:number ) => display.clear( x, y, size, size ),
    )
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
