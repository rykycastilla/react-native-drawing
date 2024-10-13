import { Filler } from '../models'
import { useMemo } from 'react'

export function useFiller( defaultToolColor:string ): Filler {
  return useMemo( () => {
    return new Filler( defaultToolColor )
  // eslint-disable-next-line
  }, [] )
}
