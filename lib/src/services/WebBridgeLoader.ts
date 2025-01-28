import { MessageSystem } from '../shared/utils/MessageSystem'

/**
 * Allow to load in runtime a web bridge (Message System)
*/
export class WebBridgeLoader {

  /** A promise with the current web bridge when it is loaded */
  public readonly webBridgeLoaded: Promise<MessageSystem>

  private loaded = false
  private resolveWebBridge!: ( webBridge:MessageSystem ) => void

  /** A promise that occurs when the drawing core is loaded, giving its bridge */
  public readonly coreLoaded: Promise<MessageSystem>

  private resolveCore!: ( webBridge:MessageSystem ) => void

  constructor() {
    this.webBridgeLoaded = new Promise<MessageSystem>( ( resolve ) => {
      this.resolveWebBridge = resolve
    } )
    this.coreLoaded = new Promise<MessageSystem>( ( resolve ) => {
      this.resolveCore = resolve
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

  /**
   * Indicates drawing core was loaded
  */
  public async loadCore() {
    const webBridge: MessageSystem = await this.webBridgeLoaded
    this.resolveCore( webBridge )
  }

}
