import { useEffect, useState } from 'react'

interface UseLoaderResult {
  setDisplayLoaded( loaded:boolean ): void
  setGridLoaded( loaded:boolean ): void
}

type FunctionVoid = () => void

export function useLoader( callback:FunctionVoid ): UseLoaderResult {

  const [ displayLoaded, setDisplayLoaded ] = useState( false )
  const [ gridLoaded, setGridLoaded ] = useState( false )

  useEffect( () => {
    if( callback === undefined ) { return }
    if( displayLoaded && gridLoaded ) { callback() }
  }, [ displayLoaded, gridLoaded ] )  // eslint-disable-line

  return { setDisplayLoaded, setGridLoaded }

}
