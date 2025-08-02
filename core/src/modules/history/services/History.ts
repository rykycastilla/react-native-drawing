import { DynamicMemory } from '../models'
import { GarbageCollector } from './GarbageCollector'
import { HistoryOutOfBoundsError } from '@shared/modules/history/errors'
import { SnapShotUtil } from './SnapShotUtil'

export class History {

  /** Calls when the history timeline is moved */
  public onmove: ( ( canUndo:boolean, canRedo:boolean ) => void ) | null = null

  /** Allowed memory usage by this history instance */
  public static MEMORY_PERCENTAGE = 25

  private snapShotIndex = -1
  private readonly memory: DynamicMemory<string>

  /**
   * @param availableMemory  Available memory in the System (MB)
   * @param snapShotProvider  Usefull tool to incorporate tasks related to the 'snapshot'
  */
  constructor(
    availableMemory:number,
    private readonly snapShotUtil: SnapShotUtil,
  ) {
    const memoryCap: number = History.calculateMemoryCap( availableMemory )
    const imageSize: number = snapShotUtil.referenceSize
    this.memory = new DynamicMemory<string>( memoryCap, imageSize, GarbageCollector )
  }

  /**
   * @event History#Move
  */
  private dispatchMove() {
    if( this.onmove === null ) { return }
    this.onmove( this.canUndo, this.canRedo )
  }

  /**
   * Check if the new state is the same of the current state
   * @returns true if the new state is equals to the current state
  */
  private async checkSameState( base64:string ): Promise<boolean> {
    const { snapShotIndex } = this
    const currentSnapShotURL: string | null = this.memory.get( snapShotIndex )
    if( currentSnapShotURL === null ) { return false }
    return this.snapShotUtil.compare( currentSnapShotURL, base64 )
  }

  /**
   * Eliminates of the elements after the current snapshot index
  */
  private cleanFront() {
    const nextIndex: number = this.snapShotIndex + 1
    while( nextIndex < this.memory.length ) {
      this.memory.delete( nextIndex )
    }
  }

  /**
   * Includes a new snapshot on the History
   * @param base64  Base64 encoded image to be added to the history
   * @param forceHistoryUpdate  If true, the history will be updated even if the
   * current state is the same as the last one. It only must emit an event,
   * not change the history.
   * @fires History#Move
  */
  public async add( base64:string, forceHistoryUpdate?:boolean ) {
    const url: string = await this.snapShotUtil.compactURL( base64 )
    const areEquals: boolean = await this.checkSameState( base64 )
    if( areEquals ) {
      if( forceHistoryUpdate ) { this.dispatchMove() }
      return
    }
    this.cleanFront()
    this.memory.add( url )
    this.snapShotIndex = this.memory.length - 1
    this.dispatchMove()  // Firing TimeLine Movement Event
  }

  /**
   * Uses a new index as the current snapshot
   * @param steps - Progress from the current index to the new (negatives are to back)
   * @fires History#Move
   * @throws { HistoryOutOfBoundsError }
  */
  private updateIndex( steps:number ): string {
    const newIndex: number = this.snapShotIndex + steps
    const url: string | null = this.memory.get( newIndex )
    if( url === null ) { throw new HistoryOutOfBoundsError() }
    this.snapShotIndex = newIndex
    this.dispatchMove()  // Firing TimeLine Movement Event
    return url
  }

  /**
   * Go back in the History
   * @throws { HistoryOutOfBoundsError } If the current snapshot is the first
  */
  public undo(): string {
    return this.updateIndex( -1 )
  }

  /**
   * Restores the state to what it was before the last "undo" operation
   * @throws { HistoryOutOfBoundsError } If the current snapshot is the latest
  */
  public redo(): string {
    return this.updateIndex( 1 )
  }

  get canUndo(): boolean {
    return this.snapShotIndex > 0
  }

  get canRedo(): boolean {
    return this.snapShotIndex < this.memory.length - 1
  }

  private static calculateMemoryCap( availableMemory:number ): number {
    return availableMemory / 100 * History.MEMORY_PERCENTAGE
  }

}
