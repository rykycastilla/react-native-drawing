import { EyeDropperEvent } from './events'

export interface EyeDropperListener {
  type: 'eye-dropper'
  handle( event:EyeDropperEvent ): Promise<void> | void
}
