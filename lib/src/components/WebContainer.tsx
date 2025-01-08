import { ForwardedRef, forwardRef, ReactElement } from 'react'
import { PRODUCTION } from '../../../.env.json'
import { View, ViewStyle } from 'react-native'
import { WebView, WebViewMessageEvent, WebViewProps } from 'react-native-webview'

type ViewportWidth = NonNullable<ViewStyle[ 'width' ]>
type WebViewSource = NonNullable<WebViewProps[ 'source' ]>

interface WebContainerProps {
  width: ViewportWidth
  aspectRatio: number
  source: WebViewSource
  onLoad(): void
  onMessage( event:WebViewMessageEvent ): void
}

const WebContainer = forwardRef( ( props:WebContainerProps, ref:ForwardedRef<WebView|null> ): ReactElement => {
  const { width, aspectRatio, source, onLoad, onMessage } = props
  return (
    <View style={ { width, aspectRatio } }>
      <WebView
        ref={ ref }
        webviewDebuggingEnabled={ !PRODUCTION }
        source={ source }
        onLoad={ onLoad }
        onMessage={ onMessage } />
    </View>
  )
} )

export default WebContainer
export type { ViewportWidth }
