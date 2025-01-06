import { DrawingBoard } from '@draw/models'

export interface ITool {
  prepareToUse(): void
  addStrokePoint( x:number, y:number, strokeId:symbol, board:DrawingBoard ): void
  endShapeStroke( x:number, y:number, strokeId:symbol, board:DrawingBoard ): void
  stopUsing(): void
}
