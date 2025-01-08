import { DrawPropsDTO } from '../shared/utils/types/DrawPropsDTO'
import { MessageSystem } from '../shared/utils/MessageSystem'
import { SpryParticlesProps } from '../shared/utils/types/SpryParticlesProps'
import { Tool } from '../shared/modules/tools/models'
import { useEffect } from 'react'
import { useSpryParticlesPropsDefinition } from './spry_particles_props_definition'

export interface WebDrawProps {
  resolution: number
  aspectRatio?: number
  color: string
  grid?: number | [ number, number ]
  antialiasing?: boolean
  tool: Tool
  toolSize?: number
  spryParticles?: { amount?:number, scale?:number }
}

export function useDrawState( webBridge:MessageSystem|null, stateProps:WebDrawProps ) {

  const { resolution, aspectRatio = 1, color, grid, antialiasing, tool, toolSize } = stateProps
  const spryParticles: SpryParticlesProps =
    useSpryParticlesPropsDefinition( stateProps.spryParticles )

  useEffect( () => {
    if( webBridge === null ) { return }
    const state: DrawPropsDTO<Tool> =
      { resolution, aspectRatio, color, grid, antialiasing, tool, toolSize, spryParticles }
    webBridge.postMessage( 'state-update', state )
  }, [ webBridge, resolution, aspectRatio, color, grid, antialiasing, tool, toolSize, spryParticles ] )

}
