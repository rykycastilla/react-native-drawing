import { DynamicMemory } from '../models'
import { GarbageCollector } from './GarbageCollector'
import { HistoryOutOfBoundsError } from '../errors'
import { SnapShotUtil } from './SnapShotUtil'

export class History {

  /** Allowed memory usage by this history instance */
  public static MEMORY_PERCENTAGE = 10

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
   * Eliminates of the elements after the current snapshot index
  */
  private cleanFront() {
    for( let i = this.snapShotIndex + 1; i < this.memory.length; i++ ) {
      this.memory.delete( i )
    }
  }

  /**
   * Includes a new snpahot on the History
  */
  public async add( base64:string ) {
    const url: string = await this.snapShotUtil.compactURL( base64 )
    this.cleanFront()
    this.memory.add( url )
    this.snapShotIndex = this.memory.length - 1
  }

  /**
   * Uses a new index as the current snapshot
   * @param steps - Progress from the current index to the new (negatives are to back)
   * @throws { HistoryOutOfBoundsError }
  */
  private updateIndex( steps:number ): string {
    const newIndex: number = this.snapShotIndex + steps
    const url: string | null = this.memory.get( newIndex )
    if( url === null ) { throw new HistoryOutOfBoundsError() }
    this.snapShotIndex = newIndex
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
    return this.snapShotIndex > -1
  }

  get canRedo(): boolean {
    return this.snapShotIndex < this.memory.length - 1
  }

  private static calculateMemoryCap( availableMemory:number ): number {
    return availableMemory / 100 * History.MEMORY_PERCENTAGE
  }

}
