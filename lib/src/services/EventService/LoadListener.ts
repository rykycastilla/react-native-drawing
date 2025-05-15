import { LoadEvent } from './events'

export interface LoadListener {
  type: 'load'
  handle( event:LoadEvent ): Promise<void> | void
}
