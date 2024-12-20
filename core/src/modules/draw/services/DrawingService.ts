import { DrawingBoard } from '../models'
import { Tool } from '@tools/models'

export class DrawingService {

  constructor(
    private readonly board: DrawingBoard,
  ) {}

  public stopStroke( x:number, y:number, strokeId:symbol, tool:Tool ) {
    tool.endShapeStroke( x, y, strokeId, this.board )
  }

  public use( x:number, y:number, strokeId:symbol, tool:Tool ) {
    tool.addStrokePoint( x, y, strokeId, this.board )
  }

}
