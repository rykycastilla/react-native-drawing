import WebContainer, { ViewportWidth } from './WebContainer'
import * as Hooks from '../hooks'
import { DEFAULT_ASPECT_RATIO } from '../constants'
import { ForwardedRef, ReactElement } from 'react'
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react'
import { EyeDropperEvent, HistoryEvent, IDraw, LoadEvent } from '../services'
import { Tool } from '../shared/modules/tools/models'
import { webSource } from '../utils/web_source'
import { WebView, WebViewMessageEvent } from 'react-native-webview'

// @ts-expect-error - JSDoc Type
import { InvalidGridError } from '../errors'  // eslint-disable-line

interface Draw extends IDraw {}

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
  onLoad?: ( event:LoadEvent ) => void
  onEyeDropper?: ( event:EyeDropperEvent ) => Promise<void> | void
  onHistoryMove?: ( event:HistoryEvent ) => Promise<void> | void
}

/**
 * @throws { InvalidGridError }
*/
const Draw = forwardRef( ( props:DrawProps, ref:ForwardedRef<Draw|null> ): ReactElement => {

  const {
    width = '100%', aspectRatio = DEFAULT_ASPECT_RATIO, grid, onLoad, onEyeDropper, onHistoryMove,
  } = props

  const webViewRef = useRef<WebView|null>( null )
  const { receive, suscribe, postMessage } = Hooks.useWebMessage( webViewRef )
  const { webBridge, onLoadWebView } = Hooks.useWebBridge( suscribe, postMessage )
  const draw = Hooks.useDraw( props, webBridge )
  Hooks.useGridGuard( grid )
  Hooks.useViewResizer( webBridge, width, aspectRatio )
  Hooks.useDrawState( webBridge, props )
  Hooks.useEvents( { onEyeDropper, onHistoryMove, onLoad, draw } )

  useImperativeHandle( ref, () => {
    return draw
  }, [ draw ] )

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

} )

export default Draw
