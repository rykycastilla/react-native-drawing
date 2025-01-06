import { DrawingBoard } from '@draw/models'
import { ITool } from '../ITool'

export abstract class Tool implements ITool {

  public prepareToUse() {}

  public addStrokePoint( x:number, y:number, strokeId:symbol, board:DrawingBoard ) {
    x ; y ; strokeId ; board
  }

  public endShapeStroke( x:number, y:number, strokeId:symbol, board:DrawingBoard ) {
    x ; y ; strokeId ; board
  }

  public stopUsing() {}

}
