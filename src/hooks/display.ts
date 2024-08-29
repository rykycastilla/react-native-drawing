import Expo2DContext from 'expo-2d-context'
import { CanvasDisplay } from '../controller'
import { ExpoWebGLRenderingContext } from 'expo-gl'
import { useMemo } from 'react'

interface Expo2DContextConstructor {
  new ( gl:ExpoWebGLRenderingContext ): Expo2DContext
}

const Expo2DContextObject = Expo2DContext as unknown as Expo2DContextConstructor

interface UseDisplayResult {
  display: CanvasDisplay
  onContextCreate: ( gl:ExpoWebGLRenderingContext ) => void
}

export function useDisplay(): UseDisplayResult {

  const display: CanvasDisplay = useMemo( () => {
    return new CanvasDisplay( console )
  }, [] )

  const onContextCreate = ( gl:ExpoWebGLRenderingContext ) => {
    const context = new Expo2DContextObject( gl )
    display.setContext( context )
  }

  return { display, onContextCreate }

}
