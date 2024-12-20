import { Touch } from '../../models'
import { DrawTouchEvent } from './DrawTouchEvent'

export abstract class TouchEventProcessor {

  private touchDetectedHandler: EventHandler | null = null
  private touchEndHandler: EventHandler | null = null

  public onTouchDetected( callback:EventHandler ) {
    this.touchDetectedHandler = callback
  }

  public onTouchEnd( callback:EventHandler ) {
    this.touchEndHandler = callback
  }

  protected triggerTouchDetectedEvent( touch:Touch ) {
    if( this.touchDetectedHandler === null ) { return }
    const { id, x, y } = touch
    const event = new DrawTouchEvent( id, x, y )
    this.touchDetectedHandler( event )
  }

  protected triggerTouchEndEvent( touch:Touch ) {
    if( this.touchEndHandler === null ) { return }
    const { id, x, y } = touch
    const event = new DrawTouchEvent( id, x, y )
    this.touchEndHandler( event )
  }

}

interface EventHandler {
  ( event:DrawTouchEvent ): void
}
