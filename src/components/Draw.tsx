import Display from './Display'
import Grid from './Grid'
import { ReactElement, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Tool } from '../modules/tools/services'
import { Tool as ITool } from '../modules/tools/models'
import { TouchService } from '../modules/touch/services'
import { useTools } from '../modules/tools/hooks'

const DEFAULT_TOOL_SIZE = 4

interface DrawLayout {
  x: number
  y: number
  size: number
}

interface DrawProps<T extends string> {
  grid: number
  showGrid?: boolean
  touch: TouchService
  pencilColor: T
  tool: Tool
  toolSize?: number
}

const Draw = <T extends string>( props:DrawProps<T> ): ReactElement => {

  const { grid, showGrid = false, touch, pencilColor, tool, toolSize = DEFAULT_TOOL_SIZE } = props
  const [ drawLayout, setDrawLayout ] = useState<DrawLayout>( { x: 0, y: 0, size: 0 } )
  const drawRef = useRef<View|null>( null )
  const currentTool: ITool<T> = useTools( tool, pencilColor, toolSize )

  const onLayout = () => {
    const draw: View | null = drawRef.current
    if( draw === null ) { return }
    draw.measure( ( x:number, y:number, width:number, height:number, pageX:number, pageY:number ) => {
      const layout: DrawLayout = {
        x: pageX,
        y: pageY,
        size: width,
      }
      setDrawLayout( layout )
    } )
  }

  return (
    <View ref={ drawRef } style={ styles.draw } onLayout={ onLayout }>
      <Display grid={ grid } touch={ touch } layout={ drawLayout } tool={ currentTool } />
      <Grid amount={ grid } show={ showGrid } />
    </View>
  )

}

const styles = StyleSheet.create( {

  draw: {
    width: '100%',
    aspectRatio: 1,
  },

} )

export default Draw
