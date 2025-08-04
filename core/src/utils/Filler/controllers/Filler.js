import { Image } from '../models/index.js'
import { RenderingFiller } from '../services/index.js'
import { structColor } from './struct_color.js'

/**
 * @import { IFiller } from '../services'
 * @import { FrameFunction } from '../models'
 */

/**
 * Drawing filling utility.
 * Single Thread implementation.
 * @implements {IFiller}
 */
export class Filler {

  /** @private @type { FrameFunction | null } */ handleFrame = null
  #width
  #height

  /**
   * @param { number } width
   * @param { number } height
   */
  constructor( width, height ) {
    this.#width = width
    this.#height = height
  }

  /**
   * @public
   * @param { number } x
   * @param { number } y
   * @param { string } colorCode
   * @param { Uint8ClampedArray } pixelList
   */
  fill( x, y, colorCode, pixelList ) {
    const { width, height } = this
    // Preparing dependencies
    const image = new Image( width, height, pixelList )
    const initPixel = image.getPixel( x, y )
    const color = structColor( colorCode )
    if( initPixel === null ) { return }
    // Infinity is used as "area" to force all pixels rendering in a single frame
    const filler = new RenderingFiller( initPixel, color, image, Infinity, false )
    // Using filler
    filler.onFrame( ( binImage ) => {
      if( this.handleFrame === null ) { return }
      this.handleFrame( binImage )
    } )
    filler.fill()
  }

  /**
   * @public
   * @param { FrameFunction } callback
   */
  onFrame( callback ) {
    this.handleFrame = callback
  }

  /**
   * @returns { number }
   */
  get width() {
    return this.#width
  }

  /**
   * @returns { number }
   */
  get height() {
    return this.#height
  }

}
