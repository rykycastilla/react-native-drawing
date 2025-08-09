import { CursorService } from '../services'
import { CursorStyle } from '@shared/modules/cursor/models'
import { DOMPointerEventEmitter } from './DOMPointerEventEmitter'
import { HTMLCursorRenderer } from './HTMLCursorRenderer'
import { PropertyValueTransformer } from '@utils/PropertyValueTransformer'

export class CursorController extends CursorService {

  constructor( isAvailable:boolean, size:number, style:CursorStyle, element:HTMLElement, pixelsParser:PropertyValueTransformer ) {
    const pointerEventEmitter = new DOMPointerEventEmitter( element )
    const cursorRenderer = new HTMLCursorRenderer( size, style, element, pixelsParser )
    super( isAvailable, pointerEventEmitter, cursorRenderer )
  }

  get style(): CursorStyle {
    return this.cursorRenderer.style
  }

  public setStyle( style:CursorStyle ) {
    this.cursorRenderer.setStyle( style )
  }

}
