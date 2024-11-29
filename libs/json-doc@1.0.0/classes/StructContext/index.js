import { Context } from './Context.js'

/**
 * @abstract
 * @template T
 * @extends { Context<T> }
*/
export class StructContext extends Context {

  /** @protected @readonly */ contextSet

  /**
   * @param { string } begin
   * @param { string } end
   * @param { number } identation
   * @param { T } target
   * @param { ContextSet } contextSet
  */
  constructor( begin, end, identation, target, contextSet ) {
    super( begin, end, identation, target )
    this.contextSet = contextSet
  }

  /**
  * Verify the type of the value
  * @public
  * @param { any } target
  * @returns { CheckStructResult }
  */
  static checkStruct( target ) {
    const isStruct = ( typeof target === 'object' ) && ( target !== null )
    const isArray = target instanceof Array
    return { isStruct, isArray }
  }

  /**
  * @public
  * @param { object } struct
  * @param { number } identation
  * @param { ContextSet } contextSet
  * @returns { string }
  */
  static stringifyStruct( struct, identation, contextSet ) {
    const { ObjectContext, ArrayContext } = contextSet
    const { isStruct, isArray } = StructContext.checkStruct( struct )
    if( !isStruct ) { return '' }
    /** @type { StructContextConstructor } */ const Context = isArray ? ArrayContext : ObjectContext
    const context = new Context( identation, struct, contextSet  )
    return context.stringify()
  }

}

/**
 * @typedef { Object } CheckStructResult
 * @property { boolean } isStruct
 * @property { boolean } isArray
*/

/**
 * @typedef { new ( identation:number, target:object, contextSet:ContextSet ) => StructContext<unknown> } StructContextConstructor
*/

/**
 * @typedef { Object } ContextSet
 * @property { StructContextConstructor } ObjectContext
 * @property { StructContextConstructor } ArrayContext
*/
