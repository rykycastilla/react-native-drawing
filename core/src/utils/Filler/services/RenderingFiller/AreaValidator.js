import { Visitor } from './Visitor.js'

/**
 * @import { Area, Color, Image, Pixel } from '../../models/index.d.ts'
*/

/**
 * @abstract
 * @extends Visitor
*/
export class AreaValidator extends Visitor {

  /** @private @readonly */ areaIncrement
  /** @private */ nextAreaPixelList
  /** @private @readonly */ area

  /**
   * @param { Color } previousColor
   * @param { Color } newColor
   * @param { Image } image
   * @param { number } areaIncrement
   * @param { Pixel[] } nextAreaPixelList
   * @param { Area } area
  */
  constructor( previousColor, newColor, image, areaIncrement, nextAreaPixelList, area ) {
    super( previousColor, newColor, image )
    this.areaIncrement = areaIncrement
    this.nextAreaPixelList = nextAreaPixelList
    this.area = area
  }

  /**
   * @override @protected
   * @param { Pixel } pixel
   * @returns { boolean } Can be included this pixel in the queue
  */
  checkPixel( pixel ) {
    const noVisited = super.checkPixel( pixel )
    let canBeUsed = noVisited
    if( noVisited && !this.area.isInside( pixel ) ) {
      this.nextAreaPixelList.push( pixel )
      canBeUsed = false
    }
    return canBeUsed
  }

  /**
   * Called when every area is ready to be rendered
   * @protected @abstract
   * @param { boolean } isLatest
  */
  validate( isLatest ) { isLatest }

  /**
   * @private
  */
  filterCurrentAreaPixels() {
    const currentAreaPixelList = this.nextAreaPixelList
    this.nextAreaPixelList = []
    for( const pixel of currentAreaPixelList ) {
      if( this.area.isInside( pixel ) ) { this.pixelQueue.push( pixel ) }
      else { this.nextAreaPixelList.push( pixel ) }
    }
  }

  /**
   * Consume specific areas (recursively) using only allowed pixel in this section
   * @protected
  */
  consumeArea() {
    // Preparing environment for this area (area num and pixels)
    this.extendArea()
    this.filterCurrentAreaPixels()  // Pushing area pixels in queue
    // Painting area in image
    while( !this.pixelQueue.isEmpty ) {
      this.useNextPixel()
    }
    const isLatest = this.nextAreaPixelList.length <= 0
    this.validate( isLatest )  // Rendering
    // Going to new area
    if( !isLatest ) {
      this.consumeArea()
    }
  }

  /**
   * @private
  */
  extendArea() {
    this.area.extend( this.areaIncrement )
  }

}
