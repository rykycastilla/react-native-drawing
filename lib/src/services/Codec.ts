export class Codec<T> {

  public toData( data:string ): T | null {
    let decodedData: T | null
    try { decodedData = JSON.parse( data ) }
    catch( e:unknown ) { decodedData = null }
    return decodedData
  }

  public toJSON( data:T ): string {
    return JSON.stringify( data )
  }

}
