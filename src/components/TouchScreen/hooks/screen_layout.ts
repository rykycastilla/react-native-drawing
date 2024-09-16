import { DEFAULT_LAYOUT } from '../constants'
import { MutableRefObject, useCallback, useEffect } from 'react'
import { ScreenLayout } from '../models'
import { useState } from 'react'

export function useScreenLayout( screenRef:MutableRefObject<HTMLDivElement|null> ): ScreenLayout {

  const [ layout, setLayout ] = useState( DEFAULT_LAYOUT )

  const buildLayout = useCallback( () => {
    const $screen: HTMLDivElement | null = screenRef.current
    if( $screen === null ) { return }
    const { width, height, top, left } = $screen.getBoundingClientRect()
    const layout = new ScreenLayout( width, height, top, left )
    setLayout( layout )
  }, [ screenRef, setLayout ] )

  useEffect( () => {
    buildLayout()
  }, [ buildLayout ] )

  useEffect( () => {
    const $display: HTMLDivElement | null = screenRef.current
    if( $display === null ) { return }
    $display.addEventListener( 'resize', () => buildLayout() )
    return () => $display.removeEventListener( 'resize', () => buildLayout() )
  }, [ screenRef, buildLayout ] )

  return layout

}
