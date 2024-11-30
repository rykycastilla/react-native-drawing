/**
 * @param { string } string
 * @param { string } char
 * @param { string | undefined } replace
 * @returns { string }
*/
export function escapeString( string, char, replace ) {
  let result = ''
  for( const thisChar of string ) {
    if( thisChar === char ) {
      if( replace === undefined ) {
        result += '\\'
      }
      else {
        result += replace
        continue
      }
    }
    result += thisChar
  }
  return result
}
