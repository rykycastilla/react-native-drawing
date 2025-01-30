import { DEFAULT_ASPECT_RATIO } from '../../constants'
import { DrawManager } from './DrawManager'
import { DrawProps } from '../../types/DrawProps'
import { EventService, History, ScrollService } from '../../services'
import { Tool } from '../../shared/modules/tools/models'
import { TouchService, WebBridgeLoader, DrawCore } from '../../services'
import { useScrollService } from '../../functions/use_scroll_service'

class Draw extends DrawManager {

  protected readonly loader = new WebBridgeLoader()
  protected readonly scrollService: ScrollService
  protected readonly eventService: EventService
  protected readonly touchService: TouchService
  protected readonly core: DrawCore

  public readonly ready = new Promise<void>( ( resolve ) => {
    ( async() => {
      await this.loader.coreLoaded
      resolve()
    } )()
  } )

  constructor( props:DrawProps ) {
    super( props )
    const { resolution, aspectRatio = DEFAULT_ASPECT_RATIO } = props
    const history = new History( this, this.loader )
    this.scrollService = useScrollService( this, resolution, aspectRatio  )  // eslint-disable-line
    this.eventService = new EventService( this, this.loader, history, this.scrollService )
    this.touchService = new TouchService( () => this.loader.coreLoaded )
    this.core = new DrawCore( this.loader, history )
    this.setComponentEvents()
    this.setCoreLoaded()
  }

  private setCoreLoaded() {
    this.addEventListener( 'load', () => this.loader.loadCore() )
  }

  /**
   * @override
  */
  public toJSON(): object {
    const { width, height, tool, toolColor } = this
    const toolName: string = Tool[ tool ].toLowerCase()
    const message = `DRAW_REF: ${ width }x${ height }, ${ toolColor } ${ toolName }`
    return [ message ]
  }

}

export default Draw
