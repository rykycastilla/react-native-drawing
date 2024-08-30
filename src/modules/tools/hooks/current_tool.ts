import { Tool as ITool } from '../models'
import { Tool, ToolIndex } from '../services'
import { useMemo } from 'react'

export function useCurrentTool<T extends string>( toolKey:Tool, toolIndex:ToolIndex<T> ): ITool<T> {
  return useMemo( () => {
    return toolIndex.get( toolKey )
  }, [ toolKey, toolIndex ] )
}
