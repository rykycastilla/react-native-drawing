import { DrawingScene } from '@draw/models'
import { ColorFilter } from '../ColorFilter'
import { ColorableTool } from '../ColorableTool'
import { Tool } from './Tool'

export class Filler extends Tool implements ColorableTool {

  public onfinish: ( () => void ) | null = null
  public onstarteachtask: ( () => void ) | null = null
  #color: string

  constructor(
    color:string,
    private readonly fillerQueue: FillerQueue,
    private readonly filterColor: ColorFilter,
  ) {
    super()
    this.#color = this.filterColor( color )
    this.fillerQueue.onfinish = () => this.handleFinish()
    this.fillerQueue.onstarteachtask = () => this.handleStartEachTask()
  }

  private handleFinish() {
    if( this.onfinish === null ) { return }
    this.onfinish()
  }

  private handleStartEachTask() {
    if( this.onstarteachtask === null ) { return }
    this.onstarteachtask()
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

export interface FillerArgs {
  x: number
  y: number
  color: string
  scene: DrawingScene
}

interface FillerQueue {
  isConsuming: boolean
  onfinish: ( () => void ) | null
  onstarteachtask: ( () => void ) | null
  enqueueTask( args:FillerArgs ): void
  stopTasks(): void
}
