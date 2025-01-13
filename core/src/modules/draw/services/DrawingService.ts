import { DrawingScene } from '../models'
import { ITool } from '@tools/models'

export class DrawingService {

  constructor(
    private readonly scene: DrawingScene,
    private readonly createEmptyImage: CreateEmptyImageFunction,
  ) {}

  public async clear( color?:string ) {
    const { width, height } = this.scene
    const image: string = this.createEmptyImage( width, height, color )
    await this.scene.setImage( image )
  }

  public stopStroke( x:number, y:number, strokeId:symbol, tool:ITool ) {
    tool.endShapeStroke( x, y, strokeId, this.scene )
  }

  public use( x:number, y:number, strokeId:symbol, tool:ITool ) {
    tool.addStrokePoint( x, y, strokeId, this.scene )
  }

  get image(): string {
    console.log( this.scene )
    return this.scene.image
  }

  public async setImage( image:string ) {
    await this.scene.setImage( image )
  }

}

interface CreateEmptyImageFunction {
  ( width:number, height:number, color?:string ): string
}
