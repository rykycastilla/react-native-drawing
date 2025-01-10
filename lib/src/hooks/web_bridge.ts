import { MessageSystem } from '../shared/utils/MessageSystem'
import { useCallback, useMemo, useState } from 'react'

type MessageCallback = ( message:string ) => void
type Suscriber = ( callback:MessageCallback ) => void

interface UseWebBridgeResult {
  webBridge: MessageSystem | null
  onLoadWebView(): void
}

export function useWebBridge( suscribe:Suscriber, postMessage:MessageCallback ): UseWebBridgeResult {

  const [ ready, setReady ] = useState( false )

  const onLoadWebView = useCallback( () => {
    setReady( true )
  }, [] )

  const webBridge: MessageSystem | null = useMemo( () => {
    if( !ready ) { return null }
    return new MessageSystem( suscribe, postMessage )
  }, [ ready, suscribe, postMessage ] )

  return { webBridge, onLoadWebView }

}
