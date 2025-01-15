/**
 * Fabric function that creates a new HTMLElement of the DOM
 * @class
 * @extends { HTMLElement }
*/
export function HTMLCanvasElement( width:number, height:number ): HTMLCanvasElement {
  const canvas: HTMLCanvasElement = document.createElement( 'canvas' )
  canvas.width = width
  canvas.height = height
  return canvas
}
