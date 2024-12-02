import { GridDisplay } from '../controllers'
import { useCallback, useState } from 'react'

interface UseGridDisplayResult {
  gridDisplay: GridDisplay | null
  onContextCreate( context:CanvasRenderingContext2D ): void
}

export function useGridDisplay( resolution:number ): UseGridDisplayResult {

  const [ gridDisplay, setGridDisplay ] = useState<GridDisplay|null>( null )

  const onContextCreate = useCallback( ( context:CanvasRenderingContext2D ) => {
    const gridDisplay = new GridDisplay( resolution, context )
    setGridDisplay( gridDisplay )
  }, [ resolution ] )

  return { gridDisplay, onContextCreate }

}
