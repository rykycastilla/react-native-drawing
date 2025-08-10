import { DynamicFiller, IFiller } from '@utils/Filler'
import { FillerArgs } from '../models'
import { FillerFactory } from '@utils/FillerFactory'
import { TaskQueue } from '@utils/TaskQueue'

/**
 * Enqueue Filling tasks to run each one after the previous ending
*/
export class FillerQueue extends TaskQueue<FillerArgs> {

  private currentUtil: IFiller | null = null
  private filled: Promise<void> | null = null
  public onstarteachtask: ( ( args:FillerArgs ) => Promise<void> | void ) | null = null

  private async dispatchStartEachTask( args:FillerArgs ) {
    if( this.onstarteachtask === null ) { return }
    await this.onstarteachtask( args )
  }

  protected async runTask( args:FillerArgs ) {
    const { x, y, color, animatedFiller, scene } = args
    const { width, height, pixelList } = scene.getBinaryData()
    await this.dispatchStartEachTask( args )
    const util: IFiller = FillerFactory.createInstance( width, height, animatedFiller )
    util.onFrame( ( image ) => {
      scene.setBinaryData( { ...image, colorChanels:4, maxChanel:255 } )
    } )
    this.currentUtil = util
    const fillingResult: Promise<void> | void = util.fill( x, y, color, pixelList )
    this.filled = ( fillingResult instanceof Promise ) ? fillingResult : null
    await this.filled
  }

  override stopTasks() {
    super.stopTasks()
    // Stopping current tool filling too
    const { currentUtil:util, filled } = this
    if( ( util === null ) || ( filled === null ) || !( util instanceof DynamicFiller ) ) { return }
    util.stop( filled )
  }

}
