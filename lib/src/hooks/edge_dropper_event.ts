import { MessageSystem } from '../shared/utils/MessageSystem'
import { useEffect, useRef } from 'react'

type EyeDropperCallback = ( color:string ) => void

interface UseEyeDropperEventArgs {
  webBridge: MessageSystem | null
  onEyeDropper: EyeDropperCallback | undefined
}

export function useEyeDropperEvent( args:UseEyeDropperEventArgs ) {

  const { webBridge, onEyeDropper } = args
  const eyeDropperCallbackRef = useRef( onEyeDropper )

  useEffect( () => {
    if( webBridge === null ) { return }
    webBridge.onMessage( 'eye-dropper', ( args:unknown ) => {
      const { color } = args as { color:string }
      if( eyeDropperCallbackRef.current === undefined ) { return }
      eyeDropperCallbackRef.current( color )
    } )
  }, [ webBridge, eyeDropperCallbackRef ] )

  useEffect( () => {
    eyeDropperCallbackRef.current = onEyeDropper
  }, [ eyeDropperCallbackRef, onEyeDropper ] )

}
