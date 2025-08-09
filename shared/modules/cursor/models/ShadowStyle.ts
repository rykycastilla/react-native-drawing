/**
 * WARNING: Keep shadow limits (`ShadowStyle#shadowBlur` & `ShadowStyle#shadowRadius`) in sync with constants
 * @see /core/src/modules/cursor/constants.ts - Constants for shadow limits
 *
 * WARNING: If these props are modified, must be updated in shadow disabler function for iOS
 * @see /lib/src/functions/unable_shadow_on_ios.ts - Shadow disabler function for iOS
 */

export interface ShadowStyle {
  shadowOffset?: { x:number, y:number }
  shadowBlur?: 0 | 1 | 2 | 3 | 4 | 5
  shadowRadius?: 0 | 1 | 2 | 3
  shadowColor?: string
}
