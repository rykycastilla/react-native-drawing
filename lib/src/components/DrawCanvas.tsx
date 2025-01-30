import WebContainer, { ScrollHandler } from './WebContainer'
import { DEFAULT_ASPECT_RATIO } from '../constants'
import { DrawCanvasProps as PublicDrawCanvasProps } from '../types/DrawCanvasProps'
import { MessageSystem } from '../shared/utils/MessageSystem'
import { ReactElement } from 'react'
import { useCallback, useRef } from 'react'
import { useDrawState } from '../hooks/draw_state'
import { useGridGuard } from '../hooks/grid_guard'
import { useViewResizer } from '../hooks/view_resizer'
import { useWebBridge } from '../hooks/web_bridge'
import { useWebMessage } from '../hooks/web_message'
import { webSource } from '../utils/web_source'
import { WebView, WebViewMessageEvent } from 'react-native-webview'

// @ts-expect-error - JSDoc Type
import { InvalidGridError } from '../errors'  // eslint-disable-line

interface DrawCanvasProps extends PublicDrawCanvasProps {
  onWebBridge( webBridge:MessageSystem ): void
  onNewState(): void
  dispatchScrollEvent: ScrollHandler
}

/**
 * @throws { InvalidGridError }
*/
const DrawCanvas = ( props:DrawCanvasProps ): ReactElement => {

  const {
    width = '100%', aspectRatio = DEFAULT_ASPECT_RATIO, grid,
    onWebBridge, onNewState, dispatchScrollEvent,
  } = props

  const webViewRef = useRef<WebView|null>( null )
  const { receive, suscribe, postMessage } = useWebMessage( webViewRef )
  const { webBridge, onLoadWebView } = useWebBridge( suscribe, postMessage, onWebBridge )
  useGridGuard( grid )
  useViewResizer( webBridge, width, aspectRatio )
  useDrawState( webBridge, props, onNewState )

  const onMessage = useCallback( ( event:WebViewMessageEvent ) => {
    const { data } = event.nativeEvent
    receive( data )
  }, [ receive ] )

  return (
    <WebContainer
      ref={ webViewRef }
      width={ width }
      aspectRatio={ aspectRatio }
      source={ webSource }
      onLoad={ onLoadWebView }
      onMessage={ onMessage }
      onScroll={ dispatchScrollEvent } />
  )

}

export default DrawCanvas
