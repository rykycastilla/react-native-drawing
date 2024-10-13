import Draw from '@components/Draw'
import { Bridge, NativeDrawProps, useNativeDrawProps } from '@hooks/native_draw_props'
import { ReactElement } from 'react'
import { RNBridge } from '@utils/RNBridge'

const App = (): ReactElement | null => {
  const nativeDrawProps: NativeDrawProps | null = useNativeDrawProps( RNBridge as Bridge )
  if( nativeDrawProps === null ) { return null }
  return <Draw { ...nativeDrawProps } />
}

export default App
