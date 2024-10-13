import { CoordinatesService } from '../services'
import { Layout } from '../models'
import { useEffect, useMemo } from 'react'

export function useCoordinatesService( layout:Layout, resolution:number ): CoordinatesService {

  const coordinatesService: CoordinatesService =  useMemo( () => {
    return new CoordinatesService( resolution )
  }, [ resolution ] )

  useEffect( () => {
    coordinatesService.setLayout( layout )
  }, [ coordinatesService, layout ] )

  return coordinatesService

}
