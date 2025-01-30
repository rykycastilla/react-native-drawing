import { DrawPropsDTO } from '@shared/utils/types/DrawPropsDTO'
import { Tool } from '@shared/modules/tools/models'
import { useAsyncState } from './async_state'
import { useCallback, useEffect } from 'react'

type MessageCallback = ( data:DrawPropsDTO<Tool> ) => void
export interface Bridge {
  onMessage( targe:string, callback:MessageCallback ): void
}

export function useNativeDrawProps( bridge:Bridge ): DrawPropsDTO<Tool> | null {

  const [ nativeDrawProps, setNativeDrawProps ] = useAsyncState<DrawPropsDTO<Tool>|null>( null )

  const onStateUpdate = useCallback( async( nativeProps:DrawPropsDTO<Tool> ) => {
    console.log( '%c recibiendo estado...', 'color: yellow;', nativeProps )
    await setNativeDrawProps( nativeProps )
    console.log( '%c estado recibido', 'color: blue;', nativeProps )
  }, [ setNativeDrawProps ] )

  useEffect( () => {
    bridge.onMessage( 'state-update', onStateUpdate )
  }, [ bridge, onStateUpdate ] )

  return nativeDrawProps

}
