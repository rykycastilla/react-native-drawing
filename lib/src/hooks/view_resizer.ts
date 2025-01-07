import { MessageSystem } from '../shared/utils/MessageSystem'
import { useEffect } from 'react'
import { ViewportWidth } from '../components/WebContainer'

export function useViewResizer( webBridge:MessageSystem|null, width:ViewportWidth ) {
  useEffect( () => {
    if( webBridge === null ) { return }
    webBridge.postMessage( 'resize', {} )
  }, [ webBridge, width ] )
}
