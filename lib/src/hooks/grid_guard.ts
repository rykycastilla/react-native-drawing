import { InvalidGridError } from '../errors'
import { useEffect } from 'react'

/**
 * @throws { InvalidGridError }
*/
export function useGridGuard( grid:number|[number,number]|undefined ) {

  const [ widthGrid, heightGrid ] = ( typeof grid === 'number' )
    ? [ grid, grid ]
    : grid ?? []

  useEffect( () => {
    if( ( widthGrid === undefined ) || ( heightGrid == undefined ) ) { return }
    InvalidGridError.validateGrid( widthGrid )
    InvalidGridError.validateGrid( heightGrid )
  }, [ widthGrid, heightGrid ] )

}
