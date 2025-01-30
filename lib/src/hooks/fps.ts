import Draw from '../components/Draw'
import { FpsStateManager, WebDraw } from '../services'
import { MutableRefObject, useEffect, useState } from 'react'
import { useDrawRefFilter } from './draw_ref_filter'

/**
 * Receive a draw ref to get the fps state of its draw
*/
export function useFps( drawRef:MutableRefObject<Draw|null> ): number {

  const [ fps, setFps ] = useState( 0 )
  useDrawRefFilter( useFps.name, drawRef )

  useEffect( () => {
    const draw: Draw = drawRef.current!
    if( !( draw instanceof Draw ) ) { return }
    const { webDraw } = draw as unknown as { webDraw:WebDraw }
    const { fpsStateManager } = webDraw as unknown as { fpsStateManager:FpsStateManager }
    fpsStateManager.addSetter( setFps )
    return () => fpsStateManager.removeSetter( setFps )
  }, [ drawRef, setFps ] )

  return fps

}
