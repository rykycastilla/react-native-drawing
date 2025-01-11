import CanvasDisplay from './CanvasDisplay'
import { GridService } from '@grid/services'
import { ReactElement, useEffect } from 'react'
import { useGridDisplay, useGridService } from '@grid/hooks'
import './Grid.css'

interface GridProps {
  amount: number | [ amountWidth:number, amountHeight:number ] | undefined
  aspectRatio: number
  onLoad( loaded:boolean ): void
}

const Grid = ( props:GridProps ): ReactElement => {

  const { amount = 0, aspectRatio, onLoad } = props
  // Structuring cells amount
  const [ widthAmount, heightAmount ] = ( typeof amount === 'number' ) ? [ amount, amount ] : amount
  const resolution = 450
  const show: boolean = amount !== 0
  const { gridDisplay, onCanvasCreate } = useGridDisplay()
  const gridService: GridService | null = useGridService( widthAmount, heightAmount, gridDisplay )

  useEffect( () => {
    if( gridService === null ) { return }
    gridService.build()
  }, [ gridService ] )

  return (
    <CanvasDisplay
      className={ `${ !show ? 'grid-hidden' : '' }` }
      resolution={ resolution }
      aspectRatio={ aspectRatio }
      onLoad={ onLoad }
      onCanvasCreate={ onCanvasCreate } />
  )

}

export default Grid
