/**
 * Track information about the fps's of a system
*/
export class FrameRateTracker {

  #lapse = 0
  #frames = 0

  /**
   * Regists a new frame
   * @param rate  Time between the current and the latest frame
  */
  public registFrame( rate:number ) {
    this.#frames++
    this.#lapse += rate
  }

  /**
   * Clear the tracked data
  */
  public reset() {
    this.#lapse = 0
    this.#frames = 0
  }

  get lapse(): number {
    return this.#lapse
  }

  get frames(): number {
    return this.#frames
  }

}
