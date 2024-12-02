/**
 * @module Ref
 *
 * @description
 * Provides a generic reference class that encapsulates a value of type `T`.
 */

/**

 * The class allows setting and retrieving the current value, providing a way
 * to manage and update references.
 */
export class Ref<T> {

  #current: T

  /**
   * @param {T} value - The initial value to set for the reference.
   */
  constructor( value:T ) {
    this.#current = value
  }

  /**
   * Sets a new value for the reference.
   * @param {T} value - The new value to set.
   */
  public setValue( value:T ) {
    this.#current = value
  }

  /**
   * Retrieves the current value of the reference.
   * @returns {T} - The current value.
   */
  get current(): T {
    return this.#current
  }

}
