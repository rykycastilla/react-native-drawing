import { CursorStyle } from '@shared/modules/cursor/models'
import { Pointer } from '../models'

export interface CursorRenderer {

  style: CursorStyle
  cursorSize: number

  /**
   * Updates position or creates a visual element for the specified `pointer`
   * @param pointer
   */
  updateWith( pointer:Pointer ): void

  /**
   * Destroys the visual element for the specified `pointer`
   */
  destroyTo( pointer:Pointer ): void

  /**
   * Destroys all the visual elements (pointers)
   */
  clear(): void

  setStyle( style:CursorStyle ): void
  setCursorSize( size:number ): void

}
