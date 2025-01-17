import { HistoryOutOfBoundsError } from '../../shared/modules/history/errors'
import { IWebDraw } from '../../shared/utils/types/IWebDraw'
import { MessageSystem } from '../../shared/utils/MessageSystem'
import { WebBridgeLoader } from './WebBridgeLoader'

export class WebDraw extends WebBridgeLoader implements IWebDraw {

  public async clear( color?:string ): Promise<void> {
    const webBridge: MessageSystem = await this.webBridgeLoaded
    await webBridge.postMessage( 'draw-clear', color ) as Promise<string>
  }

  public async getImage(): Promise<string> {
    const webBridge: MessageSystem = await this.webBridgeLoaded
    return webBridge.postMessage( 'draw-get-image', null ) as Promise<string>
  }

  public async setImage( image:string ): Promise<void> {
    const webBridge: MessageSystem = await this.webBridgeLoaded
    await webBridge.postMessage( 'draw-set-image', image )
  }

  /**
   * @throws { HistoryOutOfBoundsError }
  */
  public async undo() {
    const webBridge: MessageSystem = await this.webBridgeLoaded
    try { await webBridge.postMessage( 'draw-history-undo', null ) }
    catch { throw new HistoryOutOfBoundsError() }
  }

  /**
   * @throws { HistoryOutOfBoundsError }
  */
  public async redo() {
    const webBridge: MessageSystem = await this.webBridgeLoaded
    try { await webBridge.postMessage( 'draw-history-redo', null ) }
    catch { throw new HistoryOutOfBoundsError() }
  }

}
