import { Display, Orientation } from '../models'

export class GridDisplay implements Display {

  constructor(
    private readonly context: CanvasRenderingContext2D,
  ) {}

  makeLine( orientation:Orientation, axisPos:number, width:number, color:string ) {
    this.context.beginPath()
    this.context.lineWidth = width
    this.context.strokeStyle = color
    const [ x1, y1 ] = ( orientation === Orientation.HORIZONTAL )
      ? [ 0, axisPos ]
      : [ axisPos, 0 ]
    const [ x2, y2 ] = ( orientation === Orientation.HORIZONTAL )
      ? [ this.width, axisPos ]
      : [ axisPos, this.height ]
    this.context.moveTo( x1, y1 )
    this.context.lineTo( x2, y2 )
    this.context.stroke()
  }

  public clear() {
    this.context.clearRect( 0, 0, this.width, this.height )
  }

  get width(): number {
    const { canvas } = this.context
    return canvas.width
  }

  get height(): number {
    const { canvas } = this.context
    return canvas.height
  }

}
