import { DisplayLayout } from '../models'
import { MutableRefObject, useCallback, useEffect } from 'react'

interface UseLayoutManagerArgs {
  displayRef: MutableRefObject<HTMLCanvasElement|null>
  setLayout( layout:DisplayLayout ): void
}

export function useLayoutManager( args:UseLayoutManagerArgs ) {

  const { displayRef, setLayout } = args

  const buildLayout = useCallback( () => {
    const $display: HTMLCanvasElement | null = displayRef.current
    if( $display === null ) { return }
    const { width, height, top, left } = $display.getBoundingClientRect()
    const layout = new DisplayLayout( width, height, top, left )
    setLayout( layout )
  }, [ displayRef, setLayout ] )

  useEffect( () => {
    buildLayout()
  }, [ buildLayout ] )

  useEffect( () => {
    const $display: HTMLCanvasElement | null = displayRef.current
    if( $display === null ) { return }
    $display.addEventListener( 'resize', () => buildLayout() )
    return () => $display.removeEventListener( 'resize', () => buildLayout() )
  }, [ displayRef, buildLayout ] )

}
