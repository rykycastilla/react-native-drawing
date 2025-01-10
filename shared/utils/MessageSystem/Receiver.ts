import { AnswerAck } from './AnswerAck'
import { Codec } from './Codec'
import { MessageEventDispatcher } from './MessageEventDispatcher'
import { MessageDTO } from './MessageDTO'
import { ReceivedAck } from './ReceivedAck'
import { SendDataFunction } from './SendDataFunction'
import { Status } from './Status'

export class Receiver extends MessageEventDispatcher {

  constructor(
    private readonly codec: Codec<MessageDTO>,
    private readonly receivedAck: ReceivedAck,
    private readonly answerAck: AnswerAck,
    suscribe:MessageEventSuscriber,
  ) {
    super()
    suscribe( ( data:string ) => this.receive( data ) )
  }

  /**
   * Used to decode and manage information of the regular messages
  */
  private receiveStandardMessage( encodedData:string ) {
    const { id, target, arg } = this.codec.toData( encodedData )
    this.receivedAck.send( { id } )
    const task: Promise<unknown> = this.dispatchMessage( target, arg )
    task.then( ( res:unknown ) => {
      this.answerAck.send( { status:Status.SUCCESS, id, res } )
    } )
    task.catch( ( err:unknown ) => {
      const { message } = err as { message:unknown }
      const errMessage: string | undefined = ( typeof message === 'string' )
        ? message
        : undefined
      this.answerAck.send( { status:Status.ERROR, id, res:errMessage } )
    } )
  }

  /**
   * General receiver: filtering the specificed ACK chanels or regular messages
  */
  private receive( encodedData:string ) {
    if( this.receivedAck.checkData( encodedData ) ) {
      encodedData
      this.receivedAck.receive( encodedData )
      return
    }
    if( this.answerAck.checkData( encodedData ) ) {
      this.answerAck.receive( encodedData )
      return
    }
    this.receiveStandardMessage( encodedData )
  }

}

export interface MessageEventSuscriber {
  ( receive:SendDataFunction ): void
}
