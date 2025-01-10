/**
 * An object to serialize structurable data
*/
export class Codec<T extends object> {

  constructor(
    private readonly fixStruct: FixStructFunction<T>,
  ) {}

  public toData( json:string ): T {
    const struct: object = JSON.parse( json )
    return this.fixStruct( struct )
  }

  public toJSON( data:T ): string {
    return JSON.stringify( data )
  }

}

/**
 * Use to implement functions to declare 'default' values to incompatible objects
*/
interface FixStructFunction<T extends object> {
  ( struct:object ): T
}
