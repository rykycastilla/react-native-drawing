import { BorderStyle } from './BorderStyle'
import { ShadowStyle } from './ShadowStyle'

/**
 * WARNING: numeric values that must be parsed as pixels would be included `PIXELATED_STYLE_VALUES` constants
 * @see /core/src/modules/cursor/constants.ts - Constants
 */

export interface CursorStyle extends BorderStyle, ShadowStyle {
  borderRadius?: number | `${ number }%`
  backgroundColor?: string
  scale?: number
  opacity?: number
  display?: 'block' | 'none'
}
