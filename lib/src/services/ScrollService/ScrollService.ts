import { Draw } from '../../types/Draw'
import { EventDispatcher } from '../../utils/EventDispatcher'
import { ScrollEvent } from './ScrollEvent'
import { ScrollListener } from './ScrollListener'
import { View } from './View'

export class ScrollService extends EventDispatcher<ScrollListener> {

  #container: View

  constructor(
    private readonly target: Draw,
    container:View,
  ) {
    super()
    this.#container = container
  }

  /**
   * Calculates the value of 'axis' using the 'reference'
  */
  private fixPosition( axis:number, real:number, reference:number ): number {
    const result: number = axis / real * reference
    return Math.round( result )
  }

  /**
   * Calculates Scale
   * @returns  Scale with two significant numbers
  */
  private calcScale( container:number, view:number ) {
    const result: number = container / view
    return Math.round( result * 100 ) / 100
  }

  /**
   * Dispatch Scroll Event using the provided data
   * @param realContainer  Represents the real number (size) of pixeles in the view
   * @param view  Represents the size of the section showed in the view
   * @param x  Position of the showed view
   * @param y  Position of the showed view
   * @fires ScrollEvent
  */
  public dispatchScrollEvent( realContainer:View, view:View, x:number, y:number ) {
    // Calculating reference position
    const referenceX: number = this.fixPosition( x, realContainer.width, this.container.width )
    const referenceY: number = this.fixPosition( y, realContainer.height, this.container.height )
    // Calculating scale
    const scale: number = this.calcScale( realContainer.width, view.width )
    // Dispatchng event
    const event = new ScrollEvent( this.target, referenceX, referenceY, scale )
    this.dispatch( 'scroll', event )
  }

  get container(): View {
    return this.#container
  }

  public setContainer( container:View ) {
    this.#container = container
  }

}
