import { Tool as ITool } from '../models'
import { Tool, ToolIndex } from '../services'
import { useCurrentTool } from './current_tool'
import { useToolIndex } from './tool_index'
import { useUpdateColor } from './update_color'
import { useUpdateSize } from './update_size'

export function useTools( currentTool:Tool, toolColor:string, toolSize:number ): ITool {
  const toolIndex: ToolIndex = useToolIndex( toolColor, toolSize )
  // Square Dot Pen
  useUpdateColor( toolIndex.SQUARE_DOT_PEN, toolColor )
  useUpdateSize( toolIndex.SQUARE_DOT_PEN, toolSize )
  // Dot Pen
  useUpdateColor( toolIndex.DOT_PEN, toolColor )
  useUpdateSize( toolIndex.DOT_PEN, toolSize )
  // Pencil
  useUpdateColor( toolIndex.PENCIL, toolColor )
  useUpdateSize( toolIndex.PENCIL, toolSize )
  // Eraser
  useUpdateSize( toolIndex.ERASER, toolSize )
  // Filler
  useUpdateColor( toolIndex.FILLER, toolColor )
  return useCurrentTool( currentTool, toolIndex )
}
