import { Color } from '../models/Color.js'

/**
 * @param { string } color
 * @returns { Color }
*/
export function structColor( color ) {
  const colorCanvas = new OffscreenCanvas( 1, 1 )
  const colorContext =
    /** @type { OffscreenCanvasRenderingContext2D } */ ( colorCanvas.getContext( '2d' ) )
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
