// @ts-expect-error - JSDoc Type
import { HistoryOutOfBoundsError } from '../../modules/history/errors'  // eslint-disable-line

export interface IWebDraw {

  clear( color?:string ): Promise<void>
  getImage(): Promise<string>
  setImage( image:string ): Promise<void>

  /**
   * @throws { HistoryOutOfBoundsError }
  */
  undo(): Promise<void>

  /**
   * @throws { HistoryOutOfBoundsError }
  */
  redo(): Promise<void>

}
