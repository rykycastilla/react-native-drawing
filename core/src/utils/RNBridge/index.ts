import { RNBridge as RNBridgeObject } from './RNBridge'

type MessageCallback = ( data:string ) => void

function subscribe( receive:MessageCallback ) {
  window.ReactNativeWebView.onmessage = ( message:string ) => {
    receive( message )
  }
}

export const RNBridge = RNBridgeObject.getInstance(
  subscribe, ( data:string ) => window.ReactNativeWebView.postMessage( data ),
)
