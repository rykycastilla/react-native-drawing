import { DrawingScene } from '@draw/models'
import { Tool } from './Tool'

export class EyeDropper extends Tool {

  constructor(
    private readonly exposeColor: ExposeColorFunction,
  ) { super() }

  override addStrokePoint( x:number, y:number, strokeId:symbol, scene:DrawingScene ) {
    strokeId
    const { width, pixelList, colorChanels, maxChanel } = scene.getBinaryData()
    const baseIndex: number = EyeDropper.calcIndex( x, y, width ) * colorChanels,
      red = pixelList[ baseIndex + 0 ]!,
      green = pixelList[ baseIndex + 1 ]!,
      blue = pixelList[ baseIndex + 2 ]!,
      alpha = pixelList[ baseIndex + 3 ]!,
      standardAlpha = Math.round( alpha / maxChanel * 100 ) / 100  // Using 0 - 1 with 2 significant numbers
    const color = `rgba( ${ red }, ${ green }, ${ blue }, ${ standardAlpha } )`
    this.exposeColor( color )
  }

  private static calcIndex( x: number, y:number, width:number ): number {
    return x + width * y
  }

}

interface ExposeColorFunction {
  ( color:string ): void
}
