import { History } from './History'

// @ts-expect-error - JSDoc Type
import { HistoryOutOfBoundsError } from '@shared/modules/history/errors'  // eslint-disable-line

export interface IHistoryService {

  /**
   * Go back in the History
   * @throws { HistoryOutOfBoundsError } If the current snapshot is the first
  */
  undo(): Promise<void>

  /**
   * Restores the state to what it was before the last "undo" operation
   * @throws { HistoryOutOfBoundsError } If the current snapshot is the latest
  */
  redo(): Promise<void>

  /**
   * Set a new history instance to be controlled by the DrawingService
   * @param history  The history passed to this object shouldn't use its onmove method
   * in another place, because it is readed and modified by this object
  */
  setHistory( history:History ): void

}
