import { CanvasSnapShotUtil } from '../controllers'
import { SnapShotUtil } from '../services'
import { useMemo } from 'react'

export function useSnapShotUtil( width:number, height:number ): SnapShotUtil {
  return useMemo( () => {
    return new CanvasSnapShotUtil( width, height )
  }, [ width, height ] )
}
