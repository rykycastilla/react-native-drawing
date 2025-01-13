import { Draw, DrawProps } from '../services'
import { MessageSystem } from '../shared/utils/MessageSystem'
import { useCallback, useEffect, useMemo } from 'react'

interface UseDrawResult {
  draw: Draw
  onLoad( webBridge:MessageSystem ): void
}

export function useDraw( drawProps:DrawProps ): UseDrawResult {

  const { antialiasing, resolution, aspectRatio, tool, color } = drawProps

  // Creating draw object
  const draw: Draw = useMemo( () => {
    return new Draw( { antialiasing, resolution, aspectRatio, tool, color } )
  }, [] )  // eslint-disable-line

  // Loading web bridge
  const onLoad = useCallback( ( webBridge:MessageSystem ) => {
    draw.loadWebBridge( webBridge )
  }, [ draw ] )

  // Updating props automatically
  useEffect( () => {
    draw.setProps( { antialiasing, resolution, aspectRatio, tool, color } )
  }, [ draw, antialiasing, resolution, aspectRatio, tool, color ] )

  return { draw, onLoad }

}
