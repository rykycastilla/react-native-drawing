import { CursorService } from '../services'
import { DOMPointerEventEmitter } from './DOMPointerEventEmitter'
import { HTMLCursorRenderer } from './HTMLCursorRenderer'

export class CursorController extends CursorService {
  constructor( isAvailable:boolean, size:number, element:HTMLElement ) {
    const pointerEventEmitter = new DOMPointerEventEmitter( element )
    const cursorRenderer = new HTMLCursorRenderer( size, element )
    super( isAvailable, pointerEventEmitter, cursorRenderer )
  }
}
