import { Codec } from '../shared/utils/Codec'
import { MessageData, MessageSystem } from '../shared/utils/MessageSystem'
import { useCallback, useMemo, useState } from 'react'
import { useMessageCodec } from './message_codec'

type MessageCallback = ( message:string ) => void
type Suscriber = ( callback:MessageCallback ) => void

interface UseWebBridgeResult {
  webBridge: MessageSystem | null
  onLoadWebView(): void
}

export function useWebBridge( suscribe:Suscriber, postMessage:MessageCallback ): UseWebBridgeResult {

  const [ ready, setReady ] = useState( false )
  const messageCodec: Codec<MessageData> = useMessageCodec()

  const onLoadWebView = useCallback( () => {
    setReady( true )
  }, [] )

  const webBridge: MessageSystem | null = useMemo( () => {
    if( !ready ) { return null }
    return new MessageSystem( suscribe, postMessage, messageCodec )
  }, [ ready, suscribe, postMessage, messageCodec ] )

  return { webBridge, onLoadWebView }

}
