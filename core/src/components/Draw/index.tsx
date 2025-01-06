import Display from '@components/Display'
import Grid from '@components/Grid'
import TouchScreen from '@components/TouchScreen'
import { DEFAULT_TOOL_SIZE } from './constants'
import { DrawingService } from '@draw/services'
import { ReactElement, useMemo, useRef, useState } from 'react'
import { Tool } from '@shared/modules/tools/models'
import { Tool as ITool } from '@tools/models'
import { useLoader } from './hooks'
import { useTools } from '@tools/hooks'
import './styles.css'

interface DrawProps {
  resolution: number
  color: string
  grid: number | undefined
  antialiasing: boolean | undefined
  tool: Tool
  toolSize: number | undefined
  onLoad(): void
}

const Draw = ( props:DrawProps ): ReactElement => {

  const { resolution, color, grid, antialiasing = true, tool, onLoad, toolSize = DEFAULT_TOOL_SIZE } = props
  const [ viewportControlAllowed, setViewportControlAllowed ] = useState( false )
  const currentTool: ITool = useTools( { tool, color, size:toolSize, setViewportControlAllowed } )
  const drawingServiceRef = useRef<DrawingService|null>( null )
  const fixedResolution: number = useMemo( () => resolution, [] )  // eslint-disable-line
  const { setDisplayLoaded, setGridLoaded } = useLoader( onLoad )

  return (
    <div className="draw">
      <Display
        ref={ drawingServiceRef }
        resolution={ fixedResolution }
        antialiasing={ antialiasing }
        onLoad={ setDisplayLoaded } />
      <Grid amount={ grid } onLoad={ setGridLoaded } />
      <TouchScreen
        resolution={ fixedResolution }
        viewportControlAllowed={ viewportControlAllowed }
        tool={ currentTool }
        drawingServiceRef={ drawingServiceRef } />
    </div>
  )

}

export default Draw
