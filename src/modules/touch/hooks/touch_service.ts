import { TouchService } from '../services'
import { useMemo } from 'react'

export function useTouchService(): TouchService {
  return useMemo( () => {
    return new TouchService()
  }, [] )
}
