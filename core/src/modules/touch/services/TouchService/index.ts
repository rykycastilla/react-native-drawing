import { Touch } from '../../models'
import { TouchEventProcessor } from './TouchEventProcessor'

export class TouchService extends TouchEventProcessor {

  private readonly touchIndex: Record<number,Touch> = {}

  public start( index:number, x:number, y:number, width:number, height:number ) {
    const minProgress: number = Touch.calcMinProgress( width, height )
    const touch = new Touch( x, y, minProgress )
    this.touchIndex[ index ] = touch
    this.triggerTouchDetectedEvent( touch )
  }

  public move( index:number, x:number, y:number ) {
    const touch: Touch | undefined = this.touchIndex[ index ]
    if( touch === undefined ) { return }
    const moved: boolean = touch.setPosition( x, y )
    if( moved ) { this.triggerTouchDetectedEvent( touch ) }
  }

  public end( index:number ) {
    const touch: Touch | undefined = this.touchIndex[ index ]
    if( touch === undefined ) { return }
    delete this.touchIndex[ index ]
    this.triggerTouchEndEvent( touch )
  }

}

export * from './DrawTouchEvent'
