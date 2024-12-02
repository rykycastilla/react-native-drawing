import { Codec } from '@shared/utils/Codec'
import { MessageData, MessageSystem } from '@shared/utils/MessageSystem'

type MessageCallback = ( data:string ) => void

const codec = new Codec<MessageData>()

function suscribe( receive:MessageCallback ) {
  document.addEventListener( 'message', ( event:MessageEvent<string> ) => {
    receive( event.data )
  } )
}

export const RNBridge = new MessageSystem(
  suscribe, ( data:string ) => window.ReactNativeWebView.postMessage( data ), codec,
)
