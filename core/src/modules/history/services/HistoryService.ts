import { History } from './History'
import { IHistoryService } from './IHistoryService'

// @ts-expect-error - JSDoc Type
import { HistoryOutOfBoundsError } from '@shared/modules/history/errors'  // eslint-disable-line

export class HistoryService implements IHistoryService {

  public onmove: HistoryMoveHandler | null = null
  #history!: History

  /**
   * @param history  The history passed to this object shouldn't use its onmove method
   * in another place, because it is readed and modified by this object
  */
  constructor(
    history:History,
    private readonly getScene: SceneGetter,
  ) { this.history = history }

  public async undo() {
    const snapshot: string = this.history.undo()
    await this.scene.setImage( snapshot )
  }

  public async redo() {
    const snapshot: string = this.history.redo()
    await this.scene.setImage( snapshot )
  }

  public async saveSnapShot() {
    await this.scene.waitNextFrame()
    const snapShot: string = this.scene.image
    this.history.add( snapShot )
  }

  private dispatchHistoryMove( canUndo:boolean, canRedo:boolean ) {
    if( this.onmove === null ) { return }
    this.onmove( canUndo, canRedo )
  }

  private get scene(): Scene {
    return this.getScene()
  }

  public setHistory( history:History ) {
    this.history = history
  }

  private get history(): History {
    return this.#history
  }

  /**
   * @param history  The history passed to this object shouldn't use its onmove method
   * in another place, because it is readed and modified by this object
  */
  private set history( history:History ) {
    // Unsusing previous history event
    if( this.#history !== undefined ) {
      this.#history.onmove = null
    }
    this.#history = history  // Setting new history
    // Setting event watcher in the new history
    history.onmove = ( canUndo:boolean, canRedo:boolean ) => {
      this.dispatchHistoryMove( canUndo, canRedo )
    }
    // Assigning first state
    this.saveSnapShot()
  }

}

interface Scene {
  image: string
  waitNextFrame(): Promise<void>
  setImage( image:string ): Promise<void>
}

interface SceneGetter {
  (): Scene
}

interface HistoryMoveHandler {
  ( canUndo:boolean, canRedo:boolean ): Promise<void> | void
}
