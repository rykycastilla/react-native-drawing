import { GridDisplay } from '../controllers'
import { useCallback, useState } from 'react'

interface UseGridDisplayResult {
  gridDisplay: GridDisplay | null
  onContextCreate( context:CanvasRenderingContext2D ): void
}

export function useGridDisplay(): UseGridDisplayResult {

  const [ gridDisplay, setGridDisplay ] = useState<GridDisplay|null>( null )

  const onContextCreate = useCallback( ( context:CanvasRenderingContext2D ) => {
    const gridDisplay = new GridDisplay( context )
    setGridDisplay( gridDisplay )
  }, [] )

  return { gridDisplay, onContextCreate }

}
