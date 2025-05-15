import { EventDispatcher } from '../../utils/EventDispatcher'
import { HistoryEvent } from './HistoryEvent'
import { HistoryOutOfBoundsError } from '../../shared/modules/history/errors'
import { Draw } from '../../types/Draw'
import { MessageSystem } from '../../shared/utils/MessageSystem'

export class History extends EventDispatcher<HistoryListener> {

  constructor(
    private readonly target: Draw,
    private readonly loader: Loader,
  ) {
    super()
    this.setHistoryMoveEvent()
  }

  private async setHistoryMoveEvent() {
    const webBridge: MessageSystem = await this.loader.webBridgeLoaded
    webBridge.onMessage( 'draw-history-move', ( args:unknown ) => {
      const { canUndo, canRedo } = args as { canUndo:boolean, canRedo:boolean }
      const event = new HistoryEvent( this.target, canUndo, canRedo )
      this.dispatch( 'history-move', event )
    } )
  }

  /**
    * @throws { HistoryOutOfBoundsError }
  */
  public async undo() {
    const webBridge: MessageSystem = await this.loader.coreLoaded
    try { await webBridge.postMessage( 'draw-history-undo', null ) }
    catch { throw new HistoryOutOfBoundsError() }
  }

  /**
   * @throws { HistoryOutOfBoundsError }
  */
  public async redo() {
    const webBridge: MessageSystem = await this.loader.coreLoaded
    try { await webBridge.postMessage( 'draw-history-redo', null ) }
    catch { throw new HistoryOutOfBoundsError() }
  }

}

interface HistoryListener {
  type: 'history-move'
  handle( event:HistoryEvent ): Promise<void> | void
}

interface Loader {
  webBridgeLoaded: Promise<MessageSystem>
  coreLoaded: Promise<MessageSystem>
}
