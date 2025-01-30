import { HistoryControl } from './HistoryControl'

export abstract class DrawUtil extends HistoryControl {

  protected abstract readonly createEmptyImage: CreateEmptyImageFunction

  public async clear( color?:string ) {
    const { width, height } = this.scene
    const image: string = this.createEmptyImage( width, height, color )
    await this.scene.setImage( image )
    this.historyService.saveSnapShot()
  }

  get image(): string {
    return this.scene.image
  }

  public async setImage( image:string ) {
    await this.scene.setImage( image )
    this.historyService.saveSnapShot()
  }

}

export interface CreateEmptyImageFunction {
  ( width:number, height:number, color?:string ): string
}
