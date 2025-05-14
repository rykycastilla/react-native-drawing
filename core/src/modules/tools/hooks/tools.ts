import { ITool } from '../models'
import { SprayParticlesProps } from '@shared/utils/types/SprayParticlesProps'
import { Tool } from '@shared/modules/tools/models'
import { useCurrentTool } from './current_tool'
import { useToolIndex } from './tool_index'

interface UseToolsArgs {
  tool:Tool,
  color:string,
  size:number,
  sprayParticles: SprayParticlesProps
  animatedFiller: boolean
  setViewportControlAllowed( viewportControlAllowed:boolean ): void
}

export function useTools( args:UseToolsArgs ): ITool {
  const { tool, color, size, sprayParticles, animatedFiller, setViewportControlAllowed } = args
  const useToolIndexArgs = { color, size, sprayParticles, animatedFiller, setViewportControlAllowed }
  const toolIndex: Record<number,ITool> =  useToolIndex( useToolIndexArgs )
  return useCurrentTool( toolIndex, tool )
}
