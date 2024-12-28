import Thread from './FillerThread?worker'
import { Filler as FillerTask } from '../services/index.js'

export class Filler extends FillerTask {
  /**
   * @param { number } width
   * @param { number } height
  */
  constructor( width, height ) {
    super( width, height, Thread )
  }
}
