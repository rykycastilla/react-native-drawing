import { cloneDeep } from 'lodash'
import { CursorStyle } from '@shared/modules/cursor/models'
import { SHADOW_BLUR_LIMIT, SHADOW_RADIUS_LIMIT } from '../constants'
import { useMemo } from 'react'

function limitIt( style:CursorStyle ) {
  if ( ( style.shadowBlur !== undefined ) && ( style.shadowBlur > SHADOW_BLUR_LIMIT ) ) {
    style.shadowBlur = SHADOW_BLUR_LIMIT
  }
  if ( ( style.shadowRadius !== undefined ) && ( style.shadowRadius > SHADOW_RADIUS_LIMIT ) ) {
    style.shadowRadius = SHADOW_RADIUS_LIMIT
  }
}

export function useShadowLimits( style:CursorStyle ): CursorStyle {
  return useMemo( () => {
    const shadowLimitedStyle: CursorStyle = cloneDeep( style )
    limitIt( shadowLimitedStyle )
    return shadowLimitedStyle
  }, [ style ] )
}
