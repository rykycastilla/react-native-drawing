import { Ack, AckInterface } from './Ack'
import { Codec } from './Codec'
import { SendDataFunction } from './SendDataFunction'

export class ReceivedAck extends Ack<ReceivedArgs,void,'_RECEIVED_'> {

  protected readonly token = '_RECEIVED_'

  constructor( sendData:SendDataFunction ) {
    // Building default codec
    const codec = new Codec<ReceivedArgs>( ( struct:object ) => {
      return ReceivedAck.fixCodecStruct( struct )
    } )
    super( codec, sendData )
  }

  protected makeChoice( args:ReceivedArgs, ackInterface:AckInterface<void> ) {
    args
    ackInterface.resolve()
  }

  private static fixCodecStruct( struct:object ): ReceivedArgs {
    const { id } = struct as { id:unknown }
    return {
      id: ( typeof id === 'number' ) ? id : NaN,
    }
  }

}

interface ReceivedArgs {
  id: number
}
