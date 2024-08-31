import Expo2DContext from 'expo-2d-context'
import { ExpoWebGLRenderingContext } from 'expo-gl'
import { GridDisplay } from '../controllers'
import { useCallback, useState } from 'react'

interface UseGridDisplayResult {
  gridDisplay: GridDisplay | null
  onContextCreate( gl:ExpoWebGLRenderingContext ): void
}

export function useGridDisplay(): UseGridDisplayResult {

  const [ gridDisplay, setGridDisplay ] = useState<GridDisplay|null>( null )

  const onContextCreate = useCallback( ( gl:ExpoWebGLRenderingContext ) => {
    const context = new Expo2DContext( gl )
    const gridDisplay = new GridDisplay( context )
    setGridDisplay( gridDisplay )
  }, [] )

  return { gridDisplay, onContextCreate }

}
