import { DEFAULT_LAYOUT } from '../constants'
import { MutableRefObject, useCallback, useEffect } from 'react'
import { RNBridge } from '@utils/RNBridge'
import { ScreenLayout } from '../models'
import { useRef, useState } from 'react'

export function useScreenLayout( screenRef:MutableRefObject<HTMLDivElement|null> ): ScreenLayout {

  const [ layout, setLayout ] = useState( DEFAULT_LAYOUT )
  const buildLayoutRef = useRef<( ()=>void )|null>( null )

  // Peparing instructions to get layout information
  const buildLayout = useCallback( () => {
    console.log( 'building layout...' )
    const $screen: HTMLDivElement | null = screenRef.current
    if( $screen === null ) { return }
    const { width, height, top, left } = $screen.getBoundingClientRect()
    const layout = new ScreenLayout( width, height, top, left )
    setLayout( layout )
  }, [ screenRef, setLayout ] )

  // Creating by default
  useEffect( () => {
    buildLayout()
  }, [ buildLayout ] )

  useEffect( () => {
    buildLayoutRef.current = buildLayout
  }, [ buildLayoutRef, buildLayout ] )

  // Updating by native command
  useEffect( () => {
    RNBridge.onMessage( 'resize', () => {
      if( buildLayoutRef.current === null ) { return }
      buildLayoutRef.current()
    } )
  }, [ buildLayoutRef ] )

  // Updating by browser
  useEffect( () => {
    const $display: HTMLDivElement | null = screenRef.current
    if( $display === null ) { return }
    $display.addEventListener( 'resize', () => buildLayout() )
    return () => $display.removeEventListener( 'resize', () => buildLayout() )
  }, [ screenRef, buildLayout ] )

  return layout

}
