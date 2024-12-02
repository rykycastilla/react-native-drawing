import { DrawPropsDTO } from '../shared/utils/types/DrawPropsDTO'
import { MessageSystem } from '../shared/utils/MessageSystem'
import { Tool } from '../models'
import { useEffect } from 'react'

export interface WebDrawProps {
  resolution: number
  color: string
  grid?: number
  tool: Tool
  toolSize?: number
}

export function useDrawState( webBridge:MessageSystem|null, stateProps:WebDrawProps ) {
  const { resolution, color, grid, tool, toolSize } = stateProps
  useEffect( () => {
    if( webBridge === null ) { return }
    const state: DrawPropsDTO<Tool> = { resolution, color, grid, tool, toolSize }
    webBridge.postMessage( 'state-update', state )
  }, [ webBridge, resolution, color, grid, tool, toolSize ] )
}
