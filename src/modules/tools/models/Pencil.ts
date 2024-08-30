import { ColorableTool, IColorableTool } from './ColorableTool'
import { Matrix, Pixel } from '../../draw/models'
import { Tool } from './Tool'

export class Pencil<T extends string> implements Tool<T>, IColorableTool<T> {

  private readonly colorBoard: IColorableTool<T>

  constructor( color:T ) {
    this.colorBoard = new ColorableTool( color )
  }

  public use( column:number, row:number, matrix:Matrix<T> ) {
    const pixel: Pixel<T> | undefined = matrix.find( column, row )
    if( pixel === undefined ) { return }
    pixel.setColor( this.color )
  }

  public clone(): Pencil<T> {
    return new Pencil( this.color )
  }

  public setColor( color:T ) {
    this.colorBoard.setColor( color )
  }

  get color(): T {
    return this.colorBoard.color
  }

}
