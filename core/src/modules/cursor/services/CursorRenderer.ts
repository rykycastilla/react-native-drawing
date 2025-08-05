import { Pointer } from '../models'

export interface CursorRenderer {

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

  setCursorSize( size:number ): void

}
