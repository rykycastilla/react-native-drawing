import { ClearPathProps } from '../../models'
import { Stroke } from '../Stroke'

export class ClearPath extends Stroke<ClearPathProps> {
  /** @protected */
  override renderSection( path:Path2D, props:ClearPathProps ) {
    const { width } = props
    this.context.globalCompositeOperation = 'destination-out'
    this.context.lineWidth = width
    this.context.lineJoin = 'round'
    this.context.lineCap = 'round'
    this.context.stroke( path )
    this.context.globalCompositeOperation = 'source-over'
  }
}
