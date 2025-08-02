import Draw from '@components/Draw'
import { Bridge, useNativeDrawProps } from '@hooks'
import { DrawPropsDTO } from '@shared/utils/types/DrawPropsDTO'
import { ReactElement, useEffect } from 'react'
import { RNBridge } from '@utils/RNBridge'
import { Tool } from '@shared/modules/tools/models'

const App = (): ReactElement | null => {

  const nativeDrawProps: DrawPropsDTO<Tool> | null = useNativeDrawProps( RNBridge as Bridge )

  useEffect( () => {
    RNBridge.prepareNativeSide()
  }, [] )

  if( nativeDrawProps === null ) { return null }

  const handleLoad = () => {
    RNBridge.postMessage( 'load', {} )
  }

  return <Draw { ...nativeDrawProps } onLoad={ handleLoad } />

}

export default App
