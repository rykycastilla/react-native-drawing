import { MessageManager } from './MessageManager'

export class MessageSystem extends MessageManager {

  private receiveStructured: MessageReceiver | null = null
  private readonly sendEncodedMessage: MessageEmitter

  constructor(
    suscribe:MessageEventSuscriber, sendMessage:MessageEmitter,
    private readonly codec: Codec<MessageData>,
  ) {
    super(
      ( receive:MessageReceiver ) => this.suscribe( receive ),
      ( target:string, data:unknown ) => this.sendStructuredMessage( target, data ) )
    this.sendEncodedMessage = sendMessage
    suscribe( ( data:string ) => this.receiveEncoded( data ) )
  }

  private suscribe( receive:MessageReceiver ) {
    this.receiveStructured = receive
  }

  private receiveEncoded( encoded:string ) {
    const structuredData: MessageData | null = this.codec.toData( encoded )
    if( structuredData === null ) { return }
    if( this.receiveStructured === null ) { return }
    const { target, data } = structuredData
    this.receiveStructured( target, data )
  }

  private sendStructuredMessage( target:string, data:unknown ) {
    const structure: MessageData = { target, data }
    const encoded: string = this.codec.toJSON( structure )
    this.sendEncodedMessage( encoded )
  }

}

interface MessageReceiver {
  ( target: string, data:unknown ): void
}

interface MessageEmitter {
  ( data:string ): void
}

interface MessageEventSuscriber {
  ( receive:MessageEmitter ): void
}

interface Codec<T> {
  toData( data:string ): T | null
  toJSON( data:T ): string
}

export interface MessageData {
  target: string
  data: unknown
}
