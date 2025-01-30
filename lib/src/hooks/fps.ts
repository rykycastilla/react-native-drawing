import Draw from '../components/Draw'
import { FpsStateManager, DrawCore } from '../services'
import { MutableRefObject, useEffect, useState } from 'react'
import { UnexpectedTargetError } from '../errors'

/**
 * Receive a draw ref to get the fps state of its draw
*/
export function useFps( drawRef:MutableRefObject<Draw|null> ): number {

  const [ fps, setFps ] = useState( 0 )

  useEffect( () => {
    const draw: Draw = drawRef.current!
    if( !( draw instanceof Draw ) ) {
      throw new UnexpectedTargetError( useFps.name, draw, Draw )
    }
    const { core } = draw as unknown as { core:DrawCore }
    const { fpsStateManager } = core as unknown as { fpsStateManager:FpsStateManager }
    fpsStateManager.addSetter( setFps )
    return () => fpsStateManager.removeSetter( setFps )
  }, [ drawRef, setFps ] )

  return fps

}
