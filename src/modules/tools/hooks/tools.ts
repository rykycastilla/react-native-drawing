import { Tool as ITool } from '../models'
import { Tool, ToolIndex } from '../services'
import { useCurrentTool } from './current_tool'
import { useToolIndex } from './tool_index'
import { useUpdateColor } from './update_color'

export function useTools<T extends string>( currentTool:Tool, pencilColor:T ): ITool<T> {
  const toolIndex: ToolIndex<T> = useToolIndex( pencilColor )
  useUpdateColor( toolIndex.PENCIL, pencilColor )
  return useCurrentTool( currentTool, toolIndex )
}
