interface ReactNativeWebView {
  postMessage( data:string ): void
}

interface Window {
  ReactNativeWebView: ReactNativeWebView
}

interface ReactNativeMessageListener {
  ( event:MessageEvent<string> ): void
}

interface Document {
  addEventListener( type:'message', listener:ReactNativeMessageListener ): void
}
