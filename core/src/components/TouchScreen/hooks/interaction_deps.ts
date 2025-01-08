import { CoordinatesService } from '@draw/services'
import { MutableRefObject } from 'react'
import { ScreenLayout } from '../models'
import { TouchService } from '@touch/services'
import { useCoordinatesService } from '@draw/hooks'
import { useScreenLayout } from './screen_layout'
import { useTouchPosition } from '@touch/hooks'

interface UseInteractionDepsArgs {
  resolution: number
  aspectRatio: number
  viewportControlAllowed: boolean
  screenRef: MutableRefObject<HTMLDivElement|null>
}

interface UseInteractionDepsResult {
  coordinatesService: CoordinatesService
  touchService: TouchService
}

export function useInteractionDeps( args:UseInteractionDepsArgs ): UseInteractionDepsResult {
  const { resolution, aspectRatio, viewportControlAllowed, screenRef } = args
  const layout: ScreenLayout = useScreenLayout( screenRef )
  const coordinatesService: CoordinatesService = useCoordinatesService( layout, resolution, aspectRatio )
  const { touchService } = useTouchPosition( { viewportControlAllowed, screenRef } )
  return { coordinatesService, touchService }
}
