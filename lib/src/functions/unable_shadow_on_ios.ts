import { CursorStyle } from '../shared/modules/cursor/models'
import { Platform } from 'react-native'

export function unableShadowOnIOS( style:CursorStyle|undefined ) {
  if( Platform.OS !== 'ios' ) { return }
  if( style === undefined ) { return }
  style.shadowOffset = undefined
  style.shadowBlur = undefined
  style.shadowRadius = undefined
  style.shadowColor = undefined
}
