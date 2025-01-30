import Draw from '../components/Draw'
import { DrawProps } from '../types/DrawProps'
import { MutableRefObject, useCallback, useEffect, useMemo } from 'react'
import { Resolver } from '../utils/Resolver'
import { useDrawRefFilter } from './draw_ref_filter'

type UpdateWaiterFn =
  <T extends keyof DrawProps>( property:T, value:DrawProps[ T ] ) => Promise<void>

type StateUpdateCallback = ( props:DrawProps ) => void

interface StateEventManager {
  onStateUpdate( callback:StateUpdateCallback ): void
  removeStateUpdate( callback:StateUpdateCallback ): void
  props: DrawProps
}

export function useUpdateWaiter( drawRef:MutableRefObject<Draw|null> ): UpdateWaiterFn {

  useDrawRefFilter( useUpdateWaiter.name, drawRef )

  const stateEventManagerLoaded = useMemo( () => {
    return new Resolver<StateEventManager>()
  }, [ drawRef ] )  // eslint-disable-line

  useEffect( () => {
    const draw: Draw = drawRef.current!
    stateEventManagerLoaded.resolve( draw as unknown as StateEventManager )
  }, [ drawRef, stateEventManagerLoaded ] )

  const waitUpdate = useCallback( async<T extends keyof DrawProps>( property:T, value:DrawProps[ T ] ) => {
    const manager: StateEventManager = await stateEventManagerLoaded.promise
    if( manager.props[ property ] === value ) { return }
    const stateUpdated = new Resolver<void>()
    manager.onStateUpdate( function updateState( props:DrawProps ) {
      if( props[ property ] !== value ) { return }
      manager.removeStateUpdate( updateState )
      stateUpdated.resolve()
    } )
    await stateUpdated.promise
  }, [ stateEventManagerLoaded ] )

  return waitUpdate

}
