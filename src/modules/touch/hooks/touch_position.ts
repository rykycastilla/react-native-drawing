import { TouchService } from '../services'
import { MutableRefObject, useCallback, useEffect } from 'react'
import { usePositionHandler } from './position_handler'
import { useTouchService } from './touch_service'

interface UseTouchPositionArgs {
  screenRef: MutableRefObject<HTMLCanvasElement|null>
}

interface UseTouchPositionResult {
  touchService: TouchService
}

export function useTouchPosition( args:UseTouchPositionArgs ): UseTouchPositionResult {

  const { screenRef } = args
  const touchService: TouchService = useTouchService()
  const { onTouchStart, onTouchMove, onTouchEnd } = usePositionHandler( touchService )

  const suscribeTouches = useCallback( ( $screen:HTMLCanvasElement ) => {
    $screen.addEventListener( 'touchstart', onTouchStart )
    $screen.addEventListener( 'touchmove', onTouchMove )
    $screen.addEventListener( 'touchend', onTouchEnd )
  }, [ onTouchStart, onTouchMove, onTouchEnd ] )

  const unsuscribeTouches = useCallback( ( $screen:HTMLCanvasElement ) => {
    $screen.removeEventListener( 'touchstart', onTouchStart )
    $screen.removeEventListener( 'touchmove', onTouchMove )
    $screen.removeEventListener( 'touchend', onTouchEnd )
  }, [ onTouchStart, onTouchMove, onTouchEnd ] )

  useEffect( () => {
    const $screen: HTMLCanvasElement = screenRef.current!
    suscribeTouches( $screen )
    return () => unsuscribeTouches( $screen )
  }, [ screenRef, suscribeTouches, unsuscribeTouches ] )

  return { touchService }

}
