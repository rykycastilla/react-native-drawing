import { ClearPath } from './ClearPath'
import { ClearPathProps, StrokeProps } from '../../models'
import { DotsCreator } from './DotsCreator'
import { DrawingStroke } from './DrawingStroke'
import { StrokeManager } from './StrokeManager'

export abstract class StrokesCreator extends DotsCreator {

  protected abstract readonly context: CanvasRenderingContext2D
  private readonly strokeManager = new StrokeManager<DrawingStroke>( DrawingStroke )
  private readonly clearPathManager = new StrokeManager<ClearPath>( ClearPath )

  public createStroke( x:number, y:number, props:StrokeProps ): DrawingStroke {
    const stroke: DrawingStroke = this.strokeManager.genStroke( x, y, props, this.context )
    return stroke
  }

  public createClearPath( x:number, y:number, props:ClearPathProps ): ClearPath {
    const path: ClearPath = this.clearPathManager.genStroke( x, y, props, this.context )
    return path
  }

  protected cleanStrokes() {
    for( const strokeKey of this.strokeManager.keyList ) {
      const stroke: DrawingStroke = this.strokeManager.getStroke( strokeKey )!
      stroke.stop()
    }
    for( const clearPathKey of this.clearPathManager.keyList ) {
      const path: ClearPath = this.clearPathManager.getStroke( clearPathKey )!
      path.stop()
    }
  }

  protected renderStrokes() {
    for( const strokeKey of this.strokeManager.keyList ) {
      const stroke: DrawingStroke = this.strokeManager.getStroke( strokeKey )!
      stroke.render()
    }
    for( const clearPathKey of this.clearPathManager.keyList ) {
      const path: ClearPath = this.clearPathManager.getStroke( clearPathKey )!
      path.render()
    }
  }

}
