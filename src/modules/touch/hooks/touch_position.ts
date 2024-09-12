import { TouchService } from '../services'
import { useTouchService } from './touch_service'

interface PositionHandlers {
  onTouchStart( event:TouchEvent ): void
  onTouchMove( event:TouchEvent ): void
  onTouchEnd( event:TouchEvent ): void
}

interface UseTouchPositionResult {
  touchService: TouchService
  positionHandlers: PositionHandlers
}

export function useTouchPosition(): UseTouchPositionResult {

  const touchService: TouchService = useTouchService()

  const onTouchStart = ( event:TouchEvent ) => {
    event.preventDefault()
    for( const touch of event.changedTouches ) {
      const { identifier, clientX, clientY } = touch
      touchService.start( identifier, clientX, clientY )
    }
  }

  const onTouchMove = ( event:TouchEvent ) => {
    event.preventDefault()
    for( const touch of event.changedTouches ) {
      const { identifier, clientX, clientY } = touch
      touchService.move( identifier, clientX, clientY )
    }
  }

  const onTouchEnd = ( event:TouchEvent ) => {
    event.preventDefault()
    for( const touch of event.changedTouches ) {
      touchService.end( touch.identifier )
    }
  }

  const positionHandlers = { onTouchStart, onTouchMove, onTouchEnd }

  return { touchService, positionHandlers }

}
