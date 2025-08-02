export class Canvas {

  /**
   * @param { number } width
   * @param { number } height
  */
  constructor( width, height ) {
    if( window.OffscreenCanvas !== undefined ) {
      return new OffscreenCanvas( width, height )
    }
    else {
      const canvas = document.createElement( 'canvas' )
      canvas.width = width
      canvas.height = height
      return canvas
    }
  }

}
