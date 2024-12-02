import Display from '@components/Display'
import Grid from '@components/Grid'
import TouchScreen from '@components/TouchScreen'
import { DEFAULT_TOOL_SIZE } from './constants'
import { DrawingService } from '@draw/services'
import { LoadEventCallback } from './types'
import { ReactElement, useMemo, useRef } from 'react'
import { Tool } from '@tools/services'
import { Tool as ITool } from '@tools/models'
import { useLoader } from './hooks'
import { useTools } from '@tools/hooks'
import './styles.css'

interface DrawProps {
  resolution: number
  color: string
  grid: number | undefined
  tool: Tool
  toolSize?: number
  onLoad?: LoadEventCallback
}

const Draw = ( props:DrawProps ): ReactElement => {

  const { resolution, color, grid, tool, onLoad, toolSize = DEFAULT_TOOL_SIZE } = props
  const currentTool: ITool = useTools( tool, color, toolSize )
  const drawingServiceRef = useRef<DrawingService|null>( null )
  const fixedResolution: number = useMemo( () => resolution, [] )  // eslint-disable-line
  const { setDisplayLoaded, setGridLoaded } = useLoader( onLoad )

  return (
    <div className="draw">
      <Display ref={ drawingServiceRef } resolution={ fixedResolution } onLoad={ setDisplayLoaded } />
      <Grid amount={ grid } onLoad={ setGridLoaded } />
      <TouchScreen
        resolution={ fixedResolution }
        tool={ currentTool }
        drawingServiceRef={ drawingServiceRef } />
    </div>
  )

}

export default Draw
