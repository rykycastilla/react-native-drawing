import { Pointer } from '../models'

export interface PointerEventEmitter {
  oninteract: PointerEventHandler | null
  onleave: PointerEventHandler | null
}

export interface PointerEventHandler {
  ( pointer:Pointer ): void
}
