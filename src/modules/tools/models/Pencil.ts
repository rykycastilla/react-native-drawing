import { ColorableTool, IColorableTool } from './ColorableTool'
import { IResizableTool, ResizableTool } from './ResizableTool'
import { Matrix, Pixel } from '../../draw/models'
import { Tool } from './Tool'

export class Pencil<T extends string> implements Tool<T>, IColorableTool<T>, IResizableTool {

  private readonly colorBoard: ColorableTool<T>
  private readonly resizableBoard: ResizableTool

  constructor( color:T, size = 1 ) {
    this.colorBoard = new ColorableTool( color )
    this.resizableBoard = new ResizableTool( size )
  }

  public use( column:number, row:number, matrix:Matrix<T> ) {
    this.resizableBoard.use( column, row, ( column:number, row:number ) => {
      const pixel: Pixel<T> | undefined = matrix.find( column, row )
      if( pixel === undefined ) { return }
      pixel.setColor( this.color )
    } )
  }

  public clone(): Pencil<T> {
    return new Pencil( this.color, this.size )
  }

  public setColor( color:T ) {
    this.colorBoard.setColor( color )
  }

  public setSize( size:number ) {
    this.resizableBoard.setSize( size )
  }

  get color(): T {
    return this.colorBoard.color
  }

  get size(): number {
    return this.resizableBoard.size
  }

}
