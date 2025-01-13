import { DrawingScene } from '@draw/models'
import { ITool } from '../ITool'

export abstract class Tool implements ITool {

  public prepareToUse() {}

  public addStrokePoint( x:number, y:number, strokeId:symbol, scene:DrawingScene ) {
    x ; y ; strokeId ; scene
  }

  public endShapeStroke( x:number, y:number, strokeId:symbol, scene:DrawingScene ) {
    x ; y ; strokeId ; scene
  }

  public stopUsing() {}

}
