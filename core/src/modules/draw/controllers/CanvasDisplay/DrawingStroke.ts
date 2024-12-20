import { Stroke } from '../Stroke'
import { StrokeProps } from '../../models'

export class DrawingStroke extends Stroke<StrokeProps> {
  /** @protected */
  override renderSection( path:Path2D, props:StrokeProps ) {
    const { color, width } = props
    this.context.lineWidth = width
    this.context.strokeStyle = color
    this.context.lineJoin = 'round'
    this.context.stroke( path )
  }
}
