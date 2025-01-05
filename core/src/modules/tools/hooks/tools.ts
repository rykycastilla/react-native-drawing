import { Tool } from '@shared/modules/tools/models'
import { Tool as ITool } from '../models'
import { useCurrentTool } from './current_tool'
import { useToolIndex } from './tool_index'

export function useTools( tool:Tool, color:string, size:number ): ITool {
  const toolIndex: Record<number,ITool> =  useToolIndex( color, size )
  return useCurrentTool( toolIndex, tool )
}
