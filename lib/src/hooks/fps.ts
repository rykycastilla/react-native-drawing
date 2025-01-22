import { Draw as DrawObject, IDraw, FpsStateManager } from '../services'
import { MutableRefObject, useEffect, useState } from 'react'
import { UnexpectedTargetError } from '../errors'

interface Draw extends IDraw {}

/**
 * Receive a draw ref to get the fps state of its draw
*/
export function useFps( drawRef:MutableRefObject<Draw|null> ): number {

  const [ fps, setFps ] = useState( 0 )

  useEffect( () => {
    const draw: Draw = drawRef.current!
    if( !( draw instanceof DrawObject ) ) {
      throw new UnexpectedTargetError( useFps.name, draw, DrawObject )
    }
    const fpsStateManager: FpsStateManager = DrawObject.extractFpsStateManager( draw )
    fpsStateManager.addSetter( setFps )
    return () => fpsStateManager.removeSetter( setFps )
  }, [ drawRef, setFps ] )

  return fps

}
