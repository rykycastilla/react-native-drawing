import { HistoryEvent } from '../History'

export interface HistoryListener {
  type: 'history-move'
  handle( event:HistoryEvent ): Promise<void> | void
}
