import { MessageEmitter, MessageSender } from './MessageSender'

export abstract class MessageManager extends MessageSender {

  private readonly eventIndex: Record<string,MessageCallback> = {}

  constructor( suscribe:MessageEventSuscriber, sendMessage:MessageEmitter ) {
    super( sendMessage )
    suscribe( ( target:string, data:unknown ) => {
      this.receive( target, data )
    } )
  }

  private receive( target:string, data:unknown ) {
    const messageCallback: MessageCallback | undefined = this.eventIndex[ target ]
    if( messageCallback === undefined ) { return }
    messageCallback( data )
  }

  public onMessage( target:string, callback:MessageCallback ) {
    this.eventIndex[ target ] = callback
  }

}

interface MessageCallback {
  ( data:unknown ): void
}

interface MessageEventSuscriber {
  ( receive:MessageEmitter ): void
}
