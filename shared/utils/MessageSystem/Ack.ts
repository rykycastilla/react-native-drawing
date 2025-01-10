import { Codec } from './Codec'
import { SendDataFunction } from './SendDataFunction'

/**
 * A bidirectional manager for Acknowledgement messages
 * An ACK is an special message that is provided by other process to indicate an specific status
 * @template T - ArgsDTO
 * @template U - ResolverData
 * @template V - Token
*/
export abstract class Ack<T extends Args,U,V extends string> {

  protected abstract token: V
  private interfaceIndex: Record<number,AckInterface<U>> = {}

  constructor(
    private readonly codec: Codec<T>,
    private readonly sendData: SendDataFunction,
  ) {}

  /**
   * Uses args to make a choice (resolve or reject ack promise using its interface)
  */
  protected abstract makeChoice( args:T, ackInterface:AckInterface<U> ): void

  /**
   * Verify if the provided data has the strcuture to be shared by the instance
  */
  public checkData( data:string ): data is EncodedData<V> {
    return data.startsWith( this.token )
  }

  /**
   * Creates an ACK promise (resolved by another process)
   * @param id - Used to identify the ACK message
   * (supporting multiple messages at the same time).
   * This must be sended by any way to the other process,
   * to be sended back with the ack completion (like a calback)
  */
  public activate( id:number ): Promise<U> {
    // Creating interface
    let ackInterface!: AckInterface<U>
    const ackResolved = new Promise<U>( ( resolve, reject ) => {
      ackInterface = { resolve, reject }
    } )
    // Storing interface
    this.interfaceIndex[ id ] = ackInterface
    return ackResolved  // Exposing promise
  }

  /**
   * Reestructures the message data and resolves its ACK (data received by another process)
  */
  public receive( encodedData:EncodedData<V> ) {
    // Building DTO
    const validEncodedData: string = encodedData.replace( this.token, '' )  // Removing token from data
    const data: T = this.codec.toData( validEncodedData )
    const { id } = data
    // Getting message resolver interface
    const ackInterface: AckInterface<U> | undefined = this.interfaceIndex[ id ]
    if( ackInterface === undefined ) { return }
    delete this.interfaceIndex[ id ]
    this.makeChoice( data, ackInterface )
  }

  /**
   * Send the Ack to another process, it only should be received for a manager with the same structure of that (bidirectional)
  */
  public send( args:T ) {
    const encodedData: string = this.codec.toJSON( args )
    this.sendData( this.token + encodedData )  // Sending with token
  }

}

type EncodedData<T extends string> = `${ T }${ string }`

interface Args {
  id: number
}

/**
 * Represents the setter for the final status of the message
*/
export interface AckInterface<T> {
  resolve( data:T ): void
  reject( err:Error ): void
}
