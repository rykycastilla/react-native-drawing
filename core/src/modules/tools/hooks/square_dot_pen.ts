import { SquareDotPen } from '../models'
import { useMemo } from 'react'

export function useSquareDotPen( defaultColor:string, defaultSize:number ): SquareDotPen {
  return useMemo( () => {
    return new SquareDotPen( defaultColor, defaultSize )
  }, [] )  // eslint-disable-line
}
