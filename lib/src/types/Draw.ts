import { Component } from 'react'
import { DrawProps } from './DrawProps'
import { EventHandler, EventType } from '../utils/EventDispatcher'
import { EventListener } from '../services/EventService'
import { ISyntheticTouch } from '../services/TouchService'
import { IWebDraw } from '../shared/utils/types/IWebDraw'
import { Tool } from '../shared/modules/tools/models'

export interface Draw extends IWebDraw, Component<DrawProps> {

  antialiasing: boolean
  width: number
  height: number
  tool: Tool
  toolColor: string

  /** Represents the load event of the draw view in a promise */
  ready: Promise<void>

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
   * @returns  A touch object to draw with it (only with 'keep' value in method).
   */
  touch( x:number, y:number ): Promise<void>
  touch( x:number, y:number, method:'keep' ): Promise<SyntheticTouch>

}

interface SyntheticTouch extends ISyntheticTouch {}
