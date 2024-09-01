import { CoordinatesService } from '../services'
import { Matrix } from '../models'
import { useMemo } from 'react'

export function useCoordinatesService( matrix:Matrix ) {
  return useMemo( () => {
    return new CoordinatesService( matrix )
  }, [ matrix ] )
}
