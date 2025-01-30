import Draw from '../components/Draw'
import { MutableRefObject, useEffect } from 'react'
import { UnexpectedTargetError } from '../errors'

/**
 * Dispatchs an error with an invalid target ref
*/
export function useDrawRefFilter( name:string, drawRef:MutableRefObject<Draw|null> ) {
  useEffect( () => {
    const draw: Draw = drawRef.current!
    if( !( draw instanceof Draw ) ) {
      throw new UnexpectedTargetError( name, draw, Draw )
    }
  }, [ drawRef, name ] )
}
