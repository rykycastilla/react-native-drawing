import { EventDispatcher, EventHandler, EventType } from '../../utils/EventDispatcher'
import { EventListener } from './EventListener'
import { EyeDropperEvent, FillingEvent, LoadEvent } from './_events'
import { HistoryListener } from './HistoryListener'
import { MessageSystem } from '../../shared/utils/MessageSystem'
import { ScrollListener } from '../ScrollService'

import { Draw } from '../../types/Draw'

export class EventService extends EventDispatcher<EventListener> {

  constructor(
    private readonly target: Draw,
    private readonly loader: Loader,
    private readonly historyDispatcher: EventDispatcher<HistoryListener>,
    private readonly scrollDispatcher: EventDispatcher<ScrollListener>,
  ) {
    super()
    this.setLoadEvent()
    this.setEyeDropperEvent()
    this.setFillingEvent()
  }

  private async setLoadEvent() {
    const webBridge: MessageSystem = await this.loader.webBridgeLoaded
    webBridge.onMessage( 'load', () => {
      const event = new LoadEvent( this.target )
      this.dispatch( 'load', event )
    } )
  }

  private async setEyeDropperEvent() {
    const webBridge: MessageSystem = await this.loader.webBridgeLoaded
    webBridge.onMessage( 'eye-dropper', ( args:unknown ) => {
      const { color } = args as { color:string }
      const event = new EyeDropperEvent( this.target, color )
      this.dispatch( 'eye-dropper', event )
    } )
  }

  private async setFillingEvent() {
    const webBridge: MessageSystem = await this.loader.webBridgeLoaded
    webBridge.onMessage( 'filling', ( args:unknown ) => {
      const {
        isStarting, x, y, color,
      } = args as { isStarting:boolean, x:number, y:number, color:string }
      const event = new FillingEvent( this.target, isStarting, x, y, color )
      this.dispatch( 'filling', event )
    } )
  }

  override addEventListener<T extends EventType<EventListener>>( type:T, handler:EventHandler<T,EventListener> ) {
    if( type === 'history-move' ) {
      this.historyDispatcher.addEventListener( type, handler as any )  // eslint-disable-line
    }
    else if( type === 'scroll' ) {
      this.scrollDispatcher.addEventListener( type, handler as any )  // eslint-disable-line
    }
    else {
      super.addEventListener( type, handler )
    }
  }

  override removeEventListener<T extends EventType<EventListener>>( type:T, handler:EventHandler<T,EventListener> ) {
    if( type === 'history-move' ) {
      this.historyDispatcher.removeEventListener( type, handler as any )  // eslint-disable-line
    }
    else if( type === 'scroll' ) {
      this.scrollDispatcher.removeEventListener( type, handler as any )  // eslint-disable-line
    }
    else {
      super.removeEventListener( type, handler )
    }
  }

}

interface Loader {
  webBridgeLoaded: Promise<MessageSystem>
}
