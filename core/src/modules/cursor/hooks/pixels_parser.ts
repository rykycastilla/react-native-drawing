import { PIXELATED_STYLE_VALUES } from '../constants'
import { PropertyValueTransformer } from '@utils/PropertyValueTransformer'
import { useMemo } from 'react'

export function usePixelsParser(): PropertyValueTransformer {
  return useMemo( () => {
    return new PropertyValueTransformer( ...PIXELATED_STYLE_VALUES )
  }, [] )
}
