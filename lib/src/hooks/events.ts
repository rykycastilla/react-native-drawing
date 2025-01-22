import { Draw } from '../services'
import { EventHandler, EventType } from '../utils/EventDispatcher'
import { EventListener, EyeDropperEvent, FillingEvent, HistoryEvent, LoadEvent } from '../services'
import { ScrollEvent } from '../services'
import { useCallback, useEffect, useRef } from 'react'

function useEvent<T extends EventType<EventListener>>(
  type:T, handler:EventHandler<T,EventListener>|undefined, draw:Draw,
) {

  const handlerRef = useRef<EventHandler<T,EventListener>|undefined>( handler )

  // Wrapping current event function (main handler) in a ref
  useEffect( () => {
    handlerRef.current = handler
  }, [ handlerRef, handler ] )

  // Creating base handler to execute the proivded function
  const handle = useCallback( ( event:unknown ) => {
    if( handlerRef.current === undefined ) { return }
    handlerRef.current( event as any )  // eslint-disable-line
  }, [ handlerRef ] )

  // Executing base event
  useEffect( () => {
    draw.addEventListener( type, handle as any )  // eslint-disable-line
    return () => draw.removeEventListener( type, handle as any )  // eslint-disable-line
  }, [ draw, handle ] )  // eslint-disable-line

}

interface UseEventsArgs {
  onEyeDropper?: ( event:EyeDropperEvent ) => Promise<void> | void
  onFilling?: ( event:FillingEvent ) => Promise<void> | void
  onHistoryMove?: ( event:HistoryEvent ) => Promise<void> | void
  onLoad?: ( event:LoadEvent ) => Promise<void> | void
  onScroll?: ( event:ScrollEvent ) => Promise<void> | void
  draw: Draw
}

export function useEvents( args:UseEventsArgs ) {
  const { onEyeDropper, onFilling, onHistoryMove, onLoad, onScroll, draw } = args
  useEvent( 'eye-dropper', onEyeDropper, draw )
  useEvent( 'filling', onFilling, draw )
  useEvent( 'history-move', onHistoryMove, draw )
  useEvent( 'load', onLoad, draw )
  useEvent( 'scroll', onScroll, draw )
}
