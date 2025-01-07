const TOTAL_PERCENTAGE = 100
const MAX_COLOR_CHANEL = 255

export function fadeColor( color:string, fadePercentage:number ): string {
  // Creating canvas to render color
  const canvas = new OffscreenCanvas( 1, 1 )
  const context: OffscreenCanvasRenderingContext2D = canvas.getContext( '2d' )!
  // Rendering color
  context.fillStyle = color
  context.rect( 0, 0, 1, 1 )
  context.fill()
  // Extracting color
  const { data } = context.getImageData( 0, 0, 1, 1 )
  const [ red, green, blue, alpha ] = data as unknown as [ number, number, number, number ]
  // Modifying alpha (fading)
  const percentage: number = TOTAL_PERCENTAGE - fadePercentage
  const modifiedAlpha: number = alpha / TOTAL_PERCENTAGE * percentage
  const formattedAlpha: number = Math.round( modifiedAlpha / MAX_COLOR_CHANEL * 100 ) / 100
  return `rgba( ${ red }, ${ green }, ${ blue }, ${ formattedAlpha } )`
}
