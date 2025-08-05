import { MutableRefObject, useCallback, useEffect, useState } from 'react'

/**
 * Custom hook to get the layout (width and height) of a DOM element.
 */
export function useElemLayout( elemRef: MutableRefObject<HTMLElement|null> ): [ number, number ] {

  const [ layout, setLayout ] = useState<[number,number]>( [ 0, 0 ] )

  const updateLayout = useCallback( ( elem:HTMLElement ) => {
    const { width, height } = elem.getBoundingClientRect()
    setLayout( [ width, height ] )
  }, [] )

  useEffect( () => {
    const elem: HTMLElement | null = elemRef.current
    if( elem === null ) { return }
    const observer = new ResizeObserver( () => updateLayout( elem ) )
    observer.observe( elem )
    return () => observer.disconnect()
  }, [ elemRef, updateLayout ] )

  return layout
}
