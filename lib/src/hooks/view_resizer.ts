import { MessageSystem } from '../shared/utils/MessageSystem'
import { useEffect } from 'react'
import { ViewportWidth } from '../components/WebContainer'

export function useViewResizer( webBridge:MessageSystem|null, width:ViewportWidth, aspectRatio:number ) {
  useEffect( () => {
    if( webBridge === null ) { return }
    webBridge.postMessage( 'resize', {} )
  }, [ webBridge, width, aspectRatio ] )
}
