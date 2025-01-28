import { EventManager } from './EventManager'
import { IWebDraw } from '../../shared/utils/types/IWebDraw'
import { WebDraw } from '../../services'

export abstract class WebDrawManager extends EventManager implements IWebDraw {

  protected abstract readonly webDraw: WebDraw

  public async clear( color?:string ) {
    await this.webDraw.clear( color )
  }

  public async undo() {
    await this.webDraw.undo()
  }

  public async redo() {
    await this.webDraw.redo()
  }

  public getImage(): Promise<string> {
    return this.webDraw.getImage()
  }

  public async setImage( image:string ) {
    await this.webDraw.setImage( image )
  }

}
