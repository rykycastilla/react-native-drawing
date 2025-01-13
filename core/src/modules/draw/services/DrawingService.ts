import { DrawingBoard } from '../models'
import { ITool } from '@tools/models'

export class DrawingService {

  constructor(
    private readonly board: DrawingBoard,
    private readonly createEmptyImage: CreateEmptyImageFunction,
  ) {}

  public async clear( color?:string ) {
    const { width, height } = this.board
    const image: string = this.createEmptyImage( width, height, color )
    await this.board.setImage( image )
  }

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

  public async setImage( image:string ) {
    await this.board.setImage( image )
  }

}

interface CreateEmptyImageFunction {
  ( width:number, height:number, color?:string ): string
}
