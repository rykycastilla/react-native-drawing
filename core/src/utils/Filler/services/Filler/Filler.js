/**
 * @import { BinImage, Filler as IFiller, FrameFunction } from '../../models/index.js'
 * @import { AnimationDTO } from '../AnimationDTO.d.ts'
 * @import { ThreadConstructor } from './ThreadConstructor.js'
*/

/**
 * @implements {IFiller<[ x:number, y:number, color:string, pixelList:Uint8ClampedArray ]>}
*/
export class Filler {

  /** @readonly */ width
  /** @readonly */ height
  /** @private @type { FrameFunction | null } */ handleFrame = null
  /** @private @readonly */ Thread

  /**
   * @param { number } width
   * @param { number } height
   * @param { ThreadConstructor } Thread
   */
  constructor( width, height, Thread ) {
    this.width = width
    this.height = height
    this.Thread = Thread
  }

  /**
   * @private
   * @param { BinImage } image
  */
  renderFrame( image ) {
    if( this.handleFrame === null ) { return }
    this.handleFrame( image )
  }

  /**
   * @private
   * @param { { data:AnimationDTO } } event
   * @param { () => void } endCallback
  */
  receive( event, endCallback ) {
    if( event.data.target === 'finish' ) { endCallback() }
    else if( event.data.target === 'frame' ) {
      const { width, height, pixelListBuffer } = event.data
      const pixelList = new Uint8ClampedArray( pixelListBuffer )
      const binImage = { width, height, pixelList }
      this.renderFrame( binImage )
    }
  }

  /**
   * @public
   * @param { number } x
   * @param { number } y
   * @param { string } color
   * @param { Uint8ClampedArray } pixelList
   * @returns { Promise<void> }
  */
  fill( x, y, color, pixelList ) {
    const { width, height } = this
    const fillerThread = new this.Thread()
    fillerThread.postMessage( { x, y, colorCode:color, width, height, pixelListBuffer:pixelList.buffer }, [ pixelList.buffer ] )
    return new Promise( ( resolve ) => {
      fillerThread.addEventListener( 'message', ( event ) => this.receive( event, resolve ) )
    } )
  }

  /**
   * @param { FrameFunction } handle
  */
  onFrame( handle ) {
    this.handleFrame = handle
  }

}
