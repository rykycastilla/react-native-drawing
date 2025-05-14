import Display from '@components/Display'
import Grid from '@components/Grid'
import TouchScreen from '@components/TouchScreen'
import { DEFAULT_TOOL_SIZE } from './constants'
import { DrawingService } from '@draw/services'
import { ITool } from '@tools/models'
import { ReactElement, useRef, useState } from 'react'
import { SprayParticlesProps } from '@shared/utils/types/SprayParticlesProps'
import { Tool } from '@shared/modules/tools/models'
import { useCoreConnection } from '@draw/hooks'
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
  sprayParticles: SprayParticlesProps
  animatedFiller: boolean
  onLoad(): void
}

const Draw = ( props:DrawProps ): ReactElement => {

  const {
    resolution,
    aspectRatio,
    color,
    grid,
    antialiasing = true,
    tool,
    onLoad,
    toolSize = DEFAULT_TOOL_SIZE,
    sprayParticles,
    animatedFiller,
  } = props

  const [ viewportControlAllowed, setViewportControlAllowed ] = useState( false )
  const useToolsArgs = { tool, color, size:toolSize, sprayParticles, animatedFiller, setViewportControlAllowed }
  const currentTool: ITool = useTools( useToolsArgs )
  const drawingServiceRef = useRef<DrawingService|null>( null )
  useCoreConnection( { drawingServiceRef, currentTool } )
  const { setDisplayLoaded, setGridLoaded } = useLoader( onLoad )

  return (
    <div className="draw">
      <Display
        ref={ drawingServiceRef }
        resolution={ resolution }
        aspectRatio={ aspectRatio }
        antialiasing={ antialiasing }
        onLoad={ setDisplayLoaded } />
      <Grid amount={ grid } aspectRatio={ aspectRatio } onLoad={ setGridLoaded } />
      <TouchScreen
        resolution={ resolution }
        viewportControlAllowed={ viewportControlAllowed }
        tool={ currentTool }
        drawingServiceRef={ drawingServiceRef } />
    </div>
  )

}

export default Draw
