import CanvasDisplay from './CanvasDisplay'
import { GridService } from '@grid/services'
import { ReactElement, useEffect } from 'react'
import { useGridDisplay, useGridService } from '@grid/hooks'
import './Grid.css'

interface GridProps {
  amount?: number
  onLoad( loaded:boolean ): void
}

const Grid = ( props:GridProps ): ReactElement => {

  const { amount = 0, onLoad } = props
  const RESOLUTION = 450
  const show: boolean = amount !== 0
  const { gridDisplay, onCanvasCreate } = useGridDisplay( RESOLUTION )
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
      onCanvasCreate={ onCanvasCreate } />
  )

}

export default Grid
