import { GridDisplay } from '../controllers'
import { GridService } from '../services'
import { useMemo } from 'react'

export function useGridService( widthAmount:number, heightAmount:number, gridDisplay:GridDisplay|null ): GridService | null {

  const gridService: GridService | null = useMemo( () => {
    if( gridDisplay === null ) { return null }
    return new GridService( widthAmount, heightAmount, gridDisplay )
  }, [ widthAmount, heightAmount, gridDisplay ] )

  return gridService

}
