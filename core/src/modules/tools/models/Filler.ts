import { BinImage } from '@draw/models'
import { DrawingBoard } from '@draw/models'
import { ColorableTool } from './ColorableTool'
import { FillerUtilClass } from './FillerUtilClass'

export class Filler implements ColorableTool {

  private working = false
  #color: string

  constructor(
    color:string,
    private readonly FillerUtil: FillerUtilClass,
  ) {
    this.#color = color
  }

  private async work( x:number, y:number, board:DrawingBoard ) {
    const { width, height, pixelList } = board.getBinaryData()
    const util = new this.FillerUtil( width, height )
    util.onFrame( ( image:BinImage ) => board.setBinaryData( image ) )
    await util.fill( x, y, this.color, pixelList )
  }

  public addStrokePoint( x:number, y:number, strokeId:symbol, board:DrawingBoard ) {
    strokeId
    if( this.working ) { return }
    this.working = true
    const task: Promise<void> = this.work( x, y, board )
    task.then( () => this.working = false )
    task.catch( () => this.working = false )
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
