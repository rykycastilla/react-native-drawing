import { Pointer } from '../models'
import { PointerEventEmitter, PointerEventHandler } from '../services'

export class DOMPointerEventEmitter implements PointerEventEmitter {

  private readonly currentPointersIndex = new Map<number,Pointer>()
  oninteract: PointerEventHandler | null = null
  onleave: PointerEventHandler | null = null

  constructor( element:HTMLElement ) {
    element.addEventListener( 'touchstart', ( event:TouchEvent ) => {
      this.dispatchInteractEvent( event )
    } )
    element.addEventListener( 'touchmove', ( event:TouchEvent ) => {
      this.dispatchInteractEvent( event )
    } )
    element.addEventListener( 'touchend', ( event:TouchEvent ) => {
      this.dispatchLeaveEvent( event )
    } )
    element.addEventListener( 'touchcancel', () => {
      this.leaveAll()
    } )
  }

  private dispatchInteractEvent( event:TouchEvent ) {
    const pointerList: Pointer[] = DOMPointerEventEmitter.createPointerEvent( event )
    for( const pointer of pointerList ) {
      this.currentPointersIndex.set( pointer.id, pointer )  // Handling pointers state
      // Ensuring handler is defined
      if( this.oninteract === null ) { continue }
      this.oninteract( pointer )
    }
  }

  /**
   * Accepts `TouchEvent` and `Pointer` to *leave* its targets dispatching a new event
   */
  private dispatchLeaveEvent( eventTarget:TouchEvent|Pointer ) {
    const pointerList: Pointer[] = eventTarget instanceof Pointer
      ? [ eventTarget ]
      : DOMPointerEventEmitter.createPointerEvent( eventTarget )
    for( const pointer of pointerList ) {
      this.currentPointersIndex.delete( pointer.id )  // Handling pointers state
      // Ensuring handler is defined
      if( this.onleave === null ) { continue }
      this.onleave( pointer )
    }
  }

  /**
   * Free all the pointers saved in the current state
   */
  private leaveAll() {
    this.currentPointersIndex.forEach( ( pointer:Pointer ) => {
      this.dispatchLeaveEvent( pointer )
    } )
  }

  private static createPointerEvent( event:TouchEvent ): Pointer[] {
    const pointerList: Pointer[] = []
    // Getting the bounding rectangle of the element
    const element = event.currentTarget as HTMLElement
    const rect = element.getBoundingClientRect()
    for( const touch of event.changedTouches ) {
      const { identifier, clientX, clientY } = touch
      // Calculate coordinates relative to the element
      // This is necessary to ensure that the coordinates are relative to the element, not the viewport
      const x = clientX - rect.left
      const y = clientY - rect.top
      const pointer = new Pointer( identifier, x, y )
      pointerList.push( pointer )
    }
    return pointerList
  }

}
