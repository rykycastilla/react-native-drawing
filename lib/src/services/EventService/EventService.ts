import { EventDispatcher, EventHandler, EventType } from '../../utils/EventDispatcher'
import { EventListener } from './EventListener'
import { EyeDropperEvent, LoadEvent } from './_events'
import { HistoryListener } from './HistoryListener'
import { IDraw } from '../Draw'
import { MessageSystem } from '../../shared/utils/MessageSystem'

export class EventService extends EventDispatcher<EventListener> {

  constructor(
    private readonly target: Target,
    private readonly historyDispatcher: EventDispatcher<HistoryListener>,
  ) {
    super()
    this.setLoadEvent()
    this.setEyeDropperEvent()
  }

  private async setLoadEvent() {
    const webBridge: MessageSystem = await this.target.webBridgeLoaded
    webBridge.onMessage( 'load', () => {
      const event = new LoadEvent( this.target )
      this.dispatch( 'load', event )
    } )
  }

  private async setEyeDropperEvent() {
    const webBridge: MessageSystem = await this.target.webBridgeLoaded
    webBridge.onMessage( 'eye-dropper', ( args:unknown ) => {
      const { color } = args as { color:string }
      const event = new EyeDropperEvent( this.target, color )
      this.dispatch( 'eye-dropper', event )
    } )
  }

  override addEventListener<T extends EventType<EventListener>>( type:T, handler:EventHandler<T,EventListener> ) {
    if( type === 'history-move' ) {
      this.historyDispatcher.addEventListener( type, handler as any )  // eslint-disable-line
    }
    else {
      super.addEventListener( type, handler )
    }
  }

  override removeEventListener<T extends EventType<EventListener>>( type:T, handler:EventHandler<T,EventListener> ) {
    if( type === 'history-move' ) {
      this.historyDispatcher.removeEventListener( type, handler as any )  // eslint-disable-line
    }
    else {
      super.removeEventListener( type, handler )
    }
  }

}

interface Target extends IDraw {
  webBridgeLoaded: Promise<MessageSystem>
}
