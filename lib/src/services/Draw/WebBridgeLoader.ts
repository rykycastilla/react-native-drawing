import { MessageSystem } from '../../shared/utils/MessageSystem'

/**
 * Allow to load in runtime a web bridge (Message System)
*/
export class WebBridgeLoader {

  private loaded = false
  private resolveWebBridge!: ( webBridge:MessageSystem ) => void
  #webBridgeLoaded: Promise<MessageSystem>

  constructor() {
    this.#webBridgeLoaded = new Promise<MessageSystem>( ( resolve ) => {
      this.resolveWebBridge = resolve
    } )
  }

  /**
   * Load in runtime a web bridge (only one time)
  */
  public loadWebBridge( webBridge:MessageSystem ) {
    if( this.loaded ) { return }
    this.resolveWebBridge( webBridge )
    this.loaded = true
  }

  /** A promise with the current web bridge when it is loaded */
  get webBridgeLoaded(): Promise<MessageSystem> {
    return this.#webBridgeLoaded
  }

}
