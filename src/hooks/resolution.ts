import { LayoutChangeEvent } from 'react-native'
import { useState } from 'react'

interface UseResolutionResult {
  resolution: number
  onLayout( event:LayoutChangeEvent ): void
}

export function useResolution(): UseResolutionResult {

  const [ resolution, setResolution ] = useState( 0 )

  const onLayout = ( event:LayoutChangeEvent ) => {
    const { width } = event.nativeEvent.layout
    setResolution( width )
  }

  return { resolution, onLayout }

}
