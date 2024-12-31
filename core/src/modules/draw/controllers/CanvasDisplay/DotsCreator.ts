import { Dot, Shape, SquareDot } from './shapes'

export abstract class DotsCreator {

  protected abstract shapeList: Shape[]

  constructor(
    protected readonly context: CanvasRenderingContext2D,
  ) {}

  public createDot( x:number, y:number, width:number, color:string, isSquare:boolean ) {
    const DotShape: DotConstructor = isSquare ? SquareDot : Dot
    const dot: Dot = new DotShape( x, y, width, color )
    this.shapeList.push( dot )
  }

}

interface DotConstructor {
  new ( x:number, y:number, width:number, color:string ): Dot
}
