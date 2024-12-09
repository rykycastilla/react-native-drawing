import { Controller, MessageEvent } from './Controller'
import { createToken } from './create_token'
import { DataHandler, IProcess, Key, Value } from './IProcess'

export abstract class GenericProcess<T extends object,U extends object> implements IProcess<T,U> {

  private readonly eventTargetList: DataEventTarget<U>[] = []
  private readonly receivedResolverIndex: Record<string,PromiseResolver<unknown>> = {}

  constructor(
    private readonly controller: ProcessController<T,U>,
  ) { this.buildListeners() }

  private handleReceived( id:string ) {
    const resolve: PromiseResolver<unknown> | undefined = this.receivedResolverIndex[ id ]
    if( resolve === undefined ) { return }
    resolve( undefined )
  }

  private buildListeners() {
    this.controller.addEventListener( 'message', async( event:MessageEvent<SharedData<U>> ) => {
      const receivedStruct: SharedData<U> = event.data
      if( receivedStruct instanceof Array ) { return this.handleReceived( ...receivedStruct ) }
      const { type, data, id } = receivedStruct
      for( const eventTarget of this.eventTargetList ) {
        if( type === eventTarget.type ) {
          this.controller.postMessage( [ id ] )  // Confirm data received
          GenericProcess.runHandler( eventTarget.handle, data )
        }
      }
    } )
  }

  public async sendData<V extends Key<T>>( type:V, data:Value<T,V> ) {
    const id: string = createToken( 20 )
    const receiveData = new Promise( ( resolve ) => this.receivedResolverIndex[ id ] = resolve )
    this.controller.postMessage( { type, data, id } )
    await receiveData
  }

  public onData<V extends Key<U>>( type:V, handle:DataHandler<U,V> ) {
    const event = { type, handle } as unknown as DataEventTarget<U>
    this.eventTargetList.push( event )
  }

  public removeDataListener<V extends Key<U>>( type:V, handle:DataHandler<U,V> ): void {
    for( let i = 0; i < this.eventTargetList.length; i++ ) {
      const eventTarget: DataEventTarget<U> = this.eventTargetList[ i ]!
      if( eventTarget.type !== type ) { continue }
      if( eventTarget.handle === handle ) {
        this.eventTargetList.splice( i, 1 )
        break
      }
    }
  }

  private static async runHandler<T extends object,U extends Key<T>>( handle:DataHandler<T,U>, data:Value<T,U> ) {
    try {
      await handle( data )
    }
    catch( e:unknown ) {
      if( typeof e !== 'object' ) { return }
      if( e === null ) { return }
      const { message } = e as { message:unknown }
      if( typeof message === 'string' ) { console.error( message ) }
    }
  }

}

type PromiseResolver<T> = ( value:T ) => void

interface SharedStruct<T extends object,U extends Key<T>> {
  type: U
  data: Value<T,U>
  id: string
}

type SharedData<T extends object> = SharedStruct<T,Key<T>> | [ string ]
type ProcessController<T extends object,U extends object> = Controller<SharedData<T>,SharedData<U>>

interface DataEventTarget<T extends object> {
  type: Key<T>
  handle: DataHandler<T,Key<T>>
}
