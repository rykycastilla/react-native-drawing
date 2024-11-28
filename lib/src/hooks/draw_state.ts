import { MessageSystem } from '../shared/utils/MessageSystem'
import { Tool } from '../models'
import { useEffect } from 'react'

export interface WebDrawProps {
  resolution: number
  color: string
  tool: Tool
  showGrid?: boolean
  toolSize?: number
}

export function useDrawState( webBridge:MessageSystem|null, state:WebDrawProps ) {

  const { resolution, color, tool, showGrid, toolSize } = state

  useEffect( () => {
    if( webBridge === null ) { return }
    webBridge.postMessage( 'state-update', state )
  }, [ webBridge, resolution, color, tool, showGrid, toolSize ] )  // eslint-disable-line
}
