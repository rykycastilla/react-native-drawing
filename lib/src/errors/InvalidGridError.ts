export class InvalidGridError extends Error {

  constructor( gridSize:unknown, extendedMessage?:string ) {
    const customMessage = `; ${ extendedMessage }`
    super( `Invalid grid size: ${ gridSize }${ customMessage }` )
  }

  /**
   * @throws { InvalidGridError }
  */
  public static validateGrid( gridSize:unknown ) {
    const message = 'This must be an integer between 2 and 32'
    // Validating is integer
    if( typeof gridSize !== 'number' ) {
      throw new InvalidGridError( gridSize, message )
    }
    const integer: number = Math.floor( gridSize )
    if( integer !== gridSize ) {
      throw new InvalidGridError( gridSize, message )
    }
    // Validating range
    const isInValidRange: boolean = ( 2 <= gridSize ) && ( gridSize <= 32 )
    if( !isInValidRange ) {
      throw new InvalidGridError( gridSize, message )
    }
  }

}
