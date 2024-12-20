import { Tool as ITool } from '../models'
import { Tool, ToolIndex } from '../services'
import { useMemo } from 'react'
import { usePrevious } from './previous'

export function useCurrentTool( toolKey:Tool, toolIndex:ToolIndex ): ITool {
  const previousToolKey: Tool | null = usePrevious( toolKey )
  return useMemo( () => {
    if( previousToolKey !== null ) {
      const previousTool: ITool = toolIndex.get( previousToolKey )
      previousTool.stopUsing()
    }
    return toolIndex.get( toolKey )
  }, [ previousToolKey, toolKey, toolIndex ] )
}
