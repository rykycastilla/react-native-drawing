import { DEFAULT_ANTIALIASING, DEFAULT_ASPECT_RATIO } from '../../constants'
import { Draw as IDraw } from '../../types/Draw'
import { SyntheticTouch, TouchService } from '../../services'
import { Tool } from '../../shared/modules/tools/models'
import { WebDrawManager } from './WebDrawManager'

export abstract class DrawManager extends WebDrawManager implements IDraw {

  protected abstract touchService: TouchService
  public abstract readonly ready: Promise<void>

  public touch( x:number, y:number ): Promise<void>
  public touch( x:number, y:number, method:'keep' ): Promise<SyntheticTouch>

  public touch( x:number, y:number, method?:'keep' ): Promise<SyntheticTouch|void> {
    return this.touchService.touch( x, y, method )
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
