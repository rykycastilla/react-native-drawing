import { IGarbageCollector } from './IGarbageCollector'

export class DynamicMemory<T> {

  private readonly itemList: T[] = []
  private readonly collector: IGarbageCollector

  constructor(
    memoryCap:number, itemMemory:number,
    GarbageCollector: GarbageCollectorConstructor,
  ) {
    this.collector = new GarbageCollector( memoryCap, itemMemory, () => this.itemList )
  }

  public add( item:T ) {
    this.itemList.push( item )
    this.collector.collect()
  }

  public get( i:number ): T | null {
    return this.itemList[ i ] ?? null
  }

  public delete( i:number ) {
    this.itemList.splice( i, 1 )
  }

  get maxLength(): number {
    return this.collector.maxLength
  }

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
