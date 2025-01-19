import { HistoryEvent } from './HistoryEvent'
import { HistoryOutOfBoundsError } from '../../shared/modules/history/errors'  // eslint-disable-line

export interface DrawHistory {

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

  /**
   * Appends an event listener for events whose type attribute
   * value is type. The callback argument sets the handler that
   * will be invoked when the event is dispatched.
  */
  addEventListener( type:'history-move', event:HistoryHandler ): void

  /**
   * Removes the event listener in target's event listener list with the same type and callback
  */
  removeEventListener( type:'history-move', event:HistoryHandler ): void

}

interface HistoryHandler {
  ( event:HistoryEvent ): Promise<void> | void
}
