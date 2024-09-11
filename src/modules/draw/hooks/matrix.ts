import { Display, Matrix } from '../models'
import { useMemo } from 'react'

export function useMatrix( resolution:number, display:Display ): Matrix {
  return useMemo( () => {
    return new Matrix( resolution, display )
  }, [ resolution, display ] )
}
