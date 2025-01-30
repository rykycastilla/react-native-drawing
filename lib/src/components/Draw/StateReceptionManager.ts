import { DrawProps } from '../../types/DrawProps'
import { Renderer } from './Renderer'
import { StateUpdateDispatcher } from './StateUpdateDispatcher'

export abstract class StateReceptionManager extends Renderer {

  private readonly dispatcher = new StateUpdateDispatcher()

  protected onNewState( props:DrawProps ) {
    this.dispatcher.onStateUpdate( this.props )
  }

  protected onStateUpdate( callback:StateUpdateCallback ) {
    this.dispatcher.addEventListener( 'state-update', callback )
  }

  protected removeStateUpdate( callback:StateUpdateCallback ) {
    this.dispatcher.removeEventListener( 'state-update', callback )
  }

}

type StateUpdateCallback = ( props:DrawProps ) => void
