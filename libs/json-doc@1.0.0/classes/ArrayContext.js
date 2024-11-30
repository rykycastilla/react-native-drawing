import { resolveValue } from '../functions/resolve_value.js'
import { StructContext } from './StructContext/index.js'

/**
 * @extends { StructContext<any[]> }
*/
export class ArrayContext extends StructContext {

  /**
   * @param { number } identation
   * @param { any[] } target
   * @param { ContextSet } contextSet
  */
  constructor( identation, target, contextSet ) {
    super( '[', ']', identation, target, contextSet )
  }

  /**
   * @private @override
   * @returns { string }
  */
  stringifyContent() {
    let result = ''
    const spaces = StructContext.createIdentation( this.identation )
    for( let i = 0; i < this.target.length; i++ ) {
      const value = this.target[ i ]
      const stringValue = resolveValue( value, this.identation, this.contextSet )
      if( stringValue === null ) { continue }
      const isLast = i === ( this.target.length - 1 )
      result += `${ spaces }${ stringValue }${ isLast ? '' : ',' }\n`
    }
    return result
  }

}

/**
 * @typedef { import( './StructContext/index.js' ).ContextSet } ContextSet
*/
