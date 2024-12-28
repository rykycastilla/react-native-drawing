/**
 * @import { Pixel } from './Pixel.js'
*/

export class ColorIndex {

  /** @readonly */ RED
  /** @readonly */ GREEN
  /** @readonly */ BLUE
  /** @readonly */ ALPHA

  /**
   * @param { Pixel } pixel
   * @param { number } width
  */
  constructor( pixel, width ) {
    const index = pixel.calcIndex( width ) * 4
    this.RED = index
    this.GREEN = index + 1
    this.BLUE = index + 2
    this.ALPHA = index + 3
  }

}
