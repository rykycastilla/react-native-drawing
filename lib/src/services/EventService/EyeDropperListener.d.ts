import { EyeDropperEvent } from './_events'

export interface EyeDropperListener {
  type: 'eye-dropper'
  handle( event:EyeDropperEvent ): Promise<void> | void
}
