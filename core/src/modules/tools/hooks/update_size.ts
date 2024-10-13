import { Tool } from '../models'
import { useEffect } from 'react'

interface ResizableTool extends Tool {
  setSize( size:number ): void
}

export function useUpdateSize( tool:ResizableTool, size:number ) {
  useEffect( () => {
    tool.setSize( size )
  }, [ tool, size ] )
}
