import { Stroke } from './Stroke'
import { StrokeProps } from '../models'

export class DrawingStroke extends Stroke<StrokeProps> {

  private readonly baseConfig: CachedContext

  constructor( x:number, y:number, initProps:StrokeProps, context:CanvasRenderingContext2D ) {
    super( x, y, initProps, context )
    const { lineWidth, strokeStyle, lineJoin, lineCap } = context
    this.baseConfig = { lineWidth, strokeStyle, lineJoin, lineCap }
  }

  /** @protected */
  override renderSection( path:Path2D, props:StrokeProps ) {
    const { color, width } = props
    this.context.lineWidth = width
    this.context.strokeStyle = color
    this.context.lineJoin = 'round'
    this.context.lineCap = 'round'
    this.context.stroke( path )
  }

  /** @protected */
  protected override clearRenderCache(): void {
    const { lineWidth, strokeStyle, lineJoin, lineCap } = this.baseConfig
    // Recovering base props
    this.context.lineWidth = lineWidth
    this.context.strokeStyle = strokeStyle
    this.context.lineJoin = lineJoin
    this.context.lineCap = lineCap
  }

}

interface CachedContext {
  lineWidth: number
  strokeStyle: string | CanvasGradient | CanvasPattern
  lineJoin: CanvasLineJoin
  lineCap: CanvasLineCap
}
