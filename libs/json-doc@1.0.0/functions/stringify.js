import { ArrayContext } from '../classes/ArrayContext.js'
import { ObjectContext } from '../classes/ObjectContext.js'
import { StructContext } from '../classes/StructContext/index.js'

/**
 * Build an string with a JSON document format based on a JS structure
 * @param { object } object
 * @returns { string }
*/
export function stringify( object ) {
  return StructContext.stringifyStruct( object, 1, { ObjectContext, ArrayContext } )
}
