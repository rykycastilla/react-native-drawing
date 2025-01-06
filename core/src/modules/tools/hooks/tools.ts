import { Tool } from '@shared/modules/tools/models'
import { Tool as ITool } from '../models'
import { useCurrentTool } from './current_tool'
import { useToolIndex } from './tool_index'

interface UseToolsArgs {
  tool:Tool,
  color:string,
  size:number,
  setViewportControlAllowed( viewportControlAllowed:boolean ): void
}

export function useTools( args:UseToolsArgs ): ITool {
  const { tool, color, size, setViewportControlAllowed } = args
  const toolIndex: Record<number,ITool> =  useToolIndex( { color, size, setViewportControlAllowed } )
  return useCurrentTool( toolIndex, tool )
}
