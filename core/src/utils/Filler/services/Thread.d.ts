export interface Thread<T extends object,U extends object> {
  postMessage( data:T, transferable:[ ArrayBuffer ] ): void
  addEventListener( type:'message', handle:MessageHandler<U> ): void
}

interface MessageEvent<T extends object> {
  data: T
}

interface MessageHandler<T extends object> {
  ( event:MessageEvent<T> ): void
}
