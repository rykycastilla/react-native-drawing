import { EventManager } from './EventManager'
import { IDrawCore } from '../../shared/utils/types/IDrawCore'
import { DrawCore } from '../../services'

export abstract class CoreManager extends EventManager implements IDrawCore {

  protected abstract readonly core: DrawCore

  public async clear( color?:string ) {
    await this.core.clear( color )
  }

  public async undo() {
    await this.core.undo()
  }

  public async redo() {
    await this.core.redo()
  }

  public getImage(): Promise<string> {
    return this.core.getImage()
  }

  public async setImage( image:string ) {
    await this.core.setImage( image )
  }

}
