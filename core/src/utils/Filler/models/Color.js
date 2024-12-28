export class Color {

  /** @readonly */ #red
  /** @readonly */ #green
  /** @readonly */ #blue
  /** @readonly */ #alpha

  /**
   * @param { number } red
   * @param { number } green
   * @param { number } blue
   * @param { number } alpha
  */
  constructor( red, green, blue, alpha ) {
    this.#red = red
    this.#green = green
    this.#blue = blue
    this.#alpha = alpha
  }

  /**
   * @public
   * @param { Color } color
  */
  equalsColor( color ) {
    const sameRed = color.red == this.#red,
      sameGreen = color.green == this.#green,
      sameBlue = color.blue == this.#blue
    return sameRed && sameGreen && sameBlue
  }

  /**
   * @param { Color } color
   * @returns { boolean }
  */
  equals( color ) {
    const sameAlpha = color.alpha == this.#alpha,
      isInvisible = this.#alpha == 0
    if( sameAlpha && isInvisible ) { return true }
    return this.equalsColor( color ) && sameAlpha
  }

  /**
   * @public
   * @returns { string }
  */
  toString() {
    return `rgba( ${ this.red }, ${ this.green }, ${ this.blue }, ${ this.styleAlpha } )`
  }

  get red() {
    return this.#red
  }

  get green() {
    return this.#green
  }

  get blue() {
    return this.#blue
  }

  get alpha() {
    return this.#alpha
  }

  /** @returns { number } */
  get styleAlpha() {
    return Math.round( ( this.#alpha / 255 ) * 10 ) / 10
  }

}
