import { HTMLCanvasElement } from './HTMLCanvasElement'

/**
 * Creates a single color base64 image
*/
export function createEmptyImage( width:number, height:number, color?:string ): string {
  // Creating image
  const canvas = HTMLCanvasElement( width, height )
  const context: CanvasRenderingContext2D = canvas.getContext( '2d' )!
  if( color === undefined ) { return canvas.toDataURL() }  // Without color
  // Rendering image color
  context.fillStyle = color
  context.rect( 0, 0, width, height )
  context.fill()
  return canvas.toDataURL()
}
