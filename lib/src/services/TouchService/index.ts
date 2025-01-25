import { MessageSystem } from '../../shared/utils/MessageSystem'
import { SymbolParser } from '../../shared/utils/SymbolParser'
import { SyntheticTouch, TouchType } from './SyntheticTouch'

export class TouchService {

  private readonly symbolParser = new SymbolParser()

  constructor(
    private readonly getCoreLoaded: WebBridgeLoadedGetter,
  ) {}

  /**
   * Notify touch actions to 'core side'
  */
  private async notifyTouch( type:TouchType, x:number, y:number, id:symbol ) {
    const webBridge: MessageSystem = await this.coreloaded
    const parsedId: number = this.symbolParser.toId( id )
    webBridge.postMessage( 'draw-touch', { type, x, y, parsedId } )
  }

  /**
   * Simulates a drawing touch imperatively
   * @param method  'keep' value indicates that the touch object can be used to draw
   * @returns  A touch object to draw with it (only with 'kepp' value in method)
   */
  public async touch( x:number, y:number, method?:'keep' ): Promise<SyntheticTouch|void> {
    await this.coreloaded
    const touch = new SyntheticTouch( x, y, ( ...args ) => {
      this.notifyTouch( ...args )
    } )
    if( method === 'keep' ) {
      return touch
    }
    else {
      touch.up()
    }
  }

  private get coreloaded(): Promise<MessageSystem> {
    return this.getCoreLoaded()
  }

}

interface WebBridgeLoadedGetter {
  (): Promise<MessageSystem>
}

export { SyntheticTouch }
export type * from './ISyntheticTouch'
