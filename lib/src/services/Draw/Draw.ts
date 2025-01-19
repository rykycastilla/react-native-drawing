import { DEFAULT_ANTIALIASING, DEFAULT_ASPECT_RATIO } from '../../constants'
import { IDraw } from './IDraw'
import { Ref } from '../../utils/Ref'
import { Tool } from '../../shared/modules/tools/models'
import { WebDraw } from './WebDraw'

export class Draw extends WebDraw implements IDraw {

  constructor(
    private props: DrawProps,
  ) {
    const targetRef = new Ref<Draw|null>( null )
    super( targetRef )
    targetRef.setValue( this )
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
