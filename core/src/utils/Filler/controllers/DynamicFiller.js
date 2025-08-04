import Thread from './FillerThread?worker'
import { FillerWorkerThread } from '../services/index.js'
import { TaskManager } from '@utils/TaskManager'

/**
 * @import { IFiller } from '../services'
 */

/**
 * Drawing filling utility.
 * It has animations and parallel processing to increase performance.
 * @implements {IFiller}
 */
export class DynamicFiller extends FillerWorkerThread {
  /**
   * @param { number } width
   * @param { number } height
  */
  constructor( width, height ) {
    const taskManager = new TaskManager( Thread )
    super( width, height, true, taskManager )
  }
}
