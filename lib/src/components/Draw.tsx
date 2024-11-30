import { ReactElement, ForwardedRef, forwardRef, useCallback, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { Tool } from '../models'
import { useDrawState, useWebBridge, useWebMessage } from '../hooks'
import { webSource } from '../utils/web_source'
import { WebView, WebViewMessageEvent, WebViewProps } from 'react-native-webview'

interface WebContainerProps extends WebViewProps {}

const WebContainer = forwardRef( ( props:WebContainerProps, ref:ForwardedRef<WebView> ): ReactElement => {
  return (
    <View style={ styles.webContainer }>
      <WebView ref={ ref } { ...props } />
    </View>
  )
} )

export interface DrawProps {
  resolution: number
  color: string
  tool: Tool
  showGrid?: boolean
  toolSize?: number
}

const Draw = ( props:DrawProps ): ReactElement => {
  const webViewRef = useRef<WebView|null>( null )
  const { receive, suscribe, postMessage } = useWebMessage( webViewRef )
  const { webBridge, onLoadWebView } = useWebBridge( suscribe, postMessage )
  useDrawState( webBridge, props )

  const onMessage = useCallback( ( event:WebViewMessageEvent ) => {
    const { data } = event.nativeEvent
    receive( data )
  }, [ receive ] )

  return (
    <WebContainer webviewDebuggingEnabled
      ref={ webViewRef }
      source={ webSource }
      onLoad={ onLoadWebView }
      onMessage={ onMessage } />
  )

}

const styles = StyleSheet.create( {
  webContainer: {
    width: '100%',
    aspectRatio: 1,
  },
} )

export default Draw
