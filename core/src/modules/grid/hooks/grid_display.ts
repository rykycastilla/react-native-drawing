import { GridDisplay } from '../controllers'
import { useCallback, useState } from 'react'

interface UseGridDisplayResult {
  gridDisplay: GridDisplay | null
  onCanvasCreate( canvas:HTMLCanvasElement ): void
}

export function useGridDisplay(): UseGridDisplayResult {

  const [ gridDisplay, setGridDisplay ] = useState<GridDisplay|null>( null )

  const onCanvasCreate = useCallback( ( canvas:HTMLCanvasElement ) => {
    const context: CanvasRenderingContext2D = canvas.getContext( '2d' )!
    const gridDisplay = new GridDisplay( context )
    setGridDisplay( gridDisplay )
  }, [] )

  return { gridDisplay, onCanvasCreate }

}
