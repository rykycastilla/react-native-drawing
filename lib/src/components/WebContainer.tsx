import { ForwardedRef, forwardRef, ReactElement } from 'react'
import { PRODUCTION } from '../../../.env.json'
import { View, ViewStyle } from 'react-native'
import { WebView, WebViewMessageEvent, WebViewProps } from 'react-native-webview'

type ViewportWidth = NonNullable<ViewStyle[ 'width' ]>
type WebViewSource = NonNullable<WebViewProps[ 'source' ]>
type ScrollHandler = NonNullable<WebViewProps[ 'onScroll' ]>

interface WebContainerProps {
  width: ViewportWidth
  aspectRatio: number
  source: WebViewSource
  onMessage( event:WebViewMessageEvent ): void
  onScroll: ScrollHandler
}

const WebContainer = forwardRef( ( props:WebContainerProps, ref:ForwardedRef<WebView|null> ): ReactElement => {
  const { width, aspectRatio, source, onMessage, onScroll } = props
  return (
    <View style={ { width, aspectRatio } }>
      <WebView
        ref={ ref }
        webviewDebuggingEnabled={ !PRODUCTION }
        source={ source }
        onScroll={ onScroll }
        onMessage={ onMessage } />
    </View>
  )
} )

export default WebContainer
export type { ViewportWidth, ScrollHandler }
