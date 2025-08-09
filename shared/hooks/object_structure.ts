import { useMemo, useRef } from 'react'

/**
 * Only updates state when detects changes in the structure.
 * It is useful to avoid unnecessary re-renders with literal objects.
 */
export function useObjectStructure<T extends object>( object:T ): T {

  const previousObjectRef = useRef<T|null>( null )
  const previousStructRef = useRef<string>( '' )

  return useMemo( () => {
    const struct: string = JSON.stringify( object )
    if( ( struct !== previousStructRef.current ) || ( previousObjectRef.current === null ) ) {
      previousObjectRef.current = object
      previousStructRef.current = struct
      return object
    }
    return previousObjectRef.current
  }, [ object ] )

}
