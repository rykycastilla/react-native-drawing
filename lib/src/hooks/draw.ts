import { Draw, DrawProps } from '../services'
import { MessageSystem } from '../shared/utils/MessageSystem'
import { useEffect, useMemo } from 'react'

export function useDraw( drawProps:DrawProps, webBridge:MessageSystem|null ): Draw {

  const { antialiasing, resolution, aspectRatio, tool, color } = drawProps

  // Creating draw object
  const draw: Draw = useMemo( () => {
    return new Draw( { antialiasing, resolution, aspectRatio, tool, color } )
  }, [] )  // eslint-disable-line

  // Loading web bridge
  useEffect( () => {
    if( webBridge === null ) { return }
    draw.loadWebBridge( webBridge )
  }, [ draw, webBridge ] )

  // Updating props automatically
  useEffect( () => {
    draw.setProps( { antialiasing, resolution, aspectRatio, tool, color } )
  }, [ draw, antialiasing, resolution, aspectRatio, tool, color ] )

  return draw

}
