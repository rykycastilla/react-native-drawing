import { Touch } from '../../models'
import { TouchEventProcessor } from './TouchEventProcessor'

export class TouchService extends TouchEventProcessor {

  private readonly touchIndex: Record<number,Touch> = {}

  public start( index:number, x:number, y:number ) {
    const touch = new Touch( x, y )
    this.touchIndex[ index ] = touch
    this.triggerTouchDetectedEvent( touch )
  }

  public move( index:number, x:number, y:number ) {
    const touch: Touch | undefined = this.touchIndex[ index ]
    if( touch === undefined ) { return }
    touch.setPosition( x, y )
    this.triggerTouchDetectedEvent( touch )
  }

  public end( index:number ) {
    const touch: Touch | undefined = this.touchIndex[ index ]
    if( touch === undefined ) { return }
    delete this.touchIndex[ index ]
    this.triggerTouchEndEvent( touch )
  }

}

export * from './DrawTouchEvent'
