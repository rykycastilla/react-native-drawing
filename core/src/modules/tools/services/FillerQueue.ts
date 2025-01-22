import { Filler } from '@utils/Filler'
import { FillerArgs } from '../models'
import { TaskQueue } from '@utils/TaskQueue'

/**
 * Enqueue Filling tasks to run each one after the previous ending
*/
export class FillerQueue extends TaskQueue<FillerArgs> {

  private currentUtil: Filler | null = null
  private filled: Promise<void> | null = null
  public onstarteachtask: ( ( args:FillerArgs ) => void ) | null = null

  private dispatchStartEachTask( args:FillerArgs ) {
    if( this.onstarteachtask === null ) { return }
    this.onstarteachtask( args )
  }

  protected async runTask( args:FillerArgs ) {
    const { x, y, color, scene } = args
    const { width, height, pixelList } = scene.getBinaryData()
    const util = new Filler( width, height )
    util.onFrame( ( image ) => {
      scene.setBinaryData( { ...image, colorChanels:4, maxChanel:255 } )
    } )
    this.currentUtil = util
    this.filled = util.fill( x, y, color, pixelList )
    this.dispatchStartEachTask( args )
    await this.filled
  }

  override stopTasks() {
    super.stopTasks()
    // Stopping current tool filling too
    if( ( this.currentUtil === null ) || ( this.filled === null ) ) { return }
    this.currentUtil.stop( this.filled )
  }

}
