import { DoubleMap } from './DoubleMap'
import { IdAllocator } from './IdAllocator'

/**
 * An object to "transform" symbols to numeric ids
*/
export class SymbolParser {

  private readonly index = new DoubleMap<symbol,number>()

  private readonly idAllocator = new IdAllocator( ( id:number ) => {
    return this.index.get( id ) === undefined
  } )

  /**
   * Gets a numeric id to represent the symbol (the id is created if it doesn't exist)
  */
  public toId( sym:symbol ): number {
    let id: number | undefined = this.index.get( sym )
    if( id === undefined ) { id = this.idAllocator.getFree() }
    return id
  }

  /**
   * Gets a symbol that represents the provided id
  */
  public toSymbol( id:number ): symbol {
    let sym: symbol | undefined = this.index.get( id )
    if( sym === undefined ) { sym = Symbol() }
    return sym
  }

  /**
   * Delete the references between the symbol and its id
  */
  public unRef( sym:symbol ) {
    this.index.delete( sym )
  }

}
