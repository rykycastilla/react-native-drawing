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
  /** @private @readonly */ animatedFiller

  /**
   * @param { Color } previousColor
   * @param { Color } newColor
   * @param { Image } image
   * @param { number } areaIncrement
   * @param { Pixel[] } nextAreaPixelList
   * @param { Area } area
   * @param { boolean } animatedFiller
  */
  constructor( previousColor, newColor, image, areaIncrement, nextAreaPixelList, area, animatedFiller ) {
    super( previousColor, newColor, image )
    this.areaIncrement = areaIncrement
    this.nextAreaPixelList = nextAreaPixelList
    this.area = area
    this.animatedFiller = animatedFiller
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
  */
  validate() {}

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
    // Rendering areas only if it is animated
    if( this.animatedFiller ) { this.validate() }
    // Going to new area
    if( this.nextAreaPixelList.length > 0 ) {
      this.consumeArea()
    }
    // Rendering all the area at the end if it is not animated
    else if( !this.animatedFiller ) {
      this.validate()
    }
  }

  /**
   * @private
  */
  extendArea() {
    this.area.extend( this.areaIncrement )
  }

}
