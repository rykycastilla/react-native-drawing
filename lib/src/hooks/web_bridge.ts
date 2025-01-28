import { MessageSystem } from '../shared/utils/MessageSystem'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

function useDynamicRef<T>( current:T ) {
  const ref = useRef( current )
  useEffect( () => {
    ref.current = current
  }, [ ref, current ] )
  return ref
}

type MessageCallback = ( message:string ) => void
type Suscriber = ( callback:MessageCallback ) => void

interface UseWebBridgeResult {
  webBridge: MessageSystem | null
  onLoadWebView(): void
}

type WebBridgeCallback = ( webBridge:MessageSystem ) => void

export function useWebBridge(
  suscribe:Suscriber, postMessage:MessageCallback, onWebBridge:WebBridgeCallback,
): UseWebBridgeResult {

  const [ ready, setReady ] = useState( false )
  const onWebBridgeRef = useDynamicRef( onWebBridge )

  const onLoadWebView = useCallback( () => {
    setReady( true )
  }, [] )

  const webBridge: MessageSystem | null = useMemo( () => {
    if( !ready ) { return null }
    return new MessageSystem( suscribe, postMessage )
  }, [ ready, suscribe, postMessage ] )

  useEffect( () => {
    if( webBridge === null ) { return }
    onWebBridgeRef.current( webBridge )
  }, [ webBridge, onWebBridgeRef ] )

  return { webBridge, onLoadWebView }

}
