import GLDisplay from './GLDisplay'
import { GridService } from '../modules/grid/services'
import { ReactElement, useEffect } from 'react'
import { useGridDisplay, useGridService } from '../modules/grid/hooks'
import './grid.css'

interface GridProps {
  amount: number
  show: boolean
  onLoad( loaded:boolean ): void
}

const Grid = ( props:GridProps ): ReactElement => {

  const { amount, show, onLoad } = props
  const { gridDisplay, onContextCreate } = useGridDisplay()
  const gridService: GridService | null = useGridService( amount, gridDisplay )

  useEffect( () => {
    if( gridService === null ) { return }
    gridService.build()
  }, [ gridService ] )

  return (
    <GLDisplay
      className={ `grid ${ !show ?? 'hidden' }` }
      onLoad={ onLoad }
      onContextCreate={ onContextCreate } />
  )

}

export default Grid
