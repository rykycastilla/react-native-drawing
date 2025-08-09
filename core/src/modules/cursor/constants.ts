/**
 * Maximum allowed shadow blur value
 * @see ShadowStyle.shadowBlur - Type definition must match this range
 */
export const SHADOW_BLUR_LIMIT = 5

/**
 * Maximum allowed shadow radius value
 * @see ShadowStyle.shadowRadius - Type definition must match this range
 */
export const SHADOW_RADIUS_LIMIT = 3

/**
 * Style values that must be treated as pixels.
 */
export const PIXELATED_STYLE_VALUES = [
  'borderWidth',
  'borderRadius',
  'shadowOffset.x',
  'shadowOffset.y',
]
