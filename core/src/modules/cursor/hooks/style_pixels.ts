import { cloneDeep } from 'lodash'
import { CursorStyle } from '@shared/modules/cursor/models'
import { PropertyValueTransformer } from '@utils/PropertyValueTransformer'
import { useMemo } from 'react'

/**
 * Reescalates the `px` value to the provided references (from resolution to size)
 * @param px - Value to be rescalated
 * @param containerResolution - Reference value for `px`
 * @param containerSize - Final reference to rescale px
 */
export function genStylePixel( px:number, containerResolution:number, containerSize:number ): number {
  return px / containerResolution * containerSize
}

/**
 * Rescalates the numeric values (pixels) of the `style` object
 * @param style
 * @param containerResolution - Reference value for `style` pixels
 * @param containerSize - Final reference to rescale `style` pixels
 */
export function useStylePixels(
  style: CursorStyle,
  containerResolution: number,
  containerSize: number,
  pixelsParser: PropertyValueTransformer,
): CursorStyle {

  return useMemo( () => {
    const rescaledStyle = cloneDeep( style )
    // Transforming admited numeric values to rescaled pixels in the webview
    pixelsParser.parse( rescaledStyle as Record<string,unknown>, ( pixelValue:unknown ) => {
      return ( typeof pixelValue === 'number' )
        ? genStylePixel( pixelValue, containerResolution, containerSize )
        : pixelValue
    } )
    return rescaledStyle
  }, [ style, containerResolution, containerSize, pixelsParser ] )

}
