import { Tool } from '../models'
import { useEffect } from 'react'

interface ColorableTool extends Tool {
  setColor( color:string ): void
}

export function useUpdateColor( tool:ColorableTool, color:string ) {
  useEffect( () => {
    tool.setColor( color )
  }, [ tool, color ] )
}
