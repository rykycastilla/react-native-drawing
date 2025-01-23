import { TouchService } from '../services'
import { useCallback } from 'react'

interface UsePositionHandlersResult {
  onTouchStart( event:TouchEvent ): void
  onTouchMove( event:TouchEvent ): void
  onTouchEnd( event:TouchEvent ): void
}

interface UsePositionHandlerArgs {
  viewportControlAllowed: boolean
  touchService: TouchService
}

export function usePositionHandler( args:UsePositionHandlerArgs ): UsePositionHandlersResult {

  const { viewportControlAllowed, touchService } = args

  const onTouchStart = useCallback( ( event:TouchEvent ) => {
    if( !viewportControlAllowed ) { event.preventDefault() }
    for( const touch of event.changedTouches ) {
      const { identifier, clientX, clientY } = touch
      const { innerWidth, innerHeight } = window
      touchService.start( identifier, clientX, clientY, innerWidth, innerHeight )
    }
  }, [ viewportControlAllowed, touchService ] )

  const onTouchMove = useCallback( ( event:TouchEvent ) => {
    if( !viewportControlAllowed ) { event.preventDefault() }
    for( const touch of event.changedTouches ) {
      const { identifier, clientX, clientY } = touch
      touchService.move( identifier, clientX, clientY )
    }
  }, [ viewportControlAllowed, touchService ] )

  const onTouchEnd = useCallback( ( event:TouchEvent ) => {
    if( !viewportControlAllowed ) { event.preventDefault() }
    for( const touch of event.changedTouches ) {
      touchService.end( touch.identifier )
    }
  }, [ viewportControlAllowed, touchService ] )

  return { onTouchStart, onTouchMove, onTouchEnd }

}
