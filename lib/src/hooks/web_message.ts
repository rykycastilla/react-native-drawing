import { MessageManager } from '../services'
import { MutableRefObject, useCallback } from 'react'
import { useMessageManager } from './message_manager'
import { WebView } from 'react-native-webview'

type MessageCallback = ( message:string ) => void

interface UseWebMessageResult {
  receive( message:string ): void
  suscribe( callback:MessageCallback ): void
  postMessage( message:string ): void
}

export function useWebMessage( webViewRef:MutableRefObject<WebView|null> ): UseWebMessageResult {

  const messageManager: MessageManager = useMessageManager()

  const receive = useCallback( ( message:string ) => {
    messageManager.receive( message )
  }, [ messageManager ] )

  const suscribe = useCallback( ( callback:MessageCallback ) => {
    messageManager.suscribe( callback )
  }, [ messageManager ] )

  const postMessage = useCallback( ( message:string ) => {
    const webView: WebView | null = webViewRef.current
    if( webView === null ) { return }
    message = JSON.stringify( message )  // Passed encoded data as JSON String (double encoding to avoid next parsing)
    webView.injectJavaScript( `window.ReactNativeWebView.onmessage( ${ message } )` )
  }, [ webViewRef ] )

  return { receive, suscribe, postMessage }

}
