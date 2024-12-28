/**
 * @import { Image, Pixel } from '../models/index.js'
*/

export class PixelChecker {

  /** @private @readonly @type { Array<boolean|undefined> } */ pixelIndex = []
  /** @private @readonly */ image

  /**
   * @param { Image } image
  */
  constructor( image ) {
    this.image = image
  }

  /**
   * @public
   * @param { Pixel } pixel
  */
  check( pixel ) {
    if( this.image.isOutOfLimits( pixel ) ) { return }
    const index = pixel.calcIndex( this.image.width )
    this.pixelIndex[ index ] = true
  }

  /**
   * @public
   * @param { Pixel } pixel
   * @returns { boolean }
  */
  isFree( pixel ) {
    if( this.image.isOutOfLimits( pixel ) ) { return false }
    const index = pixel.calcIndex( this.image.width )
    return !this.pixelIndex[ index ]
  }

}
