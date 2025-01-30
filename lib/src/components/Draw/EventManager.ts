import { DEFAULT_ASPECT_RATIO } from '../../constants'
import { DrawProps } from '../../types/DrawProps'
import { EventListener, EventService, ScrollService, View } from '../../services'
import { EventHandler, EventType } from '../../utils/EventDispatcher'
import { NativeScrollEvent } from './Renderer'
import { StateReceptionManager } from './StateReceptionManager'
import { useScrollService } from '../../functions/use_scroll_service'

export abstract class EventManager extends StateReceptionManager {

  protected abstract eventService: EventService
  protected abstract scrollService: ScrollService

  constructor( props:DrawProps ) {
    super( props )
  }

  /**
   * Updates resolution for scroll service
  */
  override componentDidUpdate() {
    const { resolution, aspectRatio = DEFAULT_ASPECT_RATIO } = this.props
    useScrollService( resolution, aspectRatio, this.scrollService )  // eslint-disable-line
  }

  public addEventListener<T extends EventType<EventListener>>( type:T, handler:EventHandler<T,EventListener> ) {
    this.eventService.addEventListener( type, handler )
  }

  public removeEventListener<T extends EventType<EventListener>>( type:T, handler:EventHandler<T,EventListener> ) {
    this.eventService.removeEventListener( type, handler )
  }

  /**
   * Notify a scroll event and processes it to make it compatible with Draw API
  */
  override dispatchScrollEvent( event:NativeScrollEvent ) {
    const { nativeEvent } = event
    const container: View = nativeEvent.contentSize
    const view: View = nativeEvent.layoutMeasurement
    const { x, y } = nativeEvent.contentOffset
    this.scrollService.dispatchScrollEvent( container, view, x, y )
  }

  /**
   * Listents events an executes component callbacks to get in-component events
  */
  protected setComponentEvents() {
    // EyeDropper
    this.addEventListener( 'eye-dropper', ( event ) => {
      if( this.props.onEyeDropper === undefined ) { return }
      this.props.onEyeDropper( event )
    } )
    // Load
    this.addEventListener( 'load', ( event ) => {
      if( this.props.onLoad === undefined ) { return }
      this.props.onLoad( event )
    } )
    // Filling
    this.addEventListener( 'filling', ( event ) => {
      if( this.props.onFilling === undefined ) { return }
      this.props.onFilling( event )
    } )
    // History Move
    this.addEventListener( 'history-move', ( event ) => {
      if( this.props.onHistoryMove === undefined ) { return }
      this.props.onHistoryMove( event )
    } )
    // Scroll
    this.addEventListener( 'scroll', ( event ) => {
      if( this.props.onScroll === undefined ) { return }
      this.props.onScroll( event )
    } )
  }

}
