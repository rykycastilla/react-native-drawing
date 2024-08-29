import { GestureResponderEvent } from 'react-native'
import { TouchService } from '../services'
import { useTouchService } from './touch_service'

interface PositionHandlers {
  onTouchStart( event:GestureResponderEvent ): void
  onTouchMove( event:GestureResponderEvent ): void
  onTouchEnd( event:GestureResponderEvent ): void
}

interface UseTouchPositionResult {
  touch: TouchService
  positionHandlers: PositionHandlers
}

export function useTouchPosition(): UseTouchPositionResult {

  const touch: TouchService = useTouchService()

  const onTouchStart = ( event:GestureResponderEvent ) => {
    const { identifier, pageX, pageY } = event.nativeEvent
    touch.start( identifier, pageX, pageY )
  }

  const onTouchMove = ( event:GestureResponderEvent ) => {
    const { identifier, pageX, pageY } = event.nativeEvent
    touch.move( identifier, pageX, pageY )
  }

  const onTouchEnd = ( event:GestureResponderEvent ) => {
    const { identifier } = event.nativeEvent
    touch.end( identifier )
  }

  const positionHandlers = { onTouchStart, onTouchMove, onTouchEnd }

  return { touch, positionHandlers }

}
