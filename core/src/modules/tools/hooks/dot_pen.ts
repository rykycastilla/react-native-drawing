import { DotPen } from '../models'
import { useMemo } from 'react'

export function useDotPen( defaultColor:string, defaultSize:number ): DotPen {
  return useMemo( () => {
    return new DotPen( defaultColor, defaultSize )
  }, [] )  // eslint-disable-line
}
