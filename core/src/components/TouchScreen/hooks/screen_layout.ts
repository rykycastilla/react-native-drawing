import { MutableRefObject, useCallback, useEffect } from 'react'
import { useState } from 'react'

export function useScreenLayout( screenRef:MutableRefObject<HTMLDivElement|null> ): number {

  const [ layout, setLayout ] = useState( 0 )

  // Peparing instructions to get layout information
  const buildLayout = useCallback( () => {
    const $screen: HTMLDivElement | null = screenRef.current!
    const { width } = $screen.getBoundingClientRect()
    setLayout( width )
  }, [ screenRef ] )

  // Creating by default
  useEffect( () => {
    buildLayout()
  }, [] )  // eslint-disable-line

  // Updating by browser
  useEffect( () => {
    window.addEventListener( 'resize', () => buildLayout() )
    return () => window.removeEventListener( 'resize', () => buildLayout() )
  }, [ buildLayout ] )

  return layout

}
