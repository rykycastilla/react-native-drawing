import { BinImage, DrawingBoard } from '@draw/models'
import { ColorFilter } from '../ColorFilter'
import { ColorableTool } from '../ColorableTool'
import { FillerUtil, FillerUtilClass } from '../FillerUtilClass'
import { Tool } from './Tool'

export class Filler extends Tool implements ColorableTool {

  private currentUtil: FillerUtil | null = null
  private filling: Promise<void> | null = null
  #color: string

  constructor(
    color:string,
    private readonly FillerUtil: FillerUtilClass,
    private readonly filterColor: ColorFilter,
  ) {
    super()
    this.#color = this.filterColor( color )
  }

  private work( x:number, y:number, board:DrawingBoard ): Promise<void> {
    const { width, height, pixelList } = board.getBinaryData()
    const util = new this.FillerUtil( width, height )
    this.currentUtil = util
    util.onFrame( ( image:BinImage ) => board.setBinaryData( image ) )
    return util.fill( x, y, this.color, pixelList )
  }

  override addStrokePoint( x:number, y:number, strokeId:symbol, board:DrawingBoard ) {
    strokeId
    // Filtering if it is filling right now
    if( this.filling !== null ) { return }
    const task: Promise<void> = this.work( x, y, board )
    // Remember to forget the state when the task is terminated
    task.then( () => this.filling = null )
    task.catch( () => this.filling = null )
    this.filling = task  // Saving current task state
  }

  /**
   * Stops the current filling task
  */
  override stopUsing() {
    if( ( this.currentUtil === null ) || ( this.filling === null ) ) { return }
    this.currentUtil.stop( this.filling )
  }

  public setColor( color:string ) {
    const filteredColor: string = this.filterColor( color )
    this.#color = filteredColor
  }

  get color(): string {
    return this.#color
  }

}
