import { MutableRefObject, useEffect } from 'react'

interface UseResolutionArgs {
  width: number
  height: number
  displayRef: MutableRefObject<HTMLCanvasElement|null>
}

export function useResolution( args:UseResolutionArgs ) {

  const { width, height, displayRef } = args

  useEffect( () => {
    const $display: HTMLCanvasElement = displayRef.current!
    $display.width = width
    $display.height = height
  }, [ width, height, displayRef ] )

}
