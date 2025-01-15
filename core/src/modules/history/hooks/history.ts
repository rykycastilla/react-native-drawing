import { getAvailableMemory } from '../controllers'
import { History, SnapShotUtil } from '../services'
import { useSnapShotUtil } from './snap_shot_util'
import { useMemo } from 'react'

export function useHistory( width:number, height:number ): History {
  const snapShotUtil: SnapShotUtil = useSnapShotUtil( width, height )
  return useMemo( () => {
    const availableMemory: number = getAvailableMemory()
    return new History( availableMemory, snapShotUtil )
  }, [ snapShotUtil ] )
}
