import { None, ITool } from '../models'
import { Tool } from '@shared/modules/tools/models'
import { useEffect, useMemo } from 'react'
import { usePrevious } from '@hooks'

const NONE = new None()

export function useCurrentTool( toolIndex:Record<number,ITool>, toolName:Tool ): ITool {

  const tool: ITool = useMemo( () => {
    const newTool: ITool = toolIndex[ toolName ] ?? NONE
    newTool.prepareToUse()
    return newTool
  }, [ toolIndex, toolName ] )

  const previousTool: ITool | null = usePrevious( tool )

  useEffect( () => {
    if( previousTool === null ) { return }
    previousTool.stopUsing()
  }, [ previousTool ] )

  return tool

}
