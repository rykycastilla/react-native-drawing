import { Dot } from './Dot'

export class SquareDot extends Dot {
  override draw( path:Path2D ) {
    const quadrant: number = Math.floor( this.width / 2 )
    path.rect( this.x - quadrant, this.y - quadrant, this.width, this.width )
  }
}
