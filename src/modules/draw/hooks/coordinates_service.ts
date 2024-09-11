import { CoordinatesService } from '../services'
import { Layout } from '../models'
import { MutableRefObject, useEffect, useMemo } from 'react'

export function useCoordinatesService( layoutRef:MutableRefObject<Layout>, resolution:number ): CoordinatesService {

  const coordinatesService: CoordinatesService =  useMemo( () => {
    return new CoordinatesService( resolution )
  }, [ resolution ] )

  useEffect( () => {
    const layout: Layout = layoutRef.current
    coordinatesService.setLayout( layout )
  }, [ coordinatesService, layoutRef ] )

  return coordinatesService

}
