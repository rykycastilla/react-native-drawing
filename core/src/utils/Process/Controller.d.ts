export interface MessageEvent<T> {
  data: T
}

interface MessageHandler<T> {
  ( event:MessageEvent<T> ): Promise<void> | void
}

/**
 * @template T - Send data
 * @template U - Received data
*/
export interface Controller<T,U> {
  postMessage( data:T ): void
  addEventListener( type:'message', handle:MessageHandler<U> ): void
}
