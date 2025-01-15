import { IGarbageCollector } from './IGarbageCollector'

/**
 * Elements collection with a GarbageCollector
*/
export class DynamicMemory<T> {

  private readonly itemList: T[] = []
  private readonly collector: IGarbageCollector

  /**
   * @param memoryCap  Memory limit (MB)
   * @param itemMemory  Size expected for every item (MB) (only a reference)
   * It dosn't have runtime consecuencies
  */
  constructor(
    memoryCap:number, itemMemory:number,
    GarbageCollector: GarbageCollectorConstructor,
  ) {
    this.collector = new GarbageCollector( memoryCap, itemMemory, () => this.itemList )
  }

  /**
   * Add a new element to the collection
  */
  public add( item:T ) {
    this.itemList.push( item )
    this.collector.collect()
  }

  /**
   * Get element with the specified index
  */
  public get( i:number ): T | null {
    return this.itemList[ i ] ?? null
  }

  /**
   * Delete element with the specified index
  */
  public delete( i:number ) {
    this.itemList.splice( i, 1 )
    this.itemList.length
  }

  /**
   * Gets the length of the memory. This is a number one higher than the highest index.
  */
  get length(): number {
    return this.itemList.length
  }

  /**
   * Max length to run the GarbageCollector automatically
  */
  get maxLength(): number {
    return this.collector.maxLength
  }

  /**
   * Total size (reference) of all the items in the collection
  */
  get total(): number {
    return this.collector.totalMemory
  }

}

interface MemoryGetter {
  (): unknown[]
}

interface GarbageCollectorConstructor {
  new ( memoryCap:number, itemMemory:number, getMemory:MemoryGetter ): IGarbageCollector
}
