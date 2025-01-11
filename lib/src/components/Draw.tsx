import WebContainer, { ViewportWidth } from './WebContainer'
import * as Hooks from '../hooks'
import { ReactElement, useCallback, useRef } from 'react'
import { Tool } from '../shared/modules/tools/models'
import { webSource } from '../utils/web_source'
import { WebView, WebViewMessageEvent } from 'react-native-webview'

// @ts-expect-error - JSDoc Type
import { InvalidGridError } from '../errors'  // eslint-disable-line

export interface DrawProps {
  width?: ViewportWidth
  aspectRatio?: number
  resolution: number
  color: string
  grid?: number | [ number, number ]
  antialiasing?: boolean
  tool: Tool
  toolSize?: number
  spryParticles?: { amount?:number, scale?:number }
  onLoad?: () => void
  onEyeDropper?: ( color:string ) => void
}

/**
 * @throws { InvalidGridError }
*/
const Draw = ( props:DrawProps ): ReactElement => {

  const { width = '100%', aspectRatio = 1, grid, onLoad, onEyeDropper } = props
  const webViewRef = useRef<WebView|null>( null )
  const { receive, suscribe, postMessage } = Hooks.useWebMessage( webViewRef )
  const { webBridge, onLoadWebView } = Hooks.useWebBridge( suscribe, postMessage )
  Hooks.useGridGuard( grid )
  Hooks.useViewResizer( webBridge, width )
  Hooks.useDrawState( webBridge, props )
  Hooks.useLoadEvent( webBridge, onLoad )
  Hooks.useEyeDropperEvent( { webBridge, onEyeDropper } )

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
      onMessage={ onMessage } />
  )

}

export default Draw
