import Display from '../Display'
import Grid from '../Grid'
import { DEFAULT_TOOL_SIZE } from './constants'
import { DrawLayout, LoadEventCallback } from './types'
import { ReactElement, useMemo, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Tool } from '../../modules/tools/services'
import { Tool as ITool } from '../../modules/tools/models'
import { TouchService } from '../../modules/touch/services'
import { useLoader } from './hooks'
import { useTools } from '../../modules/tools/hooks'

interface DrawProps {
  resolution: number
  showGrid?: boolean
  touch: TouchService
  pencilColor: string
  tool: Tool
  toolSize?: number
  onLoad?: LoadEventCallback
}

const Draw = ( props:DrawProps ): ReactElement => {

  const {
    resolution,
    showGrid = false,
    touch,
    pencilColor,
    tool,
    toolSize = DEFAULT_TOOL_SIZE,
    onLoad,
  } = props
  const [ drawLayout, setDrawLayout ] = useState<DrawLayout>( { x: 0, y: 0, size: 0 } )
  const drawRef = useRef<View|null>( null )
  const currentTool: ITool = useTools( tool, pencilColor, toolSize )
  const fixedResolution: number = useMemo( () => resolution, [] )  // eslint-disable-line
  const { setDisplayLoaded, setGridLoaded } = useLoader( onLoad )

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
      <Display resolution={ fixedResolution } touch={ touch } layout={ drawLayout } tool={ currentTool } onLoad={ setDisplayLoaded } />
      <Grid amount={ fixedResolution } show={ showGrid } onLoad={ setGridLoaded } />
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
