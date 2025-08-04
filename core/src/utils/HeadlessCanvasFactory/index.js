export class HeadlessCanvasFactory {

  /** @private */ constructor() {}

  /**
   * Indicates if the current environment supports `OffscreenCanvas` API,
   * this is a modern implementation that can be used to optimize the performance
   * in headless contexts.
   * @public
   * @returns { boolean }
   */
  static checkModernImpl() {
    return self.OffscreenCanvas !== undefined
  }

  /**
   * Instantiates a new Headless Canvas based on the environment capabilities.
   * @param { number } width
   * @param { number } height
   * @returns { Canvas }
   */
  static createInstance( width, height ) {
    const isModern = HeadlessCanvasFactory.checkModernImpl()
    if( isModern ) { return new OffscreenCanvas( width, height ) }
    // Using legacy implementation
    const canvas = document.createElement( 'canvas' )
    canvas.width = width
    canvas.height = height
    return canvas
  }

}

/** @typedef { import( './Canvas' ).Canvas } Canvas */
/** @typedef { import( './Canvas' ).CanvasContext } CanvasContext */
