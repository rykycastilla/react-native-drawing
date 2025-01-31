import { CoordinatesService } from '../services'
import { useEffect, useMemo } from 'react'

export function useCoordinatesService( layout:number, resolution:number ): CoordinatesService {

  const coordinatesService: CoordinatesService =  useMemo( () => {
    return new CoordinatesService( layout, resolution )
  }, [] )  // eslint-disable-line

  useEffect( () => {
    coordinatesService.setLayout( layout )
    coordinatesService.setResolution( resolution )
  }, [ coordinatesService, layout, resolution ] )

  return coordinatesService

}
