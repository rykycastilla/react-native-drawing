import { ClearPath } from './ClearPath'
import { ClearPathProps, DrawingBoard, StrokeProps } from '../../models'
import { DrawingStroke } from './DrawingStroke'
import { EmptyDisplay } from './EmptyDisplay'
import { StrokeManager } from './StrokeManager'

export class CanvasDisplay implements DrawingBoard {

  private readonly context: CanvasRenderingContext2D
  private readonly strokeManager = new StrokeManager<DrawingStroke>( DrawingStroke )
  private readonly clearPathManager = new StrokeManager<ClearPath>( ClearPath )

  constructor( canvas:HTMLCanvasElement ) {
    this.context = canvas.getContext( '2d' )!
    this.scene()
  }

  private scene() {
    for( const strokeKey of this.strokeManager.keyList ) {
      const stroke: DrawingStroke = this.strokeManager.getStroke( strokeKey )!
      stroke.render()
    }
    for( const clearPathKey of this.clearPathManager.keyList ) {
      const path: ClearPath = this.clearPathManager.getStroke( clearPathKey )!
      path.render()
    }
    requestAnimationFrame( () => this.scene() )
  }

  public createStroke( x:number, y:number, props:StrokeProps ): DrawingStroke {
    const stroke: DrawingStroke = this.strokeManager.genStroke( x, y, props, this.context )
    return stroke
  }

  public createClearPath( x:number, y:number, props:ClearPathProps ): ClearPath {
    const path: ClearPath = this.clearPathManager.genStroke( x, y, props, this.context )
    return path
  }

  public static createEmpty(): EmptyDisplay {
    return new EmptyDisplay()
  }

}
