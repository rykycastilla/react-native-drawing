import Draw from '@components/Draw'
import { Bridge, useNativeDrawProps } from '@hooks/native_draw_props'
import { DrawPropsDTO } from '@shared/utils/types/DrawPropsDTO'
import { ReactElement } from 'react'
import { RNBridge } from '@utils/RNBridge'
import { Tool } from '@tools/services'

const App = (): ReactElement | null => {

  const nativeDrawProps: DrawPropsDTO<Tool> | null = useNativeDrawProps( RNBridge as Bridge )
  if( nativeDrawProps === null ) { return null }

  const handleLoad = () => {
    RNBridge.postMessage( 'loaded', {} )
  }

  return <Draw { ...nativeDrawProps } onLoad={ handleLoad } />

}

export default App
