import { Point } from '../../models'

export class Section<T extends object> {

  public readonly path = new Path2D()

  constructor(
    start:Point,
    public readonly props: T,
  ) { this.path.moveTo( start.x, start.y ) }

}
