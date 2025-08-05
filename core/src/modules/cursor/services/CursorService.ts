import { CursorRenderer } from './CursorRenderer'
import { Pointer } from '../models'
import { PointerEventEmitter } from './PointerEventEmitter'

export class CursorService {

  #isAvailable: boolean

  constructor(
    isAvailable:boolean,
    private readonly pointerEventEmitter: PointerEventEmitter,
    private readonly cursorRenderer: CursorRenderer,
  ) {
    this.#isAvailable = isAvailable
    this.setupEventListener()
  }

  private setupEventListener() {
    this.pointerEventEmitter.oninteract = ( pointer:Pointer ) => {
      if( !this.isAvailable ) { return }  // Avoiding pointers creation
      this.cursorRenderer.updateWith( pointer )
    }
    this.pointerEventEmitter.onleave = ( pointer:Pointer ) => {
      if( !this.isAvailable ) { return }  // Avoiding pointers creation
      this.cursorRenderer.destroyTo( pointer )
    }
  }

  /**
   * Free event listeners to prepare the object to be deleted.
   * This action makes the object unusable, be careful.
   */
  public destroy() {
    this.pointerEventEmitter.oninteract = null
    this.pointerEventEmitter.onleave = null
  }

  /**
   * Indicates cursor is showing in display
   */
  get isAvailable(): boolean {
    return this.#isAvailable
  }

  /**
   * Indicates cursor size
   */
  get size(): number {
    return this.cursorRenderer.cursorSize
  }

  public setIsAvailable( isAvailable:boolean ) {
    this.#isAvailable = isAvailable
    if( !isAvailable ) { this.cursorRenderer.clear() }  // Disabling active pointers rendering
  }

  /**
   * Changes the size
   * @param size - The new size of the cursor. Allowed css pixels values
   */
  public setSize( size:number ) {
    this.cursorRenderer.setCursorSize( size )
  }

}
