import { Display, Matrix } from '../models'
import { useMemo } from 'react'

export function useMatrix( top:number, left:number, size:number, resolution:number, grid:number, display:Display ): Matrix {
  return useMemo( () => {
    return new Matrix( top, left, size, resolution, grid, display )
  }, [ top, left, size, resolution, grid, display ] )
}
