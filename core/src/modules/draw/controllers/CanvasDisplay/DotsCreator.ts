import { Dot, SquareDot } from './shapes'
import { ShapesCreator } from './ShapesCreator'

export abstract class DotsCreator extends ShapesCreator {
  public createDot( x:number, y:number, width:number, color:string, isSquare:boolean ) {
    const DotShape: DotConstructor = isSquare ? SquareDot : Dot
    const dot: Dot = new DotShape( x, y, width, color )
    this.shapeList.push( dot )
  }
}

interface DotConstructor {
  new ( x:number, y:number, width:number, color:string ): Dot
}
