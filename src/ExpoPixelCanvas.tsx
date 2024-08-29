import { LayoutChangeEvent, StyleSheet, View } from 'react-native'
import { ReactElement } from 'react'

import Display from './components/Display'
import { useResolution } from './hooks'
import React, { useRef } from 'react'
import { useLocateMatrix } from './hooks'
import { TouchService } from './services'
import { useTools } from './hooks'
import { Tool as ITool } from './model'
import { Tool } from './services'

interface DrawProps<T extends string> {
  grid: number
  touch: TouchService
  pencilColor: T
  tool: Tool,
}

// construir el grid opcional
// mover la logica de el pixel a un objeto
// separar la logica del mapeador
// eliminar el componente matrix y elevar todos sus miembros (crear hook useMatrix)
// congelar el grid
// cambiar el nombre de locate matrix a locate display

const ExpoPixelCanvas = <T extends string>( props:DrawProps<T> ): ReactElement => {
  const { grid, touch, pencilColor, tool } = props
  const { resolution:size, onLayout:setResolution } = useResolution()
  const drawRef = useRef<View|null>( null )
  const currentTool: ITool<T> = useTools( tool, pencilColor )

  // estos tres deben ser un solo hook
  const { matrixX, matrixY, onLayout:setMatrixPosition } = useLocateMatrix( drawRef )

  const onLayout = ( event:LayoutChangeEvent ) => {
    setMatrixPosition()
    setResolution( event )
  }

  return (
    <View ref={ drawRef } style={ styles.draw } onLayout={ onLayout }>
      <Display grid={ grid } touch={ touch } matrixPosition={ [ matrixX, matrixY, size ] } tool={ currentTool } />
      {/* <Grid amount={ grid } /> */}
    </View>
  )
}

const styles = StyleSheet.create( {

  draw: {
    width: '100%',
    aspectRatio: 1,
  },

} )

export default ExpoPixelCanvas
