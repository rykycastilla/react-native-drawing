import Expo2DContext from 'expo-2d-context'
import { CanvasDisplay } from '../controllers'
import { ExpoWebGLRenderingContext } from 'expo-gl'
import { useMemo } from 'react'

interface UseDisplayResult {
  display: CanvasDisplay
  onContextCreate: ( gl:ExpoWebGLRenderingContext ) => void
}

export function useDisplay( resolution:number ): UseDisplayResult {

  const display: CanvasDisplay = useMemo( () => {
    return new CanvasDisplay( resolution, console )
  }, [ resolution ] )

  const onContextCreate = ( gl:ExpoWebGLRenderingContext ) => {
    const context = new Expo2DContext( gl )
    display.setContext( context )
  }

  return { display, onContextCreate }

}
