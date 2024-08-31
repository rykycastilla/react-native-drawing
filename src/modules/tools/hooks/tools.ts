import { Tool as ITool } from '../models'
import { Tool, ToolIndex } from '../services'
import { useCurrentTool } from './current_tool'
import { useToolIndex } from './tool_index'
import { useUpdateColor } from './update_color'
import { useUpdateSize } from './update_size'

export function useTools<T extends string>( currentTool:Tool, pencilColor:T, toolSize:number ): ITool<T> {
  const toolIndex: ToolIndex<T> = useToolIndex( pencilColor, toolSize )
  useUpdateColor( toolIndex.PENCIL, pencilColor )
  useUpdateSize( toolIndex.PENCIL, toolSize )
  return useCurrentTool( currentTool, toolIndex )
}
