import { FillingEvent } from './events'

export interface FillingListener {
  type: 'filling'
  handle( event:FillingEvent ): Promise<void> | void
}
