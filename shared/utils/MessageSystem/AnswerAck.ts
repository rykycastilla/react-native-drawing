import { Ack, AckInterface } from './Ack'
import { Codec } from './Codec'
import { SendDataFunction } from './SendDataFunction'
import { Status } from './Status'

export class AnswerAck extends Ack<AnswerArgs,unknown,'_ANSWER_'> {

  protected readonly token = '_ANSWER_'

  constructor( sendData:SendDataFunction ) {
    // Building default codec
    const codec = new Codec<AnswerArgs>( ( struct:object ) => {
      return AnswerAck.fixCodecStruct( struct )
    } )
    super( codec, sendData )
  }

  protected makeChoice( args:AnswerArgs, ackInterface:AckInterface<unknown> ) {
    const { res, status } = args
    if( status === Status.SUCCESS ) {
      ackInterface.resolve( res )
    }
    else {
      const err = new Error( res as string | undefined )
      ackInterface.reject( err )
    }
  }

  private static fixCodecStruct( struct:object ): AnswerArgs {
    const { id, res, status:unknownStatus } = struct as { id:unknown, res:unknown, status:unknown }
    let status: Status
    if( unknownStatus === Status.SUCCESS ) { status = Status.SUCCESS }
    else if( unknownStatus === Status.ERROR ) { status = Status.ERROR }
    else { status = Status.ERROR }
    return {
      id: ( typeof id === 'number' ) ? id : NaN,
      res, status,
    }
  }

}

interface AnswerArgs {
  id: number
  res: unknown
  status: Status
}
