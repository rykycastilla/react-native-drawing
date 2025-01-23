import { ITool } from '../models'
import { SpryParticlesProps } from '@shared/utils/types/SpryParticlesProps'
import { Tool } from '@shared/modules/tools/models'
import { useCurrentTool } from './current_tool'
import { useToolIndex } from './tool_index'

interface UseToolsArgs {
  tool:Tool,
  color:string,
  size:number,
  spryParticles: SpryParticlesProps
  animatedFiller: boolean
  setViewportControlAllowed( viewportControlAllowed:boolean ): void
}

export function useTools( args:UseToolsArgs ): ITool {
  const { tool, color, size, spryParticles, animatedFiller, setViewportControlAllowed } = args
  const useToolIndexArgs = { color, size, spryParticles, animatedFiller, setViewportControlAllowed }
  const toolIndex: Record<number,ITool> =  useToolIndex( useToolIndexArgs )
  return useCurrentTool( toolIndex, tool )
}
