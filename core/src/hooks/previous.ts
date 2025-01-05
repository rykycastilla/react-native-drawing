import { useEffect, useRef, useState } from 'react'

export function usePrevious<T>( newState:T ): T | null {

  const [ previous, setPrevious ] = useState<T|null>( null )
  const currentRef = useRef<T|null>( null )

  useEffect( () => {
    setPrevious( currentRef.current )
    currentRef.current = newState
  }, [ newState, currentRef ] )

  return previous
}
