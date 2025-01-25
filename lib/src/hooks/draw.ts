import { Draw, DrawProps, ScrollService } from '../services'
import { MessageSystem } from '../shared/utils/MessageSystem'
import { useCallback, useEffect, useMemo } from 'react'

export function useDraw(
  drawProps: DrawProps,
  webBridge: MessageSystem|null,
  scrollService: ScrollService,
): Draw {

  const { antialiasing, resolution, aspectRatio, tool, color } = drawProps

  // Creating draw object
  const draw: Draw = useMemo( () => {
    return new Draw( { antialiasing, resolution, aspectRatio, tool, color }, scrollService )
  }, [] )  // eslint-disable-line

  // Creating core loader
  const loadCore = useCallback( () => {
    draw.loadCore()
  }, [ draw ] )

  // Loading core
  useEffect( () => {
    draw.addEventListener( 'load', loadCore )
    return () => draw.removeEventListener( 'load', loadCore )
  }, [ draw, loadCore ] )

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
