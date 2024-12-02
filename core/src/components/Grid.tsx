import CanvasDisplay from './CanvasDisplay'
import { GridService } from '@grid/services'
import { ReactElement, useEffect } from 'react'
import { useGridDisplay, useGridService } from '@grid/hooks'
import './Grid.css'

interface GridProps {
  amount: number
  show: boolean
  onLoad( loaded:boolean ): void
}

const Grid = ( props:GridProps ): ReactElement => {

  const { amount, show, onLoad } = props
  const RESOLUTION = 450
  const { gridDisplay, onContextCreate } = useGridDisplay( RESOLUTION )
  const gridService: GridService | null = useGridService( amount, gridDisplay )

  useEffect( () => {
    if( gridService === null ) { return }
    gridService.build()
  }, [ gridService ] )

  return (
    <CanvasDisplay
      className={ `${ !show ? 'grid-hidden' : '' }` }
      width={ RESOLUTION }
      height={ RESOLUTION }
      onLoad={ onLoad }
      onContextCreate={ onContextCreate } />
  )

}

export default Grid
