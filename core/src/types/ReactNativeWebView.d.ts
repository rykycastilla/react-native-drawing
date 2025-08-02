interface MessageHandler {
  ( message:string ): void
}

interface ReactNativeWebView {
  postMessage( data:string ): void
  onmessage: MessageHandler | undefined
}

interface Window {
  ReactNativeWebView: ReactNativeWebView
}
