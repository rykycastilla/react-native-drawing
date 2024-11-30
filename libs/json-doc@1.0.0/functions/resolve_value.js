import { escapeString } from './escape_string.js'
import { StructContext } from '../classes/StructContext/index.js'

/**
 * @typedef { import( '../classes/StructContext' ).ContextSet } ContextSet
*/

/**
 * @param { unknown } value
 * @param { number } identation
 * @param { ContextSet } contextSet
 * @returns { string | null }
*/
export function resolveValue( value, identation, contextSet ) {
  /** @type { string | null } */ let result = null
  const { isStruct } = StructContext.checkStruct( value )
  if( ( typeof value === 'number' ) || ( typeof value === 'boolean' ) ) {
    result = String( value )
  }
  else if( typeof value === 'string' ) {
    let escapedValue = escapeString( value, '\\', '\\\\' )
    escapedValue = escapeString( escapedValue, '"' )
    escapedValue = escapeString( escapedValue, '\n', '\\n' )
    result = `"${ escapedValue }"`
  }
  else if( isStruct ) {
    result = StructContext.stringifyStruct( value, identation + 1, contextSet )
  }
  return result
}
