import { Canvas, CanvasContext } from '@utils/Canvas'

export function filterColorAlpha( color:string ): string {
  // Creating canvas to render color
  const canvas = new Canvas( 1, 1 )
  const context = canvas.getContext( '2d' ) as CanvasContext
  // Rendering color
  context.fillStyle = color
  context.rect( 0, 0, 1, 1 )
  context.fill()
  // Extracting color (without alpha)
  const { data } = context.getImageData( 0, 0, 1, 1 )
  const [ red, green, blue ] = data as unknown as [ number, number, number ]  // Ignoring alpha chanel
  return `rgb( ${ red }, ${ green }, ${ blue } )`
}
