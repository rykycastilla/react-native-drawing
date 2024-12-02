import { MessageSystem } from '../shared/utils/MessageSystem'
import { Ref } from '../utils/Ref'
import { useEffect, useMemo, useState } from 'react'

type FunctionVoid = () => void

function useLoadHandlerRef( onLoad:FunctionVoid|undefined ): Ref<FunctionVoid|undefined> {

  const loadHandlerRef: Ref<FunctionVoid|undefined> = useMemo( () => {
    return new Ref<FunctionVoid|undefined>( undefined )
  }, [] )

  useEffect( () => {
    loadHandlerRef.setValue( onLoad )
  }, [ loadHandlerRef, onLoad ] )

  return loadHandlerRef

}

async function waitLoadEvent( webBridge:MessageSystem, loadHandlerRef:Ref<FunctionVoid|undefined> ) {
  const loaded = new Promise( ( resolve ) => {
    webBridge.onMessage( 'loaded', resolve )
  } )
  await loaded
  const onLoad: FunctionVoid | undefined = loadHandlerRef.current
  if( onLoad === undefined ) { return }
  onLoad()
}

export function useLoadEvent( webBridge:MessageSystem|null, onLoad:FunctionVoid|undefined ) {

  const [ eventSuscribed, setEventSuscribed ] = useState( false )
  const loadHandlerRef: Ref<FunctionVoid|undefined> = useLoadHandlerRef( onLoad )

  useEffect( () => {
    if( webBridge === null ) { return }
    if( eventSuscribed ) { return }
    waitLoadEvent( webBridge, loadHandlerRef )
    setEventSuscribed( true )
  }, [ webBridge, eventSuscribed, loadHandlerRef ] )

}
