import { ClearPathProps } from '../models'
import { Stroke } from './Stroke'

export class ClearPath extends Stroke<ClearPathProps> {

  private readonly baseConfig: CachedContext

  constructor( x:number, y:number, initProps:ClearPathProps, context:CanvasRenderingContext2D ) {
    super( x, y, initProps, context )
    const { lineWidth, strokeStyle, lineJoin, lineCap, globalCompositeOperation } = context
    this.baseConfig = { lineWidth, strokeStyle, lineJoin, lineCap, globalCompositeOperation }
  }

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

  /** @protected */
  protected override clearRenderCache(): void {
    const { lineWidth, strokeStyle, lineJoin, lineCap, globalCompositeOperation } = this.baseConfig
    // Recovering base props
    this.context.lineWidth = lineWidth
    this.context.strokeStyle = strokeStyle
    this.context.lineJoin = lineJoin
    this.context.lineCap = lineCap
    this.context.globalCompositeOperation = globalCompositeOperation
  }

}

interface CachedContext {
  lineWidth: number
  strokeStyle: string | CanvasGradient | CanvasPattern
  lineJoin: CanvasLineJoin
  lineCap: CanvasLineCap
  globalCompositeOperation: GlobalCompositeOperation
}
