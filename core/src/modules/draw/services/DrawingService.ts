import { DrawingBoard } from '../models'
import { ITool } from '@tools/models'

export class DrawingService {

  constructor(
    private readonly board: DrawingBoard,
  ) {}

  public stopStroke( x:number, y:number, strokeId:symbol, tool:ITool ) {
    tool.endShapeStroke( x, y, strokeId, this.board )
  }

  public use( x:number, y:number, strokeId:symbol, tool:ITool ) {
    tool.addStrokePoint( x, y, strokeId, this.board )
  }

  get image(): string {
    console.log( this.board )
    return this.board.image
  }

  public setImage( image:string ) {
    this.board.setImage( image )
  }

}
