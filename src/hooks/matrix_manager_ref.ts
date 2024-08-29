import { MatrixManager } from '../services'
import { useMemo } from 'react'

export function useMatrixManagerRef() {
  const manager: MatrixManager = useMemo( () => {
    return new MatrixManager()
  }, [] )
  return manager
}
