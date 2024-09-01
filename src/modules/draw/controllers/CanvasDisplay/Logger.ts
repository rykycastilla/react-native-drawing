import { Logger as SystemLogger } from '../../../../utils/Logger'

export abstract class Logger extends SystemLogger {

  private readonly ALERT = 'The graphic context was not loaded yet'

  protected logContextWarning() {
    this.verbose.log( this.ALERT )
  }

}
