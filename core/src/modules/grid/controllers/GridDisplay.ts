import { Display } from '../models'

export class GridDisplay implements Display {

  public readonly RESOLUTION = 720

  constructor(
    private readonly context: CanvasRenderingContext2D,
  ) {}

  public frame( width:number, height:number, x:number, y:number, bold:number, color:string ) {
    this.context.beginPath()
    this.context.strokeStyle = color
    this.context.lineWidth = bold
    this.context.rect( x, y, width, height )
    this.context.stroke()
  }

  public clear() {
    this.context.clearRect( 0, 0, this.RESOLUTION, this.RESOLUTION )
  }

}
