import { DEFAULT_LAYOUT } from '../constants'
import { DisplayLayout } from '../models'
import { ForwardedRef, MutableRefObject } from 'react'
import { useCallback, useEffect, useImperativeHandle, useState } from 'react'

interface UseLayoutManagerArgs {
  ref:ForwardedRef<DisplayLayout>
  displayRef:MutableRefObject<HTMLCanvasElement|null>
}

interface UseLayoutManagerResult {
  onResize(): void
}

export function useLayoutManager( args:UseLayoutManagerArgs ): UseLayoutManagerResult {

  const { ref, displayRef } = args
  const [ layout, setLayout ] = useState( DEFAULT_LAYOUT )

  useImperativeHandle( ref, () => {
    return layout
  }, [ layout ] )

  const buildLayout = useCallback( () => {
    const $display: HTMLCanvasElement | null = displayRef.current
    if( $display === null ) { return }
    const { width, height, top, left } = $display.getBoundingClientRect()
    const layout = new DisplayLayout( width, height, top, left )
    setLayout( layout )
  }, [ displayRef ] )

  useEffect( () => {
    buildLayout()
  }, [ buildLayout ] )

  const onResize = () => {
    buildLayout()
  }

  return { onResize }

}
