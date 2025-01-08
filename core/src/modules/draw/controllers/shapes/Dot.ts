import { Shape } from './Shape'

export class Dot extends Shape {

  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly width: number,
    color:string,
  ) { super( color ) }

  protected draw( path:Path2D ) {
    const radius: number = Math.round( this.width / 2 )
    path.arc( this.x, this.y, radius, 0, Math.PI * 2 )
  }

}
