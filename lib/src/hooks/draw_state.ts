import { CursorStyle } from '../shared/modules/cursor/models'
import { DrawPropsDTO } from '../shared/utils/types/DrawPropsDTO'
import { MessageSystem } from '../shared/utils/MessageSystem'
import { SprayParticlesProps } from '../shared/utils/types/SprayParticlesProps'
import { Tool } from '../shared/modules/tools/models'
import { useEffect } from 'react'
import { useObjectStructure } from '../shared/hooks/object_structure'
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
  cursorStyle?: CursorStyle
}

export function useDrawState( webBridge:MessageSystem|null, stateProps:WebDrawProps ) {

  const {
    resolution,
    aspectRatio = 1,
    color,
    grid,
    antialiasing,
    tool,
    toolSize,
    animatedFiller = false,
    cursor,
    cursorStyle = {},
  } = stateProps
  const sprayParticles: SprayParticlesProps =
    useSprayParticlesPropsDefinition( stateProps.sprayParticles )
  const fixedCursorStyle = useObjectStructure( cursorStyle )

  useEffect( () => {
    if( webBridge === null ) { return }
    const state: DrawPropsDTO<Tool> =
      { resolution, aspectRatio, color, grid, antialiasing, tool, toolSize, sprayParticles, animatedFiller, cursor, cursorStyle:fixedCursorStyle }
    webBridge.postMessage( 'state-update', state )
  }, [ webBridge, resolution, aspectRatio, color, grid, antialiasing, tool, toolSize, sprayParticles, animatedFiller, cursor, fixedCursorStyle ] )

}
