import Display from '@components/Display'
import Grid from '@components/Grid'
import { DEFAULT_TOOL_SIZE } from './constants'
import { LoadEventCallback } from './types'
import { ReactElement, useMemo } from 'react'
import { Tool } from '@tools/services'
import { Tool as ITool } from '@tools/models'
import { TouchService } from '@touch/services'
import { useLoader } from './hooks'
import { useTools } from '@tools/hooks'
import './styles.css'

interface DrawProps {
  resolution: number
  touch: TouchService
  color: string
  tool: Tool
  showGrid?: boolean
  toolSize?: number
  onLoad?: LoadEventCallback
}

const Draw = ( props:DrawProps ): ReactElement => {

  const { resolution, color, tool, onLoad } = props
  const { showGrid = false, toolSize = DEFAULT_TOOL_SIZE } = props

  const currentTool: ITool = useTools( tool, color, toolSize )
  const fixedResolution: number = useMemo( () => resolution, [] )  // eslint-disable-line
  const { setDisplayLoaded, setGridLoaded } = useLoader( onLoad )

  return (
    <div className="draw">
      <Display resolution={ fixedResolution } tool={ currentTool } onLoad={ setDisplayLoaded } />
      <Grid amount={ fixedResolution } show={ showGrid } onLoad={ setGridLoaded } />
    </div>
  )

}

export default Draw
