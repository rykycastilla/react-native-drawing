// @ts-expect-error - JSDoc Type
import { UnexpectedTouchError } from '../../errors'  // eslint-disable-line

export interface ISyntheticTouch {

  /**
   * Creates a stroke from the latest point to the new coordinates.
   * The behavior of the rendering is gived by the current tool
   * @throws { UnexpectedTouchError }  Interaction was stoped
  */
  moveTo( x:number, y:number ): void

  /**
   * Stops interaction
   * @throws { UnexpectedTouchError }  Interaction was already stoped
  */
  up(): void

}
