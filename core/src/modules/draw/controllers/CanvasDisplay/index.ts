import { ClearPath } from './ClearPath'
import { ClearPathProps, DrawingBoard, StrokeProps } from '../../models'
import { DrawingStroke } from './DrawingStroke'
import { StrokeManager } from './StrokeManager'

export class CanvasDisplay implements DrawingBoard {

  private context: CanvasRenderingContext2D | null = null
  private readonly strokeManager = new StrokeManager<DrawingStroke>( DrawingStroke )
  private readonly clearPathManager = new StrokeManager<ClearPath>( ClearPath )

  constructor() {
    this.scene()
  }

  private render() {
    if( this.context === null ) { return }
    for( const strokeKey of this.strokeManager.keyList ) {
      const stroke: DrawingStroke = this.strokeManager.getStroke( strokeKey )!
      stroke.render()
    }
    for( const clearPathKey of this.clearPathManager.keyList ) {
      const path: ClearPath = this.clearPathManager.getStroke( clearPathKey )!
      path.render()
    }
  }

  private scene() {
    this.render()
    requestAnimationFrame( () => this.scene() )
  }

  public createStroke( x:number, y:number, props:StrokeProps ): DrawingStroke | null {
    if( this.context === null ) { return null }
    const stroke: DrawingStroke = this.strokeManager.genStroke( x, y, props, this.context )
    return stroke
  }

  public createClearPath( x:number, y:number, props:ClearPathProps ): ClearPath | null {
    if( this.context === null ) { return null }
    const path: ClearPath = this.clearPathManager.genStroke( x, y, props, this.context )
    return path
  }

  public setContext( context:CanvasRenderingContext2D ) {
    this.context = context
  }

}
