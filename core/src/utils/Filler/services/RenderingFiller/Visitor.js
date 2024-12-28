import { PixelChecker } from '../PixelChecker.js'
import { Queue } from '@utils/Queue'

/**
 * @import { Color, Image, Pixel } from '../../models/index.d.ts'
*/

/**
 * @abstract
*/
export class Visitor {

  /** @private @readonly */ static X_AXIS = [ 0, 1, 0, -1 ]
  /** @private @readonly */ static Y_AXIS = [ -1, 0, 1, 0 ]

  /** @protected @readonly @type { Queue<Pixel> } */ pixelQueue = new Queue()
  /** @private @readonly @type { PixelChecker } */ pixelChecker
  /** @protected @readonly */ previousColor
  /** @protected @readonly */ newColor
  /** @protected @readonly */ image

  /**
   * @param { Color } previousColor
   * @param { Color } newColor
   * @param { Image } image
  */
  constructor( previousColor, newColor, image ) {
    this.previousColor = previousColor
    this.newColor = newColor
    this.image = image
    this.pixelChecker = new PixelChecker( image )
  }

  /**
   * @protected
   * @param { Pixel } pixel
   * @returns { boolean } noVisited - This pixel can be used because it hasn't been visited yet
  */
  checkPixel( pixel ) {
    const noVisited = this.pixelChecker.isFree( pixel )
    if( noVisited ) { this.pixelChecker.check( pixel ) }
    return noVisited
  }

  /**
   * @private
   * @param { Pixel } pixel
  */
  moveAround( pixel ) {
    for( let i = 0; i < 4; i++ ) {
      const nextX = pixel.x + ( /** @type { number } */ ( Visitor.X_AXIS[ i ] ) )
      const nextY = pixel.y + ( /** @type { number } */ ( Visitor.Y_AXIS[ i ] ) )
      const nextPixel = this.image.getPixel( nextX, nextY )
      if( nextPixel === null ) { continue }
      if( this.checkPixel( nextPixel ) ) { this.pixelQueue.push( nextPixel ) }
    }
  }

  /**
   * @protected
  */
  useNextPixel() {
    const pixel = /** @type { Pixel } */ ( this.pixelQueue.front )
    this.pixelQueue.pop()
    const currentColor = this.image.getColor( pixel )
    if( currentColor.equals( this.previousColor ) ) {
      this.image.setColor( pixel, this.newColor )
      this.moveAround( pixel )
    }
  }

}
