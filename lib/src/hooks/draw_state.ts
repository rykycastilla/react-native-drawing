import { DrawPropsDTO } from '../shared/utils/types/DrawPropsDTO'
import { MessageSystem } from '../shared/utils/MessageSystem'
import { MutableRefObject, useEffect, useRef } from 'react'
import { SpryParticlesProps } from '../shared/utils/types/SpryParticlesProps'
import { Tool } from '../shared/modules/tools/models'
import { useSpryParticlesPropsDefinition } from './spry_particles_props_definition'

function useDynamicRef<T>( value:T ): MutableRefObject<T> {
  const ref = useRef( value )
  useEffect( () => {
    ref.current = value
  }, [ ref, value ] )
  return ref
}

export interface WebDrawProps {
  resolution: number
  aspectRatio?: number
  color: string
  grid?: number | [ number, number ]
  antialiasing?: boolean
  tool: Tool
  toolSize?: number
  spryParticles?: { amount?:number, scale?:number }
  animatedFiller?: boolean
}

type NewStateCallback = () => void

export function useDrawState(
  webBridge: MessageSystem|null,
  stateProps: WebDrawProps,
  onNewState: NewStateCallback,
) {

  const {
    resolution,
    aspectRatio = 1,
    color,
    grid,
    antialiasing,
    tool,
    toolSize,
    animatedFiller = false,
  } = stateProps

  const spryParticles: SpryParticlesProps =
    useSpryParticlesPropsDefinition( stateProps.spryParticles )
  const onNewStateRef = useDynamicRef( onNewState )

  useEffect( () => {
    if( webBridge === null ) { return }
    const state: DrawPropsDTO<Tool> = {
      resolution,
      aspectRatio,
      color,
      grid,
      antialiasing,
      tool,
      toolSize,
      spryParticles,
      animatedFiller,
    }
    const fn = async() => {
      await webBridge.postMessage( 'state-update', state )
      onNewStateRef.current()
    }
    fn()
  }, [ webBridge, onNewStateRef, resolution, aspectRatio, color, grid, antialiasing, tool, toolSize, spryParticles, animatedFiller ] )

}
