import { DrawingScene } from '@draw/models'
import { ColorFilter } from '../ColorFilter'
import { ColorableTool } from '../ColorableTool'
import { Tool } from './Tool'

export class Filler extends Tool implements ColorableTool {

  public onfinish: ( ( args:FillerData ) => void ) | null = null
  public onstarteachtask: ( ( args:FillerData ) => void ) | null = null
  #color: string

  constructor(
    color:string,
    private readonly fillerQueue: FillerQueue,
    private readonly filterColor: ColorFilter,
  ) {
    super()
    this.#color = this.filterColor( color )
    this.fillerQueue.onfinish = ( args:FillerArgs ) => this.handleFinish( args )
    this.fillerQueue.onstarteachtask = ( args:FillerArgs ) => this.handleStartEachTask( args )
  }

  private handleFinish( args:FillerArgs ) {
    if( this.onfinish === null ) { return }
    this.onfinish( args )
  }

  private handleStartEachTask( args:FillerArgs ) {
    if( this.onstarteachtask === null ) { return }
    this.onstarteachtask( args )
  }

  override async addStrokePoint( x:number, y:number, strokeId:symbol, scene:DrawingScene ) {
    strokeId
    const { color } = this
    this.fillerQueue.enqueueTask( { x, y, color, scene } )
  }

  /**
   * Stops the current filling task
  */
  override stopUsing() {
    this.fillerQueue.stopTasks()
  }

  public setColor( color:string ) {
    const filteredColor: string = this.filterColor( color )
    this.#color = filteredColor
  }

  get color(): string {
    return this.#color
  }

  get isWorking(): boolean {
    return this.fillerQueue.isConsuming
  }

}

interface FillerData {
  x: number
  y: number
  color: string
}

export interface FillerArgs extends FillerData {
  scene: DrawingScene
}

interface FillerQueue {
  isConsuming: boolean
  onfinish: ( ( args:FillerArgs ) => void ) | null
  onstarteachtask: ( ( args:FillerArgs ) => void ) | null
  enqueueTask( args:FillerArgs ): void
  stopTasks(): void
}
