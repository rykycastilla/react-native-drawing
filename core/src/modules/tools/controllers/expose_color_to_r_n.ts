import { RNBridge } from '@utils/RNBridge'

export function exposeColorToRN( color:string ) {
  RNBridge.postMessage( 'eye-dropper', { color } )
}
