import { Pointer } from '../models'
import { PointerEventEmitter, PointerEventHandler } from '../services'

export class DOMPointerEventEmitter implements PointerEventEmitter {

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
    element.addEventListener( 'touchcancel', ( event:TouchEvent ) => {
      this.dispatchLeaveEvent( event )
    } )
  }

  private dispatchInteractEvent( event:TouchEvent ) {
    const pointerList: Pointer[] = DOMPointerEventEmitter.createPointerEvent( event )
    if( this.oninteract === null ) { return }
    for( const pointer of pointerList ) {
      this.oninteract( pointer )
    }
  }

  private dispatchLeaveEvent( event:TouchEvent ) {
    const pointerList: Pointer[] = DOMPointerEventEmitter.createPointerEvent( event )
    if( this.onleave === null ) { return }
    for( const pointer of pointerList ) {
      this.onleave( pointer )
    }
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
