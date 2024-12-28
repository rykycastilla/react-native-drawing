/**
 * Returns operations that can be made by the environment in an specific 'time' lapse
*/
export function getOps( time:number ): number {
  let ops = 0
  const start: number = performance.now()
  while( ( performance.now() - start ) < time ) {
    ops++
  }
  return ops
}
