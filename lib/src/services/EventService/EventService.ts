import { EventDispatcher, EventHandler, EventType } from '../../utils/EventDispatcher'
import { EventListener } from './EventListener'
import { HistoryListener } from './HistoryListener'
import { IDraw } from '../Draw'
import { LoadEvent } from './_events'
import { MessageSystem } from '../../shared/utils/MessageSystem'

export class EventService extends EventDispatcher<EventListener> {

  constructor(
    private readonly target: Target,
    private readonly historyDispatcher: EventDispatcher<HistoryListener>,
  ) {
    super()
    this.setLoadEvent()
  }

  private async setLoadEvent() {
    const webBridge: MessageSystem = await this.target.webBridgeLoaded
    webBridge.onMessage( 'load', () => {
      const event = new LoadEvent( this.target )
      this.dispatch( 'load', event )
    } )
  }

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

interface Target extends IDraw {
  webBridgeLoaded: Promise<MessageSystem>
}
