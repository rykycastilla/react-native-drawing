import { Touch } from '../../model'
import { TouchDetectedEvent } from './TouchDetectedEvent'
import { TouchEndEvent } from './TouchEndEvent'
import { TouchEvent } from './TouchEvent'

export abstract class TouchEventProcessor {

  private touchDetectedHandler: EventHandler<TouchDetectedEvent> | null = null
  private touchEndHandler: EventHandler<TouchEndEvent> | null = null

  public onTouchDetected( callback:EventHandler<TouchDetectedEvent> ) {
    this.touchDetectedHandler = callback
  }

  public onTouchEnd( callback:EventHandler<TouchEndEvent> ) {
    this.touchEndHandler = callback
  }

  protected triggerTouchDetectedEvent( touch:Touch ) {
    if( this.touchDetectedHandler === null ) { return }
    const { id, x, y } = touch
    const event = new TouchDetectedEvent( id, x, y )
    this.touchDetectedHandler( event )
  }

  protected triggerTouchEndEvent( touch:Touch ) {
    if( this.touchEndHandler === null ) { return }
    const event = new TouchEndEvent( touch.id )
    this.touchEndHandler( event )
  }

}

interface EventHandler<T extends TouchEvent> {
  ( event:T ): void
}
