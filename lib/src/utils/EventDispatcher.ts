/**
 * Contains methods to handle events, to create and port custom events APIs
*/
export abstract class EventDispatcher<T extends EventListener<string,object>> {

  private readonly eventListenerList: T[] = []

  /**
   * Dispatches evnts with the specified type.
   * This action only should be used inside event manager objects, when the custom action (the event)
   * should occurs
  */
  protected dispatch<U extends EventType<T>>( type:U, event:Event<U,T> ) {
    for( const listener of this.eventListenerList ) {
      if( type === listener.type ) { listener.handle( event ) }
    }
  }

  /**
   * Appends an event listener for events whose type attribute
   * value is type. The callback argument sets the handler that
   * will be invoked when the event is dispatched.
  */
  public addEventListener<U extends EventType<T>>( type:U, handler:EventHandler<U,T> ) {
    const listener = { type, handle:handler } as unknown as T
    this.eventListenerList.push( listener )
  }

  /**
   * Removes the event listener in target's event listener list with the same type and callback
  */
  public removeEventListener<U extends EventType<T>>( type:U, handler:EventHandler<U,T> ) {
    for( let i = 0; i < this.eventListenerList.length; i++ ) {
      const listener: T = this.eventListenerList[ i ]!
      if( ( type === listener.type ) && ( handler === listener.handle ) ) {
        this.eventListenerList.splice( i, 1 )
        i--
      }
    }
  }

}

interface EventListener<T extends string,U extends object> {
  type: T
  handle( event:U ): Promise<void> | void
}

export type EventType<T extends EventListener<string,object>> =
  T extends EventListener<infer U,object> ? U : never

type Event<T extends string,U extends EventListener<string,object>> =
  U extends EventListener<T,infer V> ? V : never

type Handler<T extends object> = ( event:T ) => Promise<void> | void

export type EventHandler<T extends string,U extends EventListener<string,object>> =
  U extends EventListener<T,infer V> ? Handler<V> : never
