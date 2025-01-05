import { DrawPropsDTO } from '@shared/utils/types/DrawPropsDTO'
import { Tool } from '@shared/modules/tools/models'
import { useCallback, useEffect, useState } from 'react'

type MessageCallback = ( data:DrawPropsDTO<Tool> ) => void

export interface Bridge {
  onMessage( targe:string, callback:MessageCallback ): void
}

export function useNativeDrawProps( bridge:Bridge ): DrawPropsDTO<Tool> | null {

  const [ nativeDrawProps, setNativeDrawProps ] = useState<DrawPropsDTO<Tool>|null>( null )

  const onStateUpdate = useCallback( ( nativeProps:DrawPropsDTO<Tool> ) => {
    setNativeDrawProps( nativeProps )
  }, [] )

  useEffect( () => {
    bridge.onMessage( 'state-update', onStateUpdate )
  }, [ bridge, onStateUpdate ] )

  return nativeDrawProps

}
