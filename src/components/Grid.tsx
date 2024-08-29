import Expo2DContext from 'expo-2d-context'
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl'
import { GridDisplay } from '../controller'
import { GridService } from '../services'
import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react'
import { StyleSheet } from 'react-native'

interface Expo2DContextConstructor {
  new ( gl:ExpoWebGLRenderingContext ): Expo2DContext
}

const Expo2DContextObject = Expo2DContext as unknown as Expo2DContextConstructor

interface GridProps {
  amount: number
}

const Grid = ( props:GridProps ): ReactElement => {

  const { amount } = props
  const [ gridDisplay, setGridDisplay ] = useState<GridDisplay|null>( null )

  const onContextCreate = useCallback( ( gl:ExpoWebGLRenderingContext ) => {
    const context = new Expo2DContextObject( gl )
    const gridDisplay = new GridDisplay( context )
    setGridDisplay( gridDisplay )
  }, [] )

  const gridService: GridService | null = useMemo( () => {
    if( gridDisplay === null ) { return null }
    return new GridService( amount, gridDisplay )
  }, [ amount, gridDisplay ] )

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
