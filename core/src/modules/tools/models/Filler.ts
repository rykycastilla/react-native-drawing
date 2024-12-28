import { DrawingBoard } from '@draw/models'
import { ColorableTool } from './ColorableTool'
import { Filler as FillerUtil } from '@utils/Filler'

import { BinImage } from '@draw/models'

export class Filler implements ColorableTool {

  #color: string

  constructor( color:string ) {
    this.#color = color
  }

  public addStrokePoint( x:number, y:number, strokeId:symbol, board:DrawingBoard ) {
    strokeId
    const { width, height, pixelList } = board.getBinaryData()
    const util = new FillerUtil( width, height )
    util.onFrame( ( image:BinImage ) => board.setBinaryData( image ) )
    util.fill( x, y, this.color, pixelList )
  }

  public endShapeStroke() {}

  public stopUsing() {}

  public setColor( color:string ) {
    this.#color = color
  }

  get color(): string {
    return this.#color
  }

}
