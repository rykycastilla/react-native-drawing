import { resolveValue } from '../functions/resolve_value.js'
import { StructContext } from './StructContext/index.js'

/**
 * @extends { StructContext<object> }
*/
export class ObjectContext extends StructContext {

  /**
   * @param { number } identation
   * @param { object } target
   * @param { ContextSet } contextSet
  */
  constructor( identation, target, contextSet ) {
    super( '{', '}', identation, target, contextSet )
  }

  /**
   * @private @override
   * @returns { string }
  */
  stringifyContent() {
    let result = ''
    const keyList = Object.keys( this.target )
    const spaces = StructContext.createIdentation( this.identation )
    for( let i = 0; i < keyList.length; i++ ) {
      const key = keyList[ i ]
      const value = this.target[ key ]
      const stringValue = resolveValue( value, this.identation, this.contextSet )
      if( stringValue === null ) { continue }
      const isLast = i === ( keyList.length - 1 )
      result += `${ spaces }"${ key }": ${ stringValue }${ isLast ? '' : ',' }\n`
    }
    return result
  }

}

/**
 * @typedef { import( './StructContext/index.js' ).ContextSet } ContextSet
*/
