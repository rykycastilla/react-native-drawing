import { CanvasDisplay } from '../controllers'
import { DrawingBoard } from '../models'
import { useMemo } from 'react'

export function useDrawingBoard( $canvas:HTMLCanvasElement|null ): DrawingBoard {
  return useMemo( () => {
    return ( $canvas === null )
      ? CanvasDisplay.createEmpty()
      : new CanvasDisplay( $canvas )
  }, [ $canvas ] )
}
