import { GLView } from 'expo-gl'
import { GridService } from '../modules/grid/services'
import { ReactElement, useEffect } from 'react'
import { useGridDisplay, useGridService } from '../modules/grid/hooks'
import { StyleSheet } from 'react-native'

interface GridProps {
  amount: number
}

const Grid = ( props:GridProps ): ReactElement => {

  const { amount } = props
  const { gridDisplay, onContextCreate } = useGridDisplay()
  const gridService: GridService | null = useGridService( amount, gridDisplay )

  useEffect( () => {
    if( gridService === null ) { return }
    gridService.build()
  }, [ gridService ] )

  return <GLView style={ styles.grid } onContextCreate={ onContextCreate } />

}

const styles = StyleSheet.create( {

  grid: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },

} )

export default Grid
