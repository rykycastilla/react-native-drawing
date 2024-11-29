/**
 * @abstract
 * @template T
*/
export class Context {

  static TAB_SIZE = 4
  #begin
  #end
  #identation
  /** @protected @readonly */ target

  /**
   * @param { string } begin
   * @param { string } end
   * @param { number } identation
   * @param { T } target
  */
  constructor( begin, end, identation, target ) {
    this.#begin = begin
    this.#end = end
    this.#identation = identation
    this.target = target
  }

  /**
   * @abstract @private
   * @returns { string }
  */
  stringifyContent() {}

  /**
   * @public
   * @param { number } identation
   * @returns { string }
  */
  stringify() {
    let result = `${ this.begin }\n`
    result += this.stringifyContent()
    const spaces = Context.createIdentation( this.identation - 1 )
    result += spaces + this.end
    return result
  }

  get begin() {
    return this.#begin
  }

  get end() {
    return this.#end
  }

  get identation() {
    return this.#identation
  }

  /**
   * @param { number } identation
   * @returns { string }
  */
  static createIdentation( identation ) {
    const spaces = identation * Context.TAB_SIZE
    let result = ''
    for( let i = 0; i < spaces; i++ ) { result += ' ' }
    return result
  }

}
