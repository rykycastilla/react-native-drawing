import { Color } from '../Color.js'
import { ColorIndex } from './ColorIndex.js'
import { Pixel } from './Pixel.js'

export class Image {

  /** @readonly */ #width
  /** @readonly */ #height
  /** @private @readonly */ pixelList

  /**
   * @param { number } width
   * @param { number } height
   * @param { Uint8ClampedArray } pixelList
  */
  constructor( width, height, pixelList ) {
    this.#width = width
    this.#height = height
    this.pixelList = pixelList
  }

  /**
   * @public
   * @param { number } x
   * @param { number } y
   * @returns { Pixel | null }
  */
  getPixel( x, y ) {
    const pixel = new Pixel( x, y )
    if( this.isOutOfLimits( pixel ) ) { return null }
    return pixel
  }

  /**
   * @public
   * @param { Pixel } pixel
   * @returns { boolean }
  */
  isOutOfLimits( pixel ) {
    if( !( ( 0 <= pixel.x ) && ( pixel.x < this.width ) ) ) { return true }
    if( !( ( 0 <= pixel.y ) && ( pixel.y < this.height ) ) ) { return true }
    return false
  }

  /**
   * @public
   * @param { Pixel } pixel
   * @param { Color } color
  */
  setColor( pixel, color ) {
    const index = new ColorIndex( pixel, this.width )
    this.pixelList[ index.RED ] = color.red
    this.pixelList[ index.GREEN ] = color.green
    this.pixelList[ index.BLUE ] = color.blue
    this.pixelList[ index.ALPHA ] = color.alpha
  }

  /**
   * @public
   * @param { Pixel } pixel
   * @returns { Color }
  */
  getColor( pixel ) {
    const index = new ColorIndex( pixel, this.width )
    const red = /** @type { number } */ ( this.pixelList[ index.RED ] ),
      green = /** @type { number } */ ( this.pixelList[ index.GREEN ] ),
      blue = /** @type { number } */ ( this.pixelList[ index.BLUE ] ),
      alpha = /** @type { number } */ ( this.pixelList[ index.ALPHA ] )
    return new Color( red, green, blue, alpha )
  }

  /**
   * @public
   * @returns { Uint8ClampedArray }
  */
  getPixelList() {
    return new Uint8ClampedArray( this.pixelList )
  }

  get width() {
    return this.#width
  }

  get height() {
    return this.#height
  }

}
