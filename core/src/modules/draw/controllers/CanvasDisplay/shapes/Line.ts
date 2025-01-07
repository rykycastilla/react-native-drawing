import { Shape } from './Shape'

export class Line extends Shape {

  private readonly width: number
  private readonly init: Pixel
  private end: Pixel | null = null

  constructor( color:string, width:number, x:number, y:number ) {
    super( color )
    this.width = width
    this.init = { x, y }
  }

  public setEnd( x:number, y:number ) {
    this.end = { x, y }
  }

  override draw( path:Path2D ) {
    if( this.end === null ) { return }
    path.moveTo( this.init.x, this.init.y )
    path.lineTo( this.end.x, this.end.y )
  }

  override printBody( context:CanvasRenderingContext2D, path:Path2D ) {
    context.strokeStyle = this.color
    context.lineWidth = this.width
    context.stroke( path )
  }

}

interface Pixel {
  x: number
  y: number
}
