import { Circle } from './Circle.js'

/**
 * @import { Area, Point } from '../Area.js'
*/

/**
 * @implements {Area}
*/
export class CircularArea extends Circle {

  /** @private @readonly */ center

  /**
   * @param { Point } center
  */
  constructor( center ) {
    super( 0 )
    this.center = center
  }

  /**
   * Area extensions increases its radius in minimum 1 every time
   * @public
   * @param { number } extraArea
  */
  extend( extraArea ) {
    const newArea = this.area + extraArea
    const newRadius = Circle.calcRadius( newArea )
    let radiusDifference = newRadius - this.radius
    if( radiusDifference < 1 ) { radiusDifference = 1 }
    this.inflate( radiusDifference )
  }

  /**
   * @public
   * @param { Point } point
   * @returns { boolean }
  */
  isInside( point ) {
    const distance = CircularArea.calcDistance( this.center, point )
    return distance <= this.radius
  }

  /**
   * @public
   * @param { Point } a
   * @param { Point } b
   * @returns { number }
  */
  static calcDistance( a, b ) {
    return Math.sqrt( ( a.x - b.x ) ** 2 + ( a.y - b.y ) ** 2 )
  }

}
