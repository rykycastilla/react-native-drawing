import { ForwardedRef, forwardRef, ReactElement } from 'react'
import { PRODUCTION } from '../../../.env.json'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { WebView, WebViewMessageEvent, WebViewProps } from 'react-native-webview'

type ViewportWidth = NonNullable<ViewStyle[ 'width' ]>
type WebViewSource = NonNullable<WebViewProps[ 'source' ]>

interface WebContainerProps {
  width: ViewportWidth
  source: WebViewSource
  onLoad(): void
  onMessage( event:WebViewMessageEvent ): void
}

const WebContainer = forwardRef( ( props:WebContainerProps, ref:ForwardedRef<WebView|null> ): ReactElement => {
  const { width, source, onLoad, onMessage } = props
  return (
    <View style={ { width, ...styles.webContainer } }>
      <WebView
        ref={ ref }
        webviewDebuggingEnabled={ !PRODUCTION }
        source={ source }
        onLoad={ onLoad }
        onMessage={ onMessage } />
    </View>
  )
} )

const styles = StyleSheet.create( {
  webContainer: {
    aspectRatio: 1,
  },
} )

export default WebContainer
export type { ViewportWidth }
