// @ts-expect-error - JSDoc Type
import { HistoryOutOfBoundsError } from '../../modules/history/errors'  // eslint-disable-line

export interface IDrawCore {

  /**
   * Clear the drawing canvas
   * @param color  Uses an optional color the clear with it in the background
  */
  clear( color?:string ): Promise<void>

  /**
   * A base64 image with the cobntent of the drawing canvas
  */
  getImage(): Promise<string>

  /**
   * Sets a base64 image to the drawing canvas
  */
  setImage( image:string ): Promise<void>

  /**
    * Go back in the history timeline
    * @throws { HistoryOutOfBoundsError }
  */
  undo(): Promise<void>

  /**
   * Restores the state to what it was before the last "undo" operation
   * @throws { HistoryOutOfBoundsError }
  */
  redo(): Promise<void>

}
