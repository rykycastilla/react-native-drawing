import { calcIdealArea } from './calc_ideal_area.js'
import { Image } from '../models/index.js'
import { RenderingFiller } from '../services/index.js'
import { structColor } from './struct_color.js'

/**
 * @import { Filler, FrameFunction } from '../models/index.js'
 * @import { AnimationDTO, StartDTO, Thread } from '../services/index.js'
*/

/**
 * @implements {Filler<[ x:number, y:number, colorCode:string, width:number, height:number, pixelList:Uint8ClampedArray ]>}
*/
class FillerThread {

  /** @private @type { FrameFunction | null } */ handleFrame = null
  /** @private @readonly */ finish

  /**
   * @param { () => void } finish
  */
  constructor( finish ) {
    this.finish = finish
  }

  /**
   * @param { number } x
   * @param { number } y
   * @param { string } colorCode
   * @param { number } width
   * @param { number } height
   * @param { Uint8ClampedArray } pixelList
  */
  async fill( x, y, colorCode, width, height, pixelList ) {
    // Preparing dependencies
    const image = new Image( width, height, pixelList )
    const pixel = image.getPixel( x, y )
    if( pixel === null ) { return }  // ---- enviar datos de terminacion aqui
    const color = structColor( colorCode )
    // Calculating procesable area (per frame) (based on device performance)
    const idealArea = await calcIdealArea( 10 )
    // Using filler
    const filler = new RenderingFiller( pixel, color, image, idealArea )
    filler.onFrame( ( binImage ) => {
      if( this.handleFrame === null ) { return }
      this.handleFrame( binImage )
    } )
    await filler.fill()
    this.finish()
  }

  /**
   * @public
   * @param { FrameFunction } handle
  */
  onFrame( handle ) {
    this.handleFrame = handle
  }

}

const thread = /** @type { Thread<AnimationDTO,StartDTO> } */  ( self )

const fillerThread = new FillerThread( () => {
  thread.postMessage( { target:'finish' } )
} )

fillerThread.onFrame( ( binImage ) => {
  const { width, height, pixelList } = binImage
  const pixelListBuffer = pixelList.buffer
  thread.postMessage( { target:'frame', width, height, pixelListBuffer }, [ pixelListBuffer ] )
} )

thread.addEventListener( 'message', ( event ) => {
  const { x, y, colorCode, width, height, pixelListBuffer } = event.data
  const pixelList = new Uint8ClampedArray( pixelListBuffer )
  fillerThread.fill( x, y, colorCode, width, height, pixelList )
} )
