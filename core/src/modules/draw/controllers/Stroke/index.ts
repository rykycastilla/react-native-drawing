import { Point, Stroke as IStroke } from '../../models'
import { Renderable } from './Renderable'
import { SectionManager } from './SectionManager'
import { StopService } from './StopService'

export abstract class Stroke<T extends object> extends Renderable<T> implements IStroke<T> {

  private pointsAmount = 0
  private readonly stopService: StopService

  constructor( x:number, y:number, initProps:T, context:CanvasRenderingContext2D ) {
    const initPoint = new Point( x, y )
    const sectionManager = new SectionManager<T>( initPoint, { ...initProps } )
    super( sectionManager, context )
    this.stopService = new StopService( () => this.getAutoStopState() )
  }

  /**
   * @method
   * @returns { boolean }
  */
  private getAutoStopState = ( () => {
    let savedPointsAmount: number = this.pointsAmount
    return (): boolean => {
      const result: boolean = savedPointsAmount === this.pointsAmount
      savedPointsAmount = this.pointsAmount  // Saving latest execution state to compare next time
      return result
    }
  } )()

  public addPoint( x:number, y:number ) {
    const point = new Point( x, y )
    this.pointsAmount++
    this.sectionManager.joinPoint( point )
  }

  public createSection( props:T ) {
    this.sectionManager.createSection( { ...props } )
  }

  public onStop( handle:( () => void ) ) {
    this.stopService.onStop( handle )
  }

  public stop() {
    this.stopService.stop()
  }

  get currentProps(): T {
    return this.sectionManager.currentProps
  }

}
