function genRandomInRange( from:number, to:number ): number {
  const random: number = Math.random(),
    range = to - from,
    inRange = random * range + from
  return Math.round( inRange )
}

export function createToken( length:number ): string {
  let result = ''
  for( let i = 0; i < length; i++ ) {
    const charCode: number = genRandomInRange( 1, 128 )
    result += String.fromCharCode( charCode )
  }
  return result
}
