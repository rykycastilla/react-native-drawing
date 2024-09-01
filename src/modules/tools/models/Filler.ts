import { ColorableTool, IColorableTool } from './ColorableTool'
import { Matrix/* , Pixel */ } from '../../draw/models'
import { Tool } from './Tool'

export class Filler implements Tool, IColorableTool {

  private readonly colorBoard: ColorableTool

  constructor( color:string ) {
    this.colorBoard = new ColorableTool( color )
  }

  // eslint-disable-next-line
  public use( column:number, row:number, matrix:Matrix ) {
    console.log( 'this function is unavailable by the moment' )
  }

  public clone(): Filler {
    return new Filler( this.color )
  }

  public setColor( color:string ) {
    this.colorBoard.setColor( color )
  }

  get color(): string {
    return this.colorBoard.color
  }

}
