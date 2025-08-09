import { CSSCursorStyleManager } from './CSSCursorStyleManager'
import { CursorRenderer } from '../services'
import { CursorStyle } from '@shared/modules/cursor/models'
import { Pointer } from '../models'
import { PropertyValueTransformer } from '@utils/PropertyValueTransformer'

/**
 * An utility to creates pointers in a DOM Element
 */
export class HTMLCursorRenderer extends CSSCursorStyleManager implements CursorRenderer {

  private static POINTER_CLASS_NAME = 'cursor-pointer'
  #cursorSize!: number

  /**
   * `element` will use `'relative'` position instead of `'static'`, to allow absolute positioning of pointers
   * @param cursorSize
   * @param element
   */
  constructor( cursorSize:number, style:CursorStyle, element:HTMLElement, pixelsParser:PropertyValueTransformer ) {
    super( style, element, pixelsParser )
    element.style.position = 'relative'
    this.setCursorSize( cursorSize )
    this.setupElementPos()
  }

  /**
   * Prepares renderer element `position` to contain pointers.
   * Using `'relative'` instead of `'static'`, to allow absolute positioning of pointers
   */
  private setupElementPos() {
    const { position } = this.element.style
    if( position === 'static' ) { this.element.style.position = 'relative' }
  }

  private createPointer( pointer:Pointer ) {
    const id: string = HTMLCursorRenderer.genPointerId( pointer )
    const pointerElement: HTMLElement = document.createElement( 'div' )
    pointerElement.id = id
    pointerElement.classList.add( HTMLCursorRenderer.POINTER_CLASS_NAME )
    HTMLCursorRenderer.assignPointerPos( pointerElement, pointer )
    this.element.appendChild( pointerElement )
  }

  private findPointer( pointer:Pointer ): HTMLElement | null {
    const id: string = HTMLCursorRenderer.genPointerId( pointer )
    return this.element.querySelector( `#${ id }` )
  }

  public updateWith( pointer:Pointer ) {
    const pointerElement: HTMLElement | null = this.findPointer( pointer )
    // Updating pos or creating (if it doesn't exist)
    if( pointerElement === null ) { this.createPointer( pointer ) }
    else { HTMLCursorRenderer.assignPointerPos( pointerElement, pointer ) }
  }

  public destroyTo( pointer:Pointer ) {
    const pointerElement: HTMLElement | null = this.findPointer( pointer )
    if( pointerElement === null ) { return }
    this.element.removeChild( pointerElement )
  }

  public clear() {
    const { POINTER_CLASS_NAME } = HTMLCursorRenderer
    const pointerElementList: NodeListOf<Element> = this.element.querySelectorAll( `.${ POINTER_CLASS_NAME }` )
    for( const pointerElement of pointerElementList ) {
      this.element.removeChild( pointerElement )
    }
  }

  get cursorSize(): number {
    return this.#cursorSize
  }

  public setCursorSize( cursorSize:number ) {
    this.#cursorSize = cursorSize
    this.element.style.setProperty( '--cursor-size', `${ cursorSize }px` )
  }

  private static genPointerId( pointer:Pointer ): string {
    const { id } = pointer
    return `pointer-${ id }`
  }

  private static assignPointerPos( pointerElement:HTMLElement, pointer:Pointer ) {
    const { x, y } = pointer
    pointerElement.style.top = `${ y }px`
    pointerElement.style.left = `${ x }px`
  }

}
