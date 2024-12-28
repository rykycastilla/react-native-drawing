export class Pixel {

  /** @readonly */ x
  /** @readonly */ y

  /**
   * @param { number } x
   * @param { number } y
  */
  constructor( x, y ) {
    this.x = x
    this.y = y
  }

  /**
   * @public
   * @param { number } width
   * @returns { number }
  */
  calcIndex( width ) {
    return this.x + width * this.y
  }

}
