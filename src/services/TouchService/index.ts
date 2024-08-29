import { Touch } from '../../model'
import { TouchEventProcessor } from './TouchEventProcessor'

export class TouchService extends TouchEventProcessor {

  private readonly touchIndex: Record<string,Touch> = {}

  public start( identifier:string, x:number, y:number ) {
    const touch = new Touch( x, y )
    this.touchIndex[ identifier ] = touch
    this.triggerTouchDetectedEvent( touch )
  }

  public move( index:string, x:number, y:number ) {
    const touch: Touch | undefined = this.touchIndex[ index ]
    if( touch === undefined ) { return }
    touch.setPosition( x, y )
    this.triggerTouchDetectedEvent( touch )
  }

  public end( identifier:string ) {
    const touch: Touch | undefined = this.touchIndex[ identifier ]
    if( touch === undefined ) { return }
    delete this.touchIndex[ identifier ]
    this.triggerTouchEndEvent( touch )
  }

}

export * from './TouchDetectedEvent'
export * from './TouchEndEvent'
