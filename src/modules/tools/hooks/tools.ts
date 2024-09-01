import { Tool as ITool } from '../models'
import { Tool, ToolIndex } from '../services'
import { useCurrentTool } from './current_tool'
import { useToolIndex } from './tool_index'
import { useUpdateColor } from './update_color'
import { useUpdateSize } from './update_size'

export function useTools( currentTool:Tool, toolColor:string, toolSize:number ): ITool {
  const toolIndex: ToolIndex = useToolIndex( toolColor, toolSize )
  useUpdateColor( toolIndex.PENCIL, toolColor )
  useUpdateSize( toolIndex.PENCIL, toolSize )
  useUpdateSize( toolIndex.ERASER, toolSize )
  useUpdateColor( toolIndex.FILLER, toolColor )
  return useCurrentTool( currentTool, toolIndex )
}
