export type Key<T extends object> = string & keyof T
export type Value<T extends object,U extends Key<T>> = T[ U ]
export type DataHandler<T extends object,U extends Key<T>> = ( data:Value<T,U> ) => Promise<void> | void

/**
 * @template { Object } T - sendData type-data index
 * @template { Object } U - onData type-event.data index
*/
export interface IProcess<T extends object,U extends object> {
  sendData<V extends Key<T>>( type:V, data:Value<T,V> ): Promise<void>
  onData<V extends Key<U>>( type:V, handle:DataHandler<U,V> ): void
  removeDataListener<V extends Key<U>>( type:V, handle:DataHandler<U,V> ): void
}
