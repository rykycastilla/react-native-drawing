import { ForwardedRef, MutableRefObject } from 'react'
import { useEffect, useImperativeHandle, useState } from 'react'

interface UseDisplayRefArgs {
  ref: ForwardedRef<HTMLCanvasElement|null>
  displayRef:MutableRefObject<HTMLCanvasElement|null>
}

export function useDisplayRef( args:UseDisplayRefArgs ) {

  const { ref, displayRef } = args
  const [ display, setDisplay ] = useState<HTMLCanvasElement|null>( null )

  useImperativeHandle( ref, () => {
    return display!
  }, [ display ] )

  useEffect( () => {
    const $display: HTMLCanvasElement | null = displayRef.current
    if( $display === null ) { return }
    setDisplay( $display )
  }, [ displayRef ] )

}
