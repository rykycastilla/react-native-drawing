import { DrawingBoard } from '@draw/models'
import { ColorableTool } from './ColorableTool'
import { ResizableTool } from './ResizableTool'

export class DotPen implements ColorableTool, ResizableTool {

  private latestPoint: `${ number };${ number }` | null = null
  #color: string
  #size: number

  constructor(
    color:string, size:number,
    public readonly IS_SQUARE = false,
  ) {
    this.#color = color
    this.#size = size
  }

  public prepareToUse() {}

  public addStrokePoint( x:number, y:number, strokeId:symbol, board:DrawingBoard ) {
    strokeId
    this.latestPoint = `${ x };${ y }`
    board.createDot( x, y, this.size, this.color, this.IS_SQUARE )
  }

  public endShapeStroke( x:number, y:number, strokeId:symbol, board:DrawingBoard ) {
    strokeId
    const thisPoint = `${ x };${ y }`
    if( thisPoint !== this.latestPoint ) {
      board.createDot( x, y, this.size, this.color, this.IS_SQUARE )
    }
    this.latestPoint = null
  }

  public stopUsing() {
    this.latestPoint = null
  }

  get color(): string {
    return this.#color
  }

  public setColor( color:string ) {
    this.#color = color
  }

  get size(): number {
    return this.#size
  }

  public setSize( size:number ) {
    this.#size = size
  }

}
