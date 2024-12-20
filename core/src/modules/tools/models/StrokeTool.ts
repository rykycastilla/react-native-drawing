import { DrawingBoard, Stroke } from '@draw/models'
import { Tool } from './Tool'

export abstract class StrokeTool<T extends object> implements Tool {

  private readonly strokeIndex: Record<symbol,Stroke<T>> = {}

  protected abstract createStroke( x:number, y:number, board:DrawingBoard ): Stroke<T> | null
  protected abstract updateProps( stroke:Stroke<T> ): void

  public addStrokePoint ( x:number, y:number, strokeId:symbol, board:DrawingBoard ) {
    if( this.strokeIndex[ strokeId ] === undefined ) {
      const stroke: Stroke<T> | null = this.createStroke( x, y, board )
      if( stroke === null ) { return }
      this.strokeIndex[ strokeId ] = stroke
      stroke.onStop( () => delete this.strokeIndex[ strokeId ] )
    }
    else {
      const stroke: Stroke<T> = this.strokeIndex[ strokeId ]
      this.updateProps( stroke )
      stroke.addPoint( x, y )
    }
  }

  public endShapeStroke( x:number, y:number, strokeId:symbol, board:DrawingBoard ) {
    this.addStrokePoint( x, y, strokeId, board )
    const stroke: Stroke<T> | undefined = this.strokeIndex[ strokeId ]
    if( stroke === undefined ) { return }
    stroke.stop()
  }

  public stopUsing() {
    const keyList: symbol[] = Object.getOwnPropertySymbols( this.strokeIndex )
    for( const key of keyList ) {
      const stroke: Stroke<T> = this.strokeIndex[ key ]!
      stroke.stop()
    }
  }

}
