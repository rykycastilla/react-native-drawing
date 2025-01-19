import { EventDispatcher } from '../../utils/EventDispatcher'
import { HistoryEvent } from './HistoryEvent'
import { HistoryOutOfBoundsError } from '../../shared/modules/history/errors'
import { IDraw } from './IDraw'
import { MessageSystem } from '../../shared/utils/MessageSystem'
import { Ref } from '../../utils/Ref'

export class History extends EventDispatcher<HistoryListener> {

  constructor(
    private readonly targetRef: TargetRef,
  ) {
    super()
    setTimeout( () => this.setHistoryMoveEvent(), 1 )
  }

  private async setHistoryMoveEvent() {
    const target: Target = this.targetRef.current!
    const webBridge: MessageSystem = await target.webBridgeLoaded
    webBridge.onMessage( 'draw-history-move', ( args:unknown ) => {
      const { canUndo, canRedo } = args as { canUndo:boolean, canRedo:boolean }
      const event = new HistoryEvent( target, canUndo, canRedo )
      this.dispatch( 'history-move', event )
    } )
  }

  /**
    * @throws { HistoryOutOfBoundsError }
  */
  public async undo() {
    const webBridge: MessageSystem = await this.target.webBridgeLoaded
    try { await webBridge.postMessage( 'draw-history-undo', null ) }
    catch { throw new HistoryOutOfBoundsError() }
  }

  /**
   * @throws { HistoryOutOfBoundsError }
  */
  public async redo() {
    const webBridge: MessageSystem = await this.target.webBridgeLoaded
    try { await webBridge.postMessage( 'draw-history-redo', null ) }
    catch { throw new HistoryOutOfBoundsError() }
  }

  get target(): Target {
    return this.targetRef.current!
  }

}

interface HistoryListener {
  type: 'history-move'
  handle( event:HistoryEvent ): Promise<void> | void
}

interface Target extends IDraw {
  webBridgeLoaded: Promise<MessageSystem>
}

export type TargetRef = Ref<Target|null>
