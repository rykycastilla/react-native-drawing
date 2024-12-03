import { ColorableTool, IColorableTool } from './ColorableTool'
import { Display } from '@draw/models'
import { IResizableTool, ResizableTool } from './ResizableTool'
import { Matrix } from '@draw/models'
import { Tool } from './Tool'

export class Pencil implements Tool, IColorableTool, IResizableTool {

  private readonly colorBoard: ColorableTool
  private readonly resizableBoard: ResizableTool

  constructor( color:string, size:number ) {
    this.colorBoard = new ColorableTool( color )
    this.resizableBoard = new ResizableTool( size )
  }

  public use( column:number, row:number, matrix:Matrix, display:Display ) {
    this.resizableBoard.use(
      column, row, this.color, matrix,
      ( x:number, y:number, size:number, color:string ) => display.print( x, y, size, size, color ),
    )
  }

  public clone(): Pencil {
    return new Pencil( this.color, this.size )
  }

  public setColor( color:string ) {
    this.colorBoard.setColor( color )
  }

  public setSize( size:number ) {
    this.resizableBoard.setSize( size )
  }

  get color(): string {
    return this.colorBoard.color
  }

  get size(): number {
    return this.resizableBoard.size
  }

}
