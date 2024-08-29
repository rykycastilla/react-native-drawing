import { Pencil, Tool as ITool } from '../model'
import { Tool, ToolIndex } from '../services'
import { useEffect, useMemo } from 'react'

function usePencil<T extends string>( defaultPencilColor:T ): Pencil<T> {
  return useMemo( () => {
    return new Pencil( defaultPencilColor )
  // eslint-disable-next-line
  }, [] )
}

function useToolIndex<T extends string>( defaultPencilColor:T ): ToolIndex<T> {
  const pencil: Pencil<T> = usePencil( defaultPencilColor )
  return useMemo( () => {
    return new ToolIndex( pencil )
  }, [ pencil ] )
}

interface ColorableTool<T extends string> extends ITool<T> {
  setColor( color:T ): void
}

function useUpdateColor<T extends string>( tool:ColorableTool<T>, color:T ) {
  useEffect( () => {
    tool.setColor( color )
  }, [ tool, color ] )
}

function useCurrentTool<T extends string>( toolKey:Tool, toolIndex:ToolIndex<T> ): ITool<T> {
  return useMemo( () => {
    return toolIndex.get( toolKey )
  }, [ toolKey, toolIndex ] )
}

export function useTools<T extends string>( currentTool:Tool, pencilColor:T ): ITool<T> {
  const toolIndex: ToolIndex<T> = useToolIndex( pencilColor )
  useUpdateColor( toolIndex.PENCIL, pencilColor )
  return useCurrentTool( currentTool, toolIndex )
}
