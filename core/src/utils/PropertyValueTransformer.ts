/**
 * Abstract utility class for selectively transforming property values within nested objects.
 */
export class PropertyValueTransformer {

  /**
   * Property names that can be parsed.
   * WARNING: The values can contain `.` in its names to indicate properties of properties (like standard JS).
   */
  readonly parsableValueList: readonly string[]

  constructor( ...parsableValueList:string[] ) {
    this.parsableValueList = parsableValueList
  }

  /**
   * Runs the `callback` for each parsable value found in the given `object`.
   * WARNING: This method mutates the input object. Values will be replaced with parsed results.
   * @param callback - A parser function to replace the found value.
   * @param object - Struct to find and parse values
   */
  public parse( object:Record<string,unknown>, callback:ParserCallback ) {
    for( const parsable of this.parsableValueList ) {
      const pixelatedObjectPath: string[] = parsable.split( '.' )
      let objectStack: Record<string,unknown> | null = object
      // Stacking object properties to find the target value
      for( let i = 0; i < pixelatedObjectPath.length - 1; i++ ) {
        const propertyName: string = pixelatedObjectPath[ i ]!
        const newStackValue: unknown = objectStack[ propertyName ]
        if( !( newStackValue instanceof Object ) ) {
          objectStack = null
          break
        }
        objectStack = newStackValue as Record<string,unknown>
      }
      // Parsing target
      if( objectStack === null ) { continue }
      const lastPropertyName: string = pixelatedObjectPath[ pixelatedObjectPath.length - 1 ]!
      const parsableValue: unknown = objectStack[ lastPropertyName ]
      if( parsableValue === undefined ) { continue }
      objectStack[ lastPropertyName ] = callback( parsableValue )
    }
  }

}

interface ParserCallback {
  ( parsableValue:unknown ): unknown
}
