import { Display, Matrix } from '../models'
import { useMemo } from 'react'

export function useMatrix<T extends string>( top:number, left:number, size:number, resolution:number, grid:number, display:Display ): Matrix<T> {
  return useMemo( () => {
    return new Matrix<T>( top, left, size, resolution, grid, display )
  }, [ top, left, size, resolution, grid, display ] )
}
