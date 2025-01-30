import { DrawProps } from '../../types/DrawProps'
import { EventDispatcher } from '../../utils/EventDispatcher'

export class StateUpdateDispatcher extends EventDispatcher<StateUpdateListener> {
  public onStateUpdate( props:DrawProps ) {
    this.dispatch( 'state-update', props )
  }
}

interface StateUpdateListener {
  type: 'state-update'
  handle( event:DrawProps ): void
}
