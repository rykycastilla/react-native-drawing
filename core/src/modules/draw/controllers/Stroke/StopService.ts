export class StopService {

  private static readonly STOP_TIMEOUT = 60_000
  private readonly stopHandlerList: ( () => void )[] = []
  #isStopped = false

  constructor(
    private readonly getAutoStopState: AutoStopStateRequestFunction,
  ) { this.runStopCheckerDaemon() }

  private runStopCheckerDaemon() {
    const stopCheckerInterval: NodeJS.Timeout = setInterval( () => {
      const autoStop: boolean = this.getAutoStopState()
      if( autoStop ) {
        this.stop()
        clearInterval( stopCheckerInterval )
      }
    }, StopService.STOP_TIMEOUT )
  }

  private dispatchStopEvent() {
    for( const handleStop of this.stopHandlerList ) {
      handleStop()
    }
  }

  public async stop() {
    if( this.isStopped ) { return }
    this.#isStopped = true
    this.dispatchStopEvent()
  }

  public onStop( handle:( () => void ) ) {
    this.stopHandlerList.push( handle )
  }

  get isStopped(): boolean {
    return this.#isStopped
  }

}

interface AutoStopStateRequestFunction {
  (): boolean
}
