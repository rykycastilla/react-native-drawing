import Thread from './FillerThread?worker'
import { Filler as FillerTask } from '../services/index.js'
import { TaskManager } from '@utils/TaskManager'

export class Filler extends FillerTask {
  /**
   * @param { number } width
   * @param { number } height
   * @param { boolean } animatedFiller
  */
  constructor( width, height, animatedFiller ) {
    const taskManager = new TaskManager( Thread )
    super( width, height, animatedFiller, taskManager )
  }
}
