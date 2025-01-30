import { FpsStateManager } from './FpsStateManager'
import { History } from '../History'
import { IDrawCore } from '../../shared/utils/types/IDrawCore'
import { MessageSystem } from '../../shared/utils/MessageSystem'

// @ts-expect-error - JSDoc Type
import { HistoryOutOfBoundsError } from '../../shared/modules/history/errors'  // eslint-disable-line

export class DrawCore implements IDrawCore {

  private readonly fpsStateManager = new FpsStateManager()

  constructor(
    private readonly loader: Loader,
    private readonly history: History,
  ) { this.setFpsEvent() }

  public async clear( color?:string ): Promise<void> {
    const webBridge: MessageSystem = await this.loader.coreLoaded
    await webBridge.postMessage( 'draw-clear', color ) as Promise<string>
  }

  public async getImage(): Promise<string> {
    const webBridge: MessageSystem = await this.loader.coreLoaded
    return webBridge.postMessage( 'draw-get-image', null ) as Promise<string>
  }

  public async setImage( image:string ): Promise<void> {
    const webBridge: MessageSystem = await this.loader.coreLoaded
    await webBridge.postMessage( 'draw-set-image', image )
  }

  public async undo() {
    await this.history.undo()
  }

  public async redo() {
    await this.history.redo()
  }

  private async setFpsEvent() {
    const webBridge: MessageSystem = await this.loader.webBridgeLoaded
    webBridge.onMessage( 'fps-report', ( args:unknown ) => {
      const { fps } = args as { fps:number }
      this.fpsStateManager.setFps( fps )
    } )
  }

}

interface Loader {
  webBridgeLoaded: Promise<MessageSystem>
  coreLoaded: Promise<MessageSystem>
}
