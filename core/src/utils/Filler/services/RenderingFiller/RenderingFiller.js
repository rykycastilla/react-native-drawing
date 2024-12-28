import { AreaValidator } from './AreaValidator.js'
import { CircularArea } from '../../models/index.js'

/**
 * @import { Color, Filler, Image, FrameFunction, Pixel } from '../../models/index.d.ts'
*/

/**
 * @extends AreaValidator
 * @implements {Filler<[]>}
*/
export class RenderingFiller extends AreaValidator {

  /** @private */ filled = false
  /** @private @type { FrameFunction | null } */ handleFrame = null

  /**
   * @param { Pixel } pixel
   * @param { Color } color
   * @param { Image } image
   * @param { number } area
  */
  constructor( pixel, color, image, area ) {
    const previousColor = image.getColor( pixel )
    const circularArea = new CircularArea( pixel )
    super( previousColor, color, image, area, [ pixel ], circularArea )
  }

  /**
   * @public
  */
  async fill() {
    if( this.filled ) { throw new Error( 'Yo can not use fill function more than one time' ) }
    this.filled = true
    if( this.previousColor.equals( this.newColor ) ) { return }
    // Filling areas progressively
    this.consumeArea()
  }

  /**
   * @public
   * @param { FrameFunction } handle
  */
  onFrame( handle ) {
    this.handleFrame = handle
  }

  /**
   * @override @protected
   * @param { boolean } isLatest
  */
  validate( isLatest ) {
    if( this.handleFrame === null ) { return }
    const { width, height } = this.image
    const pixelList = this.image.getPixelList()
    this.handleFrame( { width, height, pixelList }, isLatest )
  }

}
