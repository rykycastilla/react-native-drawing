import { ISyntheticTouch } from './ISyntheticTouch'
import { UnexpectedTouchError } from '../../errors'

export class SyntheticTouch implements ISyntheticTouch {

  private readonly id = Symbol()
  private isPressing = true
  private latestPixel: Pixel

  constructor(
    x:number, y:number,
    private readonly notifyTouch: NotifyTouchFunction,
  ) {
    this.latestPixel = { x, y }
    this.update( 'start' )
  }

  /**
   * Notify the current state of the touch
  */
  private update( type:TouchType ) {
    const { x, y } = this.latestPixel
    this.notifyTouch( type, x, y, this.id )
  }

  /**
   * @throws { UnexpectedTouchError } When the touch is not pressing
  */
  private checkValidTouch() {
    if( !this.isPressing ) {
      throw new UnexpectedTouchError()
    }
  }

  public moveTo( x:number, y:number ) {
    this.checkValidTouch()
    this.latestPixel = { x, y }
    this.update( 'move' )
  }

  public up() {
    this.checkValidTouch()
    this.isPressing = false
    this.update( 'end' )
  }

}

interface Pixel {
  x: number
  y: number
}

export type TouchType = 'start' | 'move' | 'end'

interface NotifyTouchFunction {
  ( type:TouchType, x:number, y:number, id:symbol ): void
}
