import { CoordinatesService } from '@draw/services'
import { MutableRefObject } from 'react'
import { ScreenLayout } from '../models'
import { TouchService } from '@touch/services'
import { useCoordinatesService } from '@draw/hooks'
import { useScreenLayout } from './screen_layout'
import { useTouchPosition } from '@touch/hooks'

interface UseInteractionDepsArgs {
  resolution: number
  screenRef: MutableRefObject<HTMLDivElement|null>
}

interface UseInteractionDepsResult {
  coordinatesService: CoordinatesService
  touchService: TouchService
}

export function useInteractionDeps( args:UseInteractionDepsArgs ): UseInteractionDepsResult {
  const { resolution, screenRef } = args
  const layout: ScreenLayout = useScreenLayout( screenRef )
  const coordinatesService: CoordinatesService = useCoordinatesService( layout, resolution )
  const { touchService } = useTouchPosition( { screenRef } )
  return { coordinatesService, touchService }
}
