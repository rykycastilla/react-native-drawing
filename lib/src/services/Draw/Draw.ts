import { DEFAULT_ANTIALIASING, DEFAULT_ASPECT_RATIO } from '../../constants'
import { EventHandler, EventType } from '../../utils/EventDispatcher'
import { EventListener, EventService } from '../EventService'
import { History } from '../History'
import { IDraw } from './IDraw'
import { ScrollService } from '../ScrollService'
import { Tool } from '../../shared/modules/tools/models'
import { WebDraw } from './WebDraw'

import { SyntheticTouch, TouchService } from '../TouchService'

export class Draw extends WebDraw implements IDraw {

  private readonly eventService: EventService
  private readonly touchService: TouchService

  constructor(
    private props: DrawProps,
    scrollService:ScrollService,
  ) {
    super()
    const history = new History( this )
    this.eventService = new EventService( this, history, scrollService )
    this.touchService = new TouchService( () => this.webBridgeLoaded )
    scrollService.setTarget( this )
    this.setHistory( history )
  }

  public addEventListener<T extends EventType<EventListener>>( type:T, handler:EventHandler<T,EventListener> ) {
    this.eventService.addEventListener( type, handler )
  }

  public removeEventListener<T extends EventType<EventListener>>( type:T, handler:EventHandler<T,EventListener> ) {
    this.eventService.removeEventListener( type, handler )
  }

  public touch( x:number, y:number, method?:'keep' ): Promise<SyntheticTouch|void> {
    return this.touchService.touch( x, y, method )
  }

  public setProps( props:DrawProps ) {
    this.props = props
  }

  get antialiasing(): boolean {
    return this.props.antialiasing ?? DEFAULT_ANTIALIASING
  }

  get width(): number {
    return this.props.resolution
  }

  get height(): number {
    const { resolution, aspectRatio = DEFAULT_ASPECT_RATIO } = this.props
    return Math.round( resolution / aspectRatio )
  }

  get tool(): Tool {
    return this.props.tool
  }

  get toolColor(): string {
    return this.props.color
  }

}

export interface DrawProps {
  antialiasing?: boolean
  resolution: number
  aspectRatio?: number
  tool: Tool
  color: string
}

export type { IDraw }
