import { ForwardedRef, forwardRef, ReactElement } from 'react'
import { PRODUCTION } from '../../../.env.json'
import { StyleSheet, View } from 'react-native'
import { WebView, WebViewMessageEvent, WebViewProps } from 'react-native-webview'

type WebViewSource = NonNullable<WebViewProps[ 'source' ]>

interface WebContainerProps {
  source: WebViewSource
  onLoad(): void
  onMessage( event:WebViewMessageEvent ): void
}

const WebContainer = forwardRef( ( props:WebContainerProps, ref:ForwardedRef<WebView|null> ): ReactElement => {
  const { source, onLoad, onMessage } = props
  return (
    <View style={ styles.webContainer }>
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
    width: '100%',
    aspectRatio: 1,
  },
} )

export default WebContainer
