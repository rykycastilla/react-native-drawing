import { DrawingScene } from '../models'
import { Filler } from '@tools/models'
import { History } from '@history/services'
import { ITool } from '@tools/models'

// @ts-expect-error - JSDoc Type
import { HistoryOutOfBoundsError } from '@shared/modules/history/errors'  // eslint-disable-line

export class DrawingService {

  constructor(
    private readonly scene: DrawingScene,
    private history: History,
    private readonly createEmptyImage: CreateEmptyImageFunction,
  ) { this.saveSnpaShot() }

  /**
   * Go back in the History
   * @throws { HistoryOutOfBoundsError } If the current snapshot is the first
  */
  public async undo() {
    const snapshot: string = this.history.undo()
    await this.scene.setImage( snapshot )
  }

  /**
   * Restores the state to what it was before the last "undo" operation
   * @throws { HistoryOutOfBoundsError } If the current snapshot is the latest
  */
  public async redo() {
    const snapshot: string = this.history.redo()
    await this.scene.setImage( snapshot )
  }

  private async saveSnpaShot() {
    await this.scene.waitNextFrame()
    const snapShot: string = this.scene.image
    this.history.add( snapShot )
  }

  public async clear( color?:string ) {
    const { width, height } = this.scene
    const image: string = this.createEmptyImage( width, height, color )
    await this.scene.setImage( image )
    this.saveSnpaShot()
  }

  public stopStroke( x:number, y:number, strokeId:symbol, tool:ITool ) {
    tool.endShapeStroke( x, y, strokeId, this.scene )
    if( !( tool instanceof Filler ) ) { this.saveSnpaShot() }
  }

  public use( x:number, y:number, strokeId:symbol, tool:ITool ) {
    // Using filler saver
    // Filler has an special saving strategy, because it runs many scenes periodically
    // and the saver shouldn't be executed to up the touch
    if( ( tool instanceof Filler ) && ( tool.onfinish === null ) ) {
      tool.onfinish = () => this.saveSnpaShot()
    }
    // Executing tool
    tool.addStrokePoint( x, y, strokeId, this.scene )
  }

  get image(): string {
    return this.scene.image
  }

  public setHistory( history:History ) {
    this.history = history
  }

  public async setImage( image:string ) {
    await this.scene.setImage( image )
    this.saveSnpaShot()
  }

}

interface CreateEmptyImageFunction {
  ( width:number, height:number, color?:string ): string
}
