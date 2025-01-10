import { AnswerAck } from './AnswerAck'
import { Codec } from './Codec'
import { MessageEventSuscriber, Receiver } from './Receiver'
import { MessageDTO } from './MessageDTO'
import { MessageHandler } from './MessageEventDispatcher'
import { ReceivedAck } from './ReceivedAck'
import { SendDataFunction } from './SendDataFunction'
import { Sender } from './Sender'

export class MessageSystem {

  private readonly sender: Sender
  private readonly receiver: Receiver

  constructor( suscribe:MessageEventSuscriber, sendData:SendDataFunction ) {
    // Building codec
    const codec = new Codec<MessageDTO>( ( struct:object ) => {
      return MessageSystem.fixCodecStruct( struct )
    } )
    // Building ACKs
    const receivedAck = new ReceivedAck( sendData )
    const answerAck = new AnswerAck( sendData )
    // Creating dependencies (both sides of Message System)
    this.sender = new Sender( codec, receivedAck, answerAck, sendData )
    this.receiver = new Receiver( codec, receivedAck, answerAck, suscribe )
  }

  /**
   * Send messages to the other side (ReactNative/WebView) and get back an answer
  */
  public postMessage( target:string, data:unknown ): Promise<unknown> {
    return this.sender.postMessage( target, data )
  }

  /**
   * Listen messages from the other side (ReactNative/WebView)
  */
  public onMessage( target:string, handle:MessageHandler ) {
    this.receiver.onMessage( target, handle )
  }

  private static fixCodecStruct( struct:object ): MessageDTO {
    const { id, target, arg } = struct as { id:unknown, target:unknown, arg:unknown }
    return {
      id: ( typeof id === 'number' ) ? id : NaN,
      target: ( typeof target === 'string' ) ? target : '',
      arg,
    }
  }

}
