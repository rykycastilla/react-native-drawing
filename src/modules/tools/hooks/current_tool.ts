import { Tool as ITool } from '../models'
import { Tool, ToolIndex } from '../services'
import { useMemo } from 'react'

export function useCurrentTool( toolKey:Tool, toolIndex:ToolIndex ): ITool {
  return useMemo( () => {
    return toolIndex.get( toolKey )
  }, [ toolKey, toolIndex ] )
}
