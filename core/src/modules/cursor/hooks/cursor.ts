import { CursorController } from '../controllers'
import { CursorStyle } from '@shared/modules/cursor/models'
import { genStylePixel, useStylePixels } from './style_pixels'
import { MutableRefObject, useEffect, useMemo, useState } from 'react'
import { useElemLayout } from '@hooks'
import { useObjectStructure } from '@shared/hooks/object_structure'
import { usePixelsParser } from './pixels_parser'
import { useShadowLimits } from './shadow_limits'

export function useCursor(
  isAvailable:  boolean,
  referenceResolution:  number,
  toolSize: number,
  style:  CursorStyle,
  elementRef: MutableRefObject<HTMLElement|null>,
) {

  const [ element, setElement ] = useState<HTMLElement|null>( null )
  /** Represents the fixed cursor style  and its transformations */ let fixedStyle = useObjectStructure( style )
  fixedStyle = useShadowLimits( fixedStyle )

  // Rescaling sizes to use the container pixels reference
  const [ width ] = useElemLayout( elementRef )
  const size: number = genStylePixel( toolSize, referenceResolution, width )
  const pixelsParser = usePixelsParser()
  fixedStyle = useStylePixels( fixedStyle, referenceResolution, width, pixelsParser )

  // Extracting HTML Element
  useEffect( () => {
    const element: HTMLElement | null = elementRef.current
    if( element === null ) { return }
    setElement( element )
  }, [ elementRef ] )

  // Creating cursor controller
  const cursor = useMemo( () => {
    if( element === null ) { return null }
    return new CursorController( isAvailable, size, fixedStyle, element, pixelsParser )
  }, [ element, pixelsParser ] )  // eslint-disable-line

  // Updating parameters

  useEffect( () => {
    if( cursor === null ) { return }
    cursor.setIsAvailable( isAvailable )
  }, [ cursor, isAvailable ] )

  useEffect( () => {
    if( cursor === null ) { return }
    cursor.setSize( size )
  }, [ cursor, size ] )

  useEffect( () => {
    if( cursor === null ) { return }
    cursor.setStyle( fixedStyle )
  }, [ cursor, fixedStyle ] )

  // Cleaning up
  useEffect( () => {
    if( cursor === null ) { return }
    return () => cursor.destroy()
  }, [ cursor ] )

}
