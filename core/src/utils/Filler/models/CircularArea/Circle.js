export class Circle {

  #radius

  /**
   * @param { number } radius
  */
  constructor( radius ) {
    this.#radius = radius
  }

  /**
   * @public
   * @param { number } extraRadius
  */
  inflate( extraRadius ) {
    this.#radius += Math.floor( extraRadius )
  }

  /** @returns { number } */
  get area() {
    return Circle.calcArea( this.#radius )
  }

  get radius() {
    return this.#radius
  }

  /**
   * @public
   * @param { number } radius
   * @returns { number }
  */
  static calcArea( radius ) {
    return radius ** 2 * Math.PI
  }

  /**
   * @param { number } area
   * @returns { number }
  */
  static calcRadius( area ) {
    return Math.sqrt( area / Math.PI )
  }

}
