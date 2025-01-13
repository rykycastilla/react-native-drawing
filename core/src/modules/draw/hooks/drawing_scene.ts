import { SceneDisplay } from '../controllers'
import { DrawingScene } from '../models'
import { useMemo } from 'react'

export function useDrawingScene( $canvas:HTMLCanvasElement|null ): DrawingScene {
  return useMemo( () => {
    return ( $canvas === null )
      ? SceneDisplay.createEmpty()
      : new SceneDisplay( $canvas )
  }, [ $canvas ] )
}
