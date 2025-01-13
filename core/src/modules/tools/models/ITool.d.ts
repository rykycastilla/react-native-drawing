import { DrawingScene } from '@draw/models'

export interface ITool {
  prepareToUse(): void
  addStrokePoint( x:number, y:number, strokeId:symbol, scene:DrawingScene ): void
  endShapeStroke( x:number, y:number, strokeId:symbol, scene:DrawingScene ): void
  stopUsing(): void
}
