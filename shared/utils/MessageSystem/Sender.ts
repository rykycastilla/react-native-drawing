import { AnswerAck } from './AnswerAck'
import { Codec } from './Codec'
import { MessageDTO } from './MessageDTO'
import { ReceivedAck } from './ReceivedAck'
import { SendDataFunction } from './SendDataFunction'

/**
 * Data sender side of a message system
*/
export class Sender {

  private messageId = 0
  private latestMessageReceived: Promise<void> | null = null

  constructor(
    private readonly codec: Codec<MessageDTO>,
    private readonly receivedAck: ReceivedAck,
    private readonly answerAck: AnswerAck,
    private readonly sendData: SendDataFunction,
  ) {}

  /**
   * Creates ACK promises to get shared data with the current process
   * while the message is being processed
   * @returns - [ message-received (ACK Promise), message-answer (ACK Promise), id (to identify responses) ]
  */
  private createAckInterfaces(): [ Promise<void>, Promise<unknown>, number ] {
    const id: number = this.messageId++
    const received: Promise<void> = this.receivedAck.activate( id )
    const messageAnswer: Promise<unknown> = this.answerAck.activate( id )
    return [ received, messageAnswer, id ]
  }

  /**
   * Send messages to another process and get back information (answer)
   * @param target - Type of the message
   * @param data - Args sahred to the other process
   * @returns - Answer Promise
  */
  public async postMessage( target:string, data:unknown ): Promise<unknown> {
    // Creating ACKs to check status
    const { latestMessageReceived } = this
    const [ currentMessageReceived, messageAnswer, id ] = this.createAckInterfaces()
    // Queuing the received promise (waiting for the latest resolution to respect sending order)
    this.latestMessageReceived = currentMessageReceived
    if( latestMessageReceived !== null ) { await latestMessageReceived }
    // Sending message
    const message: MessageDTO = { id, target, arg:data }
    const encodedData: string = this.codec.toJSON( message )
    this.sendData( encodedData )
    return messageAnswer
  }

}
