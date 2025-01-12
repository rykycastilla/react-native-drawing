import { IDraw } from '../../shared/utils/types/IDraw'
import { MessageSystem } from '../../shared/utils/MessageSystem'
import { WebBridgeLoader } from './WebBridgeLoader'

export class Draw extends WebBridgeLoader implements IDraw {

  public async getImage(): Promise<string> {
    const webBridge: MessageSystem = await this.webBridgeLoaded
    return webBridge.postMessage( 'draw-get-image', null ) as Promise<string>
  }

  public async setImage( image:string ): Promise<void> {
    const webBridge: MessageSystem = await this.webBridgeLoaded
    return webBridge.postMessage( 'draw-set-image', image ) as Promise<void>
  }

}
