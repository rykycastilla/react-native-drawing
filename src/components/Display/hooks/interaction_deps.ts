import { DisplayLayout, useDisplayLayout } from '../../CanvasDisplay'
import { CoordinatesService } from '@draw/services'
import { TouchService } from '@touch/services'
import { useCoordinatesService } from '@draw/hooks'
import { MutableRefObject, useRef } from 'react'
import { useTouchPosition } from '@touch/hooks'

interface UseInteractionDepsResult {
  setLayout( layout:DisplayLayout ): void
  coordinatesService: CoordinatesService
  touchService: TouchService
  screenRef: MutableRefObject<HTMLCanvasElement|null>
}

export function useInteractionDeps( resolution:number ): UseInteractionDepsResult {
  const { layout, setLayout } = useDisplayLayout()
  const coordinatesService: CoordinatesService = useCoordinatesService( layout, resolution )
  const screenRef = useRef<HTMLCanvasElement|null>( null )
  const { touchService } = useTouchPosition( { screenRef } )
  return { setLayout, coordinatesService, touchService, screenRef }
}
