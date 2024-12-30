import { None } from '../models'
import { useMemo } from 'react'

export function useNone(): None {
  return useMemo( () => {
    return new None()
  }, [] )
}
