import { Tool } from '../models'
import { useEffect } from 'react'

interface ColorableTool<T extends string> extends Tool<T> {
  setColor( color:T ): void
}

export function useUpdateColor<T extends string>( tool:ColorableTool<T>, color:T ) {
  useEffect( () => {
    tool.setColor( color )
  }, [ tool, color ] )
}
