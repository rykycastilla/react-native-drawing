import { CoordinatesService } from '../services'
import { Matrix } from '../models'
import { useMemo } from 'react'

export function useCoordinatesService<T extends string>( matrix:Matrix<T> ) {
  return useMemo( () => {
    return new CoordinatesService( matrix )
  }, [ matrix ] )
}
