import { TouchService } from '../services'
import { useCallback } from 'react'

interface UsePositionHandlersResult {
  onTouchStart( event:TouchEvent ): void
  onTouchMove( event:TouchEvent ): void
  onTouchEnd( event:TouchEvent ): void
}

export function usePositionHandler( touchService:TouchService ): UsePositionHandlersResult {

  const onTouchStart = useCallback( ( event:TouchEvent ) => {
    event.preventDefault()
    for( const touch of event.changedTouches ) {
      const { identifier, clientX, clientY } = touch
      touchService.start( identifier, clientX, clientY )
    }
  }, [ touchService ] )

  const onTouchMove = useCallback( ( event:TouchEvent ) => {
    event.preventDefault()
    for( const touch of event.changedTouches ) {
      const { identifier, clientX, clientY } = touch
      touchService.move( identifier, clientX, clientY )
    }
  }, [ touchService ] )

  const onTouchEnd = useCallback( ( event:TouchEvent ) => {
    event.preventDefault()
    for( const touch of event.changedTouches ) {
      touchService.end( touch.identifier )
    }
  }, [ touchService ] )

  return { onTouchStart, onTouchMove, onTouchEnd }

}
