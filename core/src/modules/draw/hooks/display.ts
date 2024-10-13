import { CanvasDisplay } from '../controllers'
import { useMemo } from 'react'

interface UseDisplayResult {
  display: CanvasDisplay
  loadDisplay: ( context:CanvasRenderingContext2D ) => void
}

export function useDisplay(): UseDisplayResult {

  const display: CanvasDisplay = useMemo( () => {
    return new CanvasDisplay( console )
  }, [] )

  const loadDisplay = ( context:CanvasRenderingContext2D ) => {
    display.setContext( context )
  }

  return { display, loadDisplay }

}
