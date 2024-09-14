import { Tool } from '@tools/services'
import { useCallback, useEffect, useState } from 'react'

export interface NativeDrawProps {
  resolution: number
  color: string
  tool: Tool
  showGrid?: boolean
  toolSize?: number
}

type MessageCallback = ( data:NativeDrawProps ) => void

export interface Bridge {
  onMessage( targe:string, callback:MessageCallback ): void
}

export function useNativeDrawProps( bridge:Bridge ): NativeDrawProps | null {

  const [ nativeDrawProps, setNativeDrawProps ] = useState<NativeDrawProps|null>( null )

  const onStateUpdate = useCallback( ( nativeProps:NativeDrawProps ) => {
    setNativeDrawProps( nativeProps )
  }, [] )

  useEffect( () => {
    bridge.onMessage( 'state-update', onStateUpdate )
  }, [ bridge, onStateUpdate ] )

  return nativeDrawProps

}
