import { ReactElement, useEffect } from 'react'

import { GLView } from 'expo-gl'
import { StyleSheet } from 'react-native'
import { useCoordinatesService, useDisplay, useDrawingService, useMatrix } from '../hooks'
import { Matrix } from '../model'
import { CoordinatesService, DrawingService, TouchDetectedEvent, TouchEndEvent, TouchService } from '../services'
import { useCallback } from 'react'
import { Tool } from '../model'

interface DisplayProps<T extends string> {
  grid: number
  touch: TouchService
  matrixPosition: [ number, number, number ]
  tool: Tool<T>
}

const Display = <T extends string>( props:DisplayProps<T> ): ReactElement | null => {
  const { grid, touch, matrixPosition, tool } = props
  const [ matrixX, matrixY, size ] = matrixPosition
  const { display, onContextCreate } = useDisplay()
  const matrix: Matrix<T> = useMatrix( matrixY, matrixX, size, 512, grid, display )
  const drawingService: DrawingService<T> = useDrawingService( matrix )
  const coordinatesService: CoordinatesService<T> = useCoordinatesService( matrix )

  const onTouchDetected = useCallback( ( event:TouchDetectedEvent ) => {
    const { targetId, x, y } = event
    const { column, row } = coordinatesService.findCell( x, y )
    drawingService.use( targetId, column, row, tool )
  }, [ coordinatesService, drawingService, tool ] )

  const onTouchEnd = useCallback( ( event:TouchEndEvent ) => {
    drawingService.stopStroke( event.targetId )
  }, [ drawingService ] )

  useEffect( () => {
    touch.onTouchDetected( onTouchDetected )
    touch.onTouchEnd( onTouchEnd )
  }, [ touch, onTouchDetected, onTouchEnd ] )

  return <GLView style={ styles.display } onContextCreate={ onContextCreate } />

}

const styles = StyleSheet.create( {

  display: {
    width: '100%',
    height: '100%',
    position : 'absolute',
  },

} )

export default Display
