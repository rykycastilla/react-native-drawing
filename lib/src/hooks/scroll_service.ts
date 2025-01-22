import { ScrollService, View } from '../services'
import { useCallback, useEffect, useMemo } from 'react'
import { WebViewProps } from 'react-native-webview'

type NativeScrollHandler = NonNullable<WebViewProps[ 'onScroll' ]>
type NativeScrollEvent = Parameters<NativeScrollHandler>[ 0 ]

interface UseScrollServiceResult {
  scrollService: ScrollService
  dispatchScrollEvent( event:NativeScrollEvent ): void
}

export function useScrollService( width:number, aspectRatio:number ): UseScrollServiceResult {

  const height: number = width / aspectRatio

  // Creating service
  const scrollService: ScrollService = useMemo( () => {
    const container: View = { width, height }
    return new ScrollService( container )
  }, [] )  // eslint-disable-line

  // Setting new container when it changes its dimensions
  useEffect( () => {
    const container: View = { width, height }
    scrollService.setContainer( container )
  }, [ scrollService, width, height ] )

  // Dispatch scroll event
  const dispatchScrollEvent = useCallback( ( event:NativeScrollEvent ) => {
    const { nativeEvent } = event
    const container: View = nativeEvent.contentSize
    const view: View = nativeEvent.layoutMeasurement
    const { x, y } = nativeEvent.contentOffset
    scrollService.dispatchScrollEvent( container, view, x, y )
  }, [ scrollService ] )

  return { scrollService, dispatchScrollEvent }

}
