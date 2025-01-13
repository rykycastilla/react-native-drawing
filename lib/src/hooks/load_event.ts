import { MessageSystem } from '../shared/utils/MessageSystem'
import { Ref } from '../utils/Ref'
import { useEffect, useMemo, useState } from 'react'

type FunctionVoid = () => void

function useRef<T>( value:T ): Ref<T> {

  const ref: Ref<T> = useMemo( () => {
    return new Ref<T>( value )
  }, [] )  // eslint-disable-line

  useEffect( () => {
    ref.setValue( value )
  }, [ ref, value ] )

  return ref

}

interface WaitLoadEventArgs {
  webBridge: MessageSystem
  loadHandlerRef: Ref<FunctionVoid|undefined>
  loadWebBridgeHandlerRef: Ref<( webBridge:MessageSystem ) => void>
}

async function waitLoadEvent( args:WaitLoadEventArgs ) {
  const { webBridge, loadHandlerRef, loadWebBridgeHandlerRef } = args
  const loaded = new Promise( ( resolve ) => {
    webBridge.onMessage( 'loaded', resolve )
  } )
  await loaded
  const onLoad: FunctionVoid | undefined = loadHandlerRef.current
  if( onLoad === undefined ) { return }
  onLoad()
  loadWebBridgeHandlerRef.current( webBridge )
}

interface UseLoadEventArgs {
  webBridge: MessageSystem
  onLoad: FunctionVoid | undefined
  onLoadWebBridge( webBridge:MessageSystem ): void
}

export function useLoadEvent( args:UseLoadEventArgs ) {

  const { webBridge, onLoad, onLoadWebBridge } = args
  const [ eventSuscribed, setEventSuscribed ] = useState( false )
  const loadHandlerRef = useRef( onLoad )
  const loadWebBridgeHandlerRef = useRef( onLoadWebBridge )

  useEffect( () => {
    if( webBridge === null ) { return }
    if( eventSuscribed ) { return }
    waitLoadEvent( { webBridge, loadHandlerRef, loadWebBridgeHandlerRef } )
    setEventSuscribed( true )
  }, [ webBridge, eventSuscribed, loadHandlerRef, loadWebBridgeHandlerRef ] )

}
