import { useMemo } from 'react'

export function useFreeze<T>( value:T ): T {
  return useMemo( () => {
    return value
  }, [] )  // eslint-disable-line
}
