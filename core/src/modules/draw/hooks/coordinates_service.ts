import { CoordinatesService } from '../services'
import { Layout } from '../models'
import { useEffect, useMemo } from 'react'
import { useFreeze } from '@hooks'

export function useCoordinatesService( layout:Layout, resolution:number, aspectRatio:number ): CoordinatesService {

  const width: number = resolution
  const height: number = resolution / aspectRatio
  const initWidth: number = useFreeze( width )
  const initHeight: number = useFreeze( height )

  const coordinatesService: CoordinatesService =  useMemo( () => {
    return new CoordinatesService( initWidth, initHeight )
  }, [ initWidth, initHeight ] )

  useEffect( () => {
    coordinatesService.setResolutionWidth( width )
    coordinatesService.setResolutionHeight( height )
    coordinatesService.setLayout( layout )
  }, [ coordinatesService, width, height, layout ] )

  return coordinatesService

}
