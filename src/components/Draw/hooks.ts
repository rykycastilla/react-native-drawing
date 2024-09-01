import { LoadEventCallback } from './types'
import { useEffect, useState } from 'react'

interface UseLoaderResult {
  setDisplayLoaded( loaded:boolean ): void
  setGridLoaded( loaded:boolean ): void
}

export function useLoader( callback:LoadEventCallback|undefined ): UseLoaderResult {

  const [ displayLoaded, setDisplayLoaded ] = useState( false )
  const [ gridLoaded, setGridLoaded ] = useState( false )

  useEffect( () => {
    if( callback === undefined ) { return }
    if( displayLoaded && gridLoaded ) { callback() }
  }, [ displayLoaded, gridLoaded ] )  // eslint-disable-line

  return { setDisplayLoaded, setGridLoaded }

}
