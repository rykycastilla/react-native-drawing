import { InterpolationCallback } from './InterpolationCallback'
import { Point } from '../Point'
import { PointChecker } from './PointChecker'

export class Interpolator {

  constructor(
    private readonly callback: InterpolationCallback,
  ) {}

  private calcAverage( a:number, b:number ): number {
    return ( a + b ) / 2
  }

  private calcMiddlePoint( a:Point, b:Point ): Point {
    let x: number = this.calcAverage( a.x, b.x ),
      y = this.calcAverage( a.y, b.y )
    x = Math.round( x )
    y = Math.round( y )
    return { x, y }
  }

  private samePoint( a:Point, b:Point ): boolean {
    return ( a.x === b.x ) && ( a.y === b.y )
  }

  private usePoint( point:Point, checker:PointChecker ) {
    if( checker.exists( point ) ) { return }
    this.callback( point )
    checker.check( point )
  }

  private connect( a:Point, b:Point, checker:PointChecker ) {
    this.usePoint( a, checker )
    this.usePoint( b, checker )
    if( this.samePoint( a, b ) ) { return }
    // checking middle is different to other points
    const middle: Point = this.calcMiddlePoint( a, b )
    if( this.samePoint( a, middle ) || this.samePoint( b, middle ) ) { return }
    this.connect( a, middle, checker )
    this.connect( middle, b, checker )
  }

  protected interpolate( a:Point, b:Point ) {
    const checker = new PointChecker()
    this.connect( a, b, checker )
  }

}
