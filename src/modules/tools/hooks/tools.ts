import { Tool as ITool } from '../models'
import { Tool, ToolIndex } from '../services'
import { useCurrentTool } from './current_tool'
import { useToolIndex } from './tool_index'
import { useUpdateColor } from './update_color'
import { useUpdateSize } from './update_size'

export function useTools( currentTool:Tool, pencilColor:string, toolSize:number ): ITool {
  const toolIndex: ToolIndex = useToolIndex( pencilColor, toolSize )
  useUpdateColor( toolIndex.PENCIL, pencilColor )
  useUpdateSize( toolIndex.PENCIL, toolSize )
  useUpdateSize( toolIndex.ERASER, toolSize )
  return useCurrentTool( currentTool, toolIndex )
}
