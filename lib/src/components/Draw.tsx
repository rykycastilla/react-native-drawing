import { ReactElement, ForwardedRef, forwardRef, useCallback, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { Tool } from '../models'
import { useDrawState, useGridGuard, useLoadEvent, useWebBridge, useWebMessage } from '../hooks'
import { webSource } from '../utils/web_source'
import { WebView, WebViewMessageEvent, WebViewProps } from 'react-native-webview'

// @ts-expect-error - JSDoc Type
import { InvalidGridError } from '../errors'  // eslint-disable-line

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
  grid?: number
  tool: Tool
  toolSize?: number
  onLoad?: () => void
}

/**
 * @throws { InvalidGridError }
*/
const Draw = ( props:DrawProps ): ReactElement => {

  const { grid, onLoad } = props
  const webViewRef = useRef<WebView|null>( null )
  const { receive, suscribe, postMessage } = useWebMessage( webViewRef )
  const { webBridge, onLoadWebView } = useWebBridge( suscribe, postMessage )
  useGridGuard( grid )
  useDrawState( webBridge, props )
  useLoadEvent( webBridge, onLoad )

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
