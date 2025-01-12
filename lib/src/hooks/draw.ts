import { Draw } from '../services'
import { MessageSystem } from '../shared/utils/MessageSystem'
import { useEffect, useMemo } from 'react'

export function useDraw( webBridge:MessageSystem|null ): Draw {

  const draw: Draw = useMemo( () => {
    return new Draw()
  }, [] )

  useEffect( () => {
    if( webBridge === null ) { return }
    draw.loadWebBridge( webBridge )
  }, [ draw, webBridge ] )

  return draw

}
