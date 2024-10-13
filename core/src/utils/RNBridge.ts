import { Codec } from '@utils/Codec'
import { MessageData, MessageSystem } from '@utils/MessageSystem'

type MessageCallback = ( data:string ) => void

let callback: MessageCallback | null = null
const codec = new Codec<MessageData>()

document.addEventListener( 'message', ( event:MessageEvent<string> ) => {
  if( callback === null ) { return }
  callback( event.data )
} )

function suscribe( receive:MessageCallback ) {
  callback = receive
}

export const RNBridge = new MessageSystem(
  suscribe, window.ReactNativeWebView.postMessage, codec,
)
