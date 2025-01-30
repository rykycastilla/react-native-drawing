import { Resolver } from '@utils/Resolver'
import { useCallback, useEffect, useRef, useState } from 'react'

type AsyncSetter<T> = ( state:T ) => Promise<void>

export function useAsyncState<T>( defaultState:T ): [ T, AsyncSetter<T> ] {

  const [ state, setState ] = useState( defaultState )
  const stateUpdatedRef = useRef<Resolver<void>|null>( null )

  useEffect( () => {
    const stateUpdated: Resolver<void> | null = stateUpdatedRef.current
    if( stateUpdated === null ) { return }
    stateUpdated.resolve()
  }, [ stateUpdatedRef, state ] )

  const setStateAsync = useCallback( async( state:T ) => {
    const stateUpdated = new Resolver<void>()
    stateUpdatedRef.current = stateUpdated
    setState( state )
    await stateUpdated.promise
  }, [ stateUpdatedRef ] )

  return [ state, setStateAsync ]

}
