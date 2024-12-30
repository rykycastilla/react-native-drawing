export function filterColorAlpha( color:string ): string {
  // Creating canvas to render color
  const canvas = new OffscreenCanvas( 1, 1 )
  const context: OffscreenCanvasRenderingContext2D = canvas.getContext( '2d' )!
  // Rendering color
  context.fillStyle = color
  context.rect( 0, 0, 1, 1 )
  context.fill()
  // Extracting color (without alpha)
  const { data } = context.getImageData( 0, 0, 1, 1 )
  const [ red, green, blue ] = data as unknown as [ number, number, number ]  // Ignoring alpha chanel
  return `rgb( ${ red }, ${ green }, ${ blue } )`
}
