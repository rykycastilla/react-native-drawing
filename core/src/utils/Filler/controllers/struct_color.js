import { HeadlessCanvasFactory } from '@utils/HeadlessCanvasFactory'
import { Color } from '../models/Color.js'

/**
 * @typedef { import( '@utils/HeadlessCanvasFactory' ).CanvasContext } CanvasContext
 */

/**
 * @param { string } color
 * @returns { Color }
*/
export function structColor( color ) {
  const colorCanvas = HeadlessCanvasFactory.createInstance( 1, 1 )
  const colorContext =
  /** @type { CanvasContext } */ ( colorCanvas.getContext( '2d' ) )
  // Building single color pixel
  colorContext.fillStyle = color
  colorContext.rect( 0, 0, 1, 1 )
  colorContext.fill()
  // Extracting binary color
  const { data } = colorContext.getImageData( 0, 0, 1, 1 )
  const [ red, green, blue, alpha ] =
    /** @type { [ number, number, number, number ] } */ ( /** @type { unknown } */ ( data ) )
  return new Color( red, green, blue, alpha )
}
