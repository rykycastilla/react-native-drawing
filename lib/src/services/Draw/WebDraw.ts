import { History } from '../History'
import { IWebDraw } from '../../shared/utils/types/IWebDraw'
import { MessageSystem } from '../../shared/utils/MessageSystem'
import { WebBridgeLoader } from './WebBridgeLoader'

// @ts-expect-error - JSDoc Type
import { HistoryOutOfBoundsError } from '../../shared/modules/history/errors'  // eslint-disable-line

export class WebDraw extends WebBridgeLoader implements IWebDraw {

  private history: History | null = null

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

  public async undo() {
    await this.history?.undo()
  }

  public async redo() {
    await this.history?.redo()
  }

  public setHistory( history:History ) {
    this.history = history
  }

}
