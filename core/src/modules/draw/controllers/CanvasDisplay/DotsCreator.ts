import { BinaryDisplay } from './BinaryDisplay'
import { Dot, Shape, SquareDot } from './shapes'

export abstract class DotsCreator extends BinaryDisplay {

  private shapeList: Shape[] = []
  protected abstract readonly context: CanvasRenderingContext2D

  public createDot( x:number, y:number, width:number, color:string, isSquare:boolean ) {
    const DotShape: DotConstructor = isSquare ? SquareDot : Dot
    const dot: Dot = new DotShape( x, y, width, color )
    this.shapeList.push( dot )
  }

  protected renderShapes() {
    for( const shape of this.shapeList ) {
      shape.render( this.context )
    }
    this.shapeList = []
  }

}

interface DotConstructor {
  new ( x:number, y:number, width:number, color:string ): Dot
}
