/**
 * Abstract class with the base infraestructure to manage Message Events
*/
export abstract class MessageEventDispatcher {

  private readonly messageEventIndex: Record<string,MessageHandler> = {}

  /**
   * Launch events with the specified target
   * @param arg - data to be received by the event
  */
  protected async dispatchMessage( target:string, arg:unknown ): Promise<unknown> {
    const handle: MessageHandler | undefined = this.messageEventIndex[ target ]
    if( handle === undefined ) { return }
    return handle( arg )
  }

  /**
   * Save handlers in the event index (for the specific target)
  */
  public onMessage( target:string, callback:MessageHandler ) {
    this.messageEventIndex[ target ] = callback
  }

}

export interface MessageHandler {
  ( arg:unknown ): unknown
}
