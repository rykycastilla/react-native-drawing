import { GridDisplay } from '../controllers'
import { GridService } from '../services'
import { useMemo } from 'react'

export function useGridService( amount:number, gridDisplay:GridDisplay|null ): GridService | null {

  const gridService: GridService | null = useMemo( () => {
    if( gridDisplay === null ) { return null }
    return new GridService( amount, gridDisplay )
  }, [ amount, gridDisplay ] )

  return gridService

}
