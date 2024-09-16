import { ForwardedRef, MutableRefObject } from 'react'
import { useCallback } from 'react'

interface UseDisplayRefArgs {
  ref: ForwardedRef<HTMLCanvasElement|null>
  displayRef:MutableRefObject<HTMLCanvasElement|null>
}

interface UseDisplayRefResult {
  setRef( $element:HTMLCanvasElement ): void
}

export function useDisplayRef( args:UseDisplayRefArgs ): UseDisplayRefResult {

  const { ref, displayRef } = args

  const setRef = useCallback( ( $element:HTMLCanvasElement ) => {
    displayRef.current = $element
    if( typeof ref === 'function' ) { ref( $element ) }
    else if( ref !== null ) { ref.current = $element }
  }, [ ref, displayRef ] )

  return { setRef }

}
