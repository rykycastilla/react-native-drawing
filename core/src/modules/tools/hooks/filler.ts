import { Filler } from '../models'
import { Filler as FillerUtil } from '@utils/Filler'
import { useMemo } from 'react'

export function useFiller( defaultToolColor:string ): Filler {
  return useMemo( () => {
    return new Filler( defaultToolColor, FillerUtil )
  // eslint-disable-next-line
  }, [] )
}
