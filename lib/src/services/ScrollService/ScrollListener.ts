import { ScrollEvent } from './ScrollEvent'

export interface ScrollListener {
  type: 'scroll'
  handle( event:ScrollEvent ): Promise<void> | void
}
