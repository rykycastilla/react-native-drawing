import { LoadEvent } from './_events'

export interface LoadListener {
  type: 'load'
  handle( event:LoadEvent ): Promise<void> | void
}
