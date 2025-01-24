import { DrawHistory } from '../History'
import { EventHandler, EventType } from '../../utils/EventDispatcher'
import { EventListener } from '../EventService'
import { IWebDraw } from '../../shared/utils/types/IWebDraw'
import { Tool } from '../../shared/modules/tools/models'

export interface IDraw extends IWebDraw, DrawHistory {

  antialiasing: boolean
  width: number
  height: number
  tool: Tool
  toolColor: string

  /**
   * Appends an event listener for events whose type attribute
   * value is type. The callback argument sets the handler that
   * will be invoked when the event is dispatched.
  */
  addEventListener<T extends EventType<EventListener>>( type:T, handler:EventHandler<T,EventListener> ): void

  /**
   * Removes the event listener in target's event listener list with the same type and callback
  */
  removeEventListener<T extends EventType<EventListener>>( type:T, handler:EventHandler<T,EventListener> ): void

  /**
   * Simulates a drawing touch imperatively
   * @param method  'keep' value indicates that the touch object can be used to draw
   * @returns  A touch object to draw with it (only with 'kepp' value in method)
   */
  touch( x:number, y:number ): void
  touch( x:number, y:number, method:'keep' ): Promise<SyntheticTouch>

}
