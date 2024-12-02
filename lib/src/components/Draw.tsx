import WebContainer from './WebContainer'
import { ReactElement, useCallback, useRef } from 'react'
import { Tool } from '../models'
import { useDrawState, useGridGuard, useLoadEvent, useWebBridge, useWebMessage } from '../hooks'
import { webSource } from '../utils/web_source'
import { WebView, WebViewMessageEvent } from 'react-native-webview'

// @ts-expect-error - JSDoc Type
import { InvalidGridError } from '../errors'  // eslint-disable-line

export interface DrawProps {
  resolution: number
  color: string
  grid?: number
  antialiasing?: boolean
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
    <WebContainer
      ref={ webViewRef }
      source={ webSource }
      onLoad={ onLoadWebView }
      onMessage={ onMessage } />
  )

}

export default Draw
