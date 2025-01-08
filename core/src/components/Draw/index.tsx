import Display from '@components/Display'
import Grid from '@components/Grid'
import TouchScreen from '@components/TouchScreen'
import { DEFAULT_TOOL_SIZE } from './constants'
import { DrawingService } from '@draw/services'
import { ITool } from '@tools/models'
import { ReactElement, useMemo, useRef, useState } from 'react'
import { SpryParticlesProps } from '@shared/utils/types/SpryParticlesProps'
import { Tool } from '@shared/modules/tools/models'
import { useLoader } from './hooks'
import { useTools } from '@tools/hooks'
import './styles.css'

interface DrawProps {
  resolution: number
  aspectRatio: number
  color: string
  grid: number | [ number, number ] | undefined
  antialiasing: boolean | undefined
  tool: Tool
  toolSize: number | undefined
  spryParticles: SpryParticlesProps
  onLoad(): void
}

const Draw = ( props:DrawProps ): ReactElement => {

  const { resolution, aspectRatio, color, grid, antialiasing = true, tool, onLoad, toolSize = DEFAULT_TOOL_SIZE, spryParticles } = props
  const [ viewportControlAllowed, setViewportControlAllowed ] = useState( false )
  const useToolsArgs = { tool, color, size:toolSize, spryParticles, setViewportControlAllowed }
  const currentTool: ITool = useTools( useToolsArgs )
  const drawingServiceRef = useRef<DrawingService|null>( null )
  const fixedResolution: number = useMemo( () => resolution, [] )  // eslint-disable-line
  const { setDisplayLoaded, setGridLoaded } = useLoader( onLoad )

  return (
    <div className="draw">
      <Display
        ref={ drawingServiceRef }
        resolution={ fixedResolution }
        aspectRatio={ aspectRatio }
        antialiasing={ antialiasing }
        onLoad={ setDisplayLoaded } />
      <Grid amount={ grid } aspectRatio={ aspectRatio } onLoad={ setGridLoaded } />
      <TouchScreen
        resolution={ fixedResolution }
        aspectRatio={ aspectRatio }
        viewportControlAllowed={ viewportControlAllowed }
        tool={ currentTool }
        drawingServiceRef={ drawingServiceRef } />
    </div>
  )

}

export default Draw
