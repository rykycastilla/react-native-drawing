import { Tool } from '../models'
import { useEffect } from 'react'

interface ResizableTool<T extends string> extends Tool<T> {
  setSize( size:number ): void
}

export function useUpdateSize<T extends string>( tool:ResizableTool<T>, size:number ) {
  useEffect( () => {
    tool.setSize( size )
  }, [ tool, size ] )
}
