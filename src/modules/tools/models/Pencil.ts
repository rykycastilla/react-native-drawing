import { Matrix, Pixel } from '../../draw/models'
import { Tool } from './Tool'

export class Pencil<T extends string> implements Tool<T> {

  constructor(
    private color: T,
  ) {}

  public use( column:number, row:number, matrix:Matrix<T> ) {
    const pixel: Pixel<T> | undefined = matrix.find( column, row )
    if( pixel === undefined ) { return }
    pixel.setColor( this.color )
  }

  public clone(): Pencil<T> {
    return new Pencil( this.color )
  }

  public setColor( color:T ) {
    this.color = color
  }

}
