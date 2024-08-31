import { CoordinatesService, DrawingService } from '../modules/draw/services'
import { GLView } from 'expo-gl'
import { Matrix } from '../modules/draw/models'
import { ReactElement, useCallback, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { Tool } from '../modules/tools/models'
import { TouchDetectedEvent, TouchEndEvent, TouchService } from '../modules/touch/services'
import { useCoordinatesService, useDrawingService } from '../modules/draw/hooks'
import { useDisplay } from '../modules/display/hooks'
import { useMatrix } from '../modules/draw/hooks'

interface DisplayLayout {
  x: number
  y: number
  size: number
}

interface DisplayProps<T extends string> {
  resolution: number
  touch: TouchService
  layout: DisplayLayout
  tool: Tool<T>
}

const Display = <T extends string>( props:DisplayProps<T> ): ReactElement | null => {

  const { resolution, touch, layout, tool } = props
  const { x, y, size } = layout
  const { display, onContextCreate } = useDisplay( resolution )
  const matrix: Matrix<T> = useMatrix( y, x, size, resolution, resolution, display )
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
