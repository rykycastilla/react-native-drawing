/**
 * @import { AnimationDTO } from '../AnimationDTO.d.ts'
 * @import { BinImage, Filler as IFiller, FrameFunction } from '../../models/index.d.ts'
 * @import { TaskManager } from './TaskManager.d.ts'
*/

/**
 * @implements {IFiller<[ x:number, y:number, color:string, pixelList:Uint8ClampedArray ]>}
*/
export class Filler {

  /** @readonly */ width
  /** @readonly */ height
  /** @private @type { FrameFunction | null } */ handleFrame = null
  /** @private @readonly */ taskManager

  /**
   * @param { number } width
   * @param { number } height
   * @param { TaskManager } taskManager
   */
  constructor( width, height, taskManager ) {
    this.width = width
    this.height = height
    this.taskManager = taskManager
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
   * @param { Promise<void> } terminated
  */
  receive( event, terminated ) {
    if( event.data.target === 'finish' ) {
      this.taskManager.terminate( terminated )
    }
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
    const { thread:fillerThread, terminated } = this.taskManager.create()
    fillerThread.addEventListener( 'message', ( event ) => this.receive( event, terminated ) )
    const messageData = { x, y, colorCode:color, width, height, pixelListBuffer:pixelList.buffer }
    fillerThread.postMessage( { target:'start', ...messageData }, [ pixelList.buffer ] )
    return terminated
  }

  /**
   * @public
   * @param { Promise<void> } terminated
  */
  stop( terminated ) {
    this.taskManager.terminate( terminated )
  }

  /**
   * @param { FrameFunction } handle
  */
  onFrame( handle ) {
    this.handleFrame = handle
  }

}
