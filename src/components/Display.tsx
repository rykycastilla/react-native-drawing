import { CoordinatesService, DrawingService } from '../modules/draw/services'
import { Matrix } from '../modules/draw/models'
import { ReactElement, useCallback, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { Tool } from '../modules/tools/models'
import { TouchDetectedEvent, TouchEndEvent, TouchService } from '../modules/touch/services'
import { useCoordinatesService, useDisplay, useDrawingService, useMatrix } from '../modules/draw/hooks'

import GLDisplay from './GLDisplay'

interface DisplayLayout {
  x: number
  y: number
  size: number
}

interface DisplayProps {
  resolution: number
  touch: TouchService
  layout: DisplayLayout
  tool: Tool
  onLoad( loaded:boolean ): void
}

const Display = ( props:DisplayProps ): ReactElement | null => {

  const { resolution, touch, layout, tool, onLoad } = props
  const { x, y, size } = layout
  const { display, loadDisplay } = useDisplay( resolution )
  const matrix: Matrix = useMatrix( y, x, size, resolution, resolution, display )
  const drawingService: DrawingService = useDrawingService( matrix )
  const coordinatesService: CoordinatesService = useCoordinatesService( matrix )

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

  return (
    <GLDisplay
      style={ styles.display }
      onLoad={ onLoad }
      onContextCreate={ loadDisplay } />
  )

}

const styles = StyleSheet.create( {

  display: {
    width: '100%',
    height: '100%',
    position : 'absolute',
  },

} )

export default Display
