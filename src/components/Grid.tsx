import GLDisplay from './GLDisplay'
import { GridService } from '../modules/grid/services'
import { ReactElement, useEffect } from 'react'
import { useGridDisplay, useGridService } from '../modules/grid/hooks'
import { StyleSheet } from 'react-native'

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
      style={ [ styles.grid, show ? {} : styles.hidden ] }
      onLoad={ onLoad }
      onContextCreate={ onContextCreate } />
  )

}

const styles = StyleSheet.create( {

  grid: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },

  hidden: {
    opacity: 0,
  },

} )

export default Grid
