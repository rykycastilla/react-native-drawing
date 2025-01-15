import { IGarbageCollector } from '../models'

/**
 * Gets access to a 'memory' array and delete random elements of it
 * when the mmeory top is exceed
*/
export class GarbageCollector implements IGarbageCollector {

  /** Areas in which the memory is divided and its probabilites to to be deleted an own element */
  private static readonly MEMORY_AREA_PROBABILITIES = [ 9, 8, 7, 6, 5, 4, 0 ]

  public readonly maxLength: number

  /**
   * @param MEMORY_CAP  Memory limit (MB)
   * @param ITEM_MEMORY  Size expected for every item (MB) (only a reference)
   * It dosn't have runtime consecuencies
   * @param getMemory  Getter function to access to the reference of the memory
  */
  constructor(
    MEMORY_CAP:number,
    private readonly ITEM_MEMORY: number,
    private readonly getMemory: MemoryGetter,
  ) { this.maxLength = Math.floor( MEMORY_CAP / ITEM_MEMORY ) }

  /**
   * Delete the index element in the memory
  */
  private deleteMemoryItem( i:number ) {
    this.memory.splice( i, 1 )
  }

  private getRandomArea(): [ number, number ] {
    // Calculating total probabilities
    const { MEMORY_AREA_PROBABILITIES } = GarbageCollector
    let allProbabilities = 0
    for( const areaProbabilities of MEMORY_AREA_PROBABILITIES ) {
      allProbabilities += areaProbabilities
    }
    // Choicing random number to represent a single probability (in the probabilities set)
    const areaReference: number = GarbageCollector.genRandomInRange( 0, allProbabilities )
    // Searching for the rea with the rea of this value (in probabilities)
    const areaRange: number = Math.round( this.memory.length / MEMORY_AREA_PROBABILITIES.length )
    let [ from , to ] = [ 0, this.memory.length - 1 ]
    let beginAreaReference = 0
    for( let i = 0; i < MEMORY_AREA_PROBABILITIES.length; i++ ) {
      const areaProbabilities: number = MEMORY_AREA_PROBABILITIES[ i ]!
      if( areaProbabilities === 0 ) { continue }  // Skipping 0 probabilities
      const topAreaReference: number = beginAreaReference + areaProbabilities
      // Identifying area
      if( ( beginAreaReference <= areaReference ) && ( areaReference <= topAreaReference ) ) {
        from = i * areaRange
        to = Math.min( from + areaRange, to )  // Using memory top as Maximu value (to avoid Out of Bounds)
        break
      }
      // Using top as begin of the next level
      beginAreaReference = topAreaReference
    }
    return [ from, to ]
  }

  /**
   * Delete a random element (with the area probabilities)
  */
  private deleteData() {
    const [ from, to ] = this.getRandomArea()
    const dataIndex: number = GarbageCollector.genRandomInRange( from, to )
    this.deleteMemoryItem( dataIndex )
  }

  /**
   * Runs the garbage collector an oly deletes an element if it is neccesary
  */
  public collect() {
    while( this.memory.length >= this.maxLength ) {
      this.deleteData()
    }
  }

  /** Access to the reference of the memory */
  private get memory(): unknown[] {
    return this.getMemory()
  }

  get totalMemory(): number {
    const memory: unknown[] = this.getMemory()
    return memory.length * this.ITEM_MEMORY
  }

  /**
   * Generates a random integer number between the provided range
  */
  private static genRandomInRange( from:number, to:number ): number {
    const range: number = to - from
    const random: number = from + range * Math.random()
    return Math.round( random )
  }

}

interface MemoryGetter {
  (): unknown[]
}
