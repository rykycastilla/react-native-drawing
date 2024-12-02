import { InvalidGridError } from '../errors'
import { useEffect } from 'react'

/**
 * @throws { InvalidGridError }
*/
export function useGridGuard( grid:number|undefined ) {
  useEffect( () => {
    if( grid === undefined ) { return }
    InvalidGridError.validateGrid( grid )
  }, [ grid ] )
}
