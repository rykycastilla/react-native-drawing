import { EventDispatcher, EventHandler, EventType } from '../../utils/EventDispatcher'

import { EventListener } from './EventListener'
import { HistoryListener } from './HistoryListener'

export class EventService extends EventDispatcher<EventListener> {

  constructor(
    private readonly historyDispatcher: EventDispatcher<HistoryListener>,
  ) { super() }

  override addEventListener<T extends EventType<EventListener>>( type:T, handler:EventHandler<T,EventListener> ) {
    if( type === 'history-move' ) {
      this.historyDispatcher.addEventListener( type, handler )
    }
    else {
      super.addEventListener( type, handler )
    }
  }

  override removeEventListener<T extends EventType<EventListener>>( type:T, handler:EventHandler<T,EventListener> ) {
    if( type === 'history-move' ) {
      this.historyDispatcher.removeEventListener( type, handler )
    }
    else {
      super.removeEventListener( type, handler )
    }
  }

}

export type { EventListener }
