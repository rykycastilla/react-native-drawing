import { Draw } from '../../types/Draw'
import { View } from './View'

export class ScrollEvent {

  public readonly view: View

  constructor(
    public readonly target: Draw,
    public readonly x: number,
    public readonly y: number,
    public readonly scale: number,
  ) { this.view = ScrollEvent.calcView( target, scale ) }

  /**
   * Calculates the curret view dimensions (inside of the content), when you are scrolling or zooming
  */
  private static calcView( target:Draw, scale:number ): View {
    const width: number = ScrollEvent.calcViewSide( target.width, scale )
    const height: number = ScrollEvent.calcViewSide( target.height, scale )
    return { width, height }
  }

  /**
   * Calculates a single side of the curret view area of the content, when you are scrolling or zooming
  */
  private static calcViewSide( side:number, scale:number ): number {
    return Math.round( side / scale )
  }

}
