import { DrawPropsDTO } from '../shared/utils/types/DrawPropsDTO'
import { MessageSystem } from '../shared/utils/MessageSystem'
import { SprayParticlesProps } from '../shared/utils/types/SprayParticlesProps'
import { Tool } from '../shared/modules/tools/models'
import { useEffect } from 'react'
import { useSprayParticlesPropsDefinition } from './spray_particles_props_definition'

export interface WebDrawProps {
  resolution: number
  aspectRatio?: number
  color: string
  grid?: number | [ number, number ]
  antialiasing?: boolean
  tool: Tool
  toolSize?: number
  sprayParticles?: { amount?:number, scale?:number }
  animatedFiller?: boolean
  cursor?: boolean
}

export function useDrawState( webBridge:MessageSystem|null, stateProps:WebDrawProps ) {

  const {
    resolution, aspectRatio = 1, color, grid, antialiasing, tool, toolSize, animatedFiller = false, cursor,
  } = stateProps
  const sprayParticles: SprayParticlesProps =
    useSprayParticlesPropsDefinition( stateProps.sprayParticles )

  useEffect( () => {
    if( webBridge === null ) { return }
    const state: DrawPropsDTO<Tool> =
      { resolution, aspectRatio, color, grid, antialiasing, tool, toolSize, sprayParticles, animatedFiller, cursor }
    webBridge.postMessage( 'state-update', state )
  }, [ webBridge, resolution, aspectRatio, color, grid, antialiasing, tool, toolSize, sprayParticles, animatedFiller, cursor ] )

}
